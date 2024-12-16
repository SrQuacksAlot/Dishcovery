import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "/src/firebase/teacherFirebase.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "/src/firebase/firebaseConfig.js";
import { getMenuDetails } from "/src/utils/dishSource";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const PATH = "dinnerModel69";
const provider = new GoogleAuthProvider();

function modelToPersistence(model){
    function extractDishIdCB(dish) {
        return dish.id;
    }

    const sortedDishIds = model.dishes.map(extractDishIdCB).sort();

    return {
        guests: model.numberOfGuests,      
        dishIDs: sortedDishIds,            
        selectedDishID: model.currentDishId,
        userId: auth.currentUser ? auth.currentUser.uid : null
    };
}

function persistenceToModel(firebaseData, model){
    if (!firebaseData) { 
        model.dishes = [];
        model.numberOfGuests = 2;
        model.setCurrentDishId(null); 
        model.user = null;
        return Promise.resolve(model);
    }   
    
    model.user = firebaseData.userId;
    
    if (!firebaseData.dishIDs) {
        model.dishes = [];
    } else {
        function updateDishes(dishes) { 
            model.dishes = dishes; 
            model.numberOfGuests = firebaseData.guests || 2;
            model.setCurrentDishId(firebaseData.selectedDishID); 
        }
        return getMenuDetails(firebaseData.dishIDs).then(updateDishes); 
    }
      
    model.numberOfGuests = firebaseData.guests || 2;
    model.setCurrentDishId(firebaseData.selectedDishID); 
    
    return Promise.resolve(model); 
}
    
function saveToFirebase(model){
    if (model.ready && auth.currentUser) {
        set(ref(db, `${PATH}/${auth.currentUser.uid}`), modelToPersistence(model));
    }
}

function readFromFirebase(model){
    model.ready = false;
    
    // Check if user is authenticated before reading
    if (!auth.currentUser) {
        model.ready = true;
        return Promise.resolve(model);
    }

    return get(ref(db, `${PATH}/${auth.currentUser.uid}`))
        .then(function convertACB(snapshot){
            return persistenceToModel(snapshot.val(), model);
        })
        .then(function setModelReadyACB(){
            model.ready = true;
        });
}

function connectToFirebase(model, watchFunction){
    // Set up authentication state listener
    onAuthStateChanged(auth, function authStateChangedACB(user) {
        model.user = user;
        
        if (user) {
            // User is signed in, read from Firebase
            readFromFirebase(model);
            model.userIsSigned = true;
        } else {
            // User is signed out, reset model
            model.dishes = [];
            model.numberOfGuests = 2;
            model.setCurrentDishId(null);
            model.ready = true;
            model.userIsSigned = false;
        }
    });

    function checkModelChangesACB() {
        return [ model.numberOfGuests, model.currentDishId, model.dishes ];
    }

    function handleModelChangesACB() { 
        saveToFirebase(model); 
    }

    watchFunction(checkModelChangesACB, handleModelChangesACB);
}

function signInWithGoogle() {
    return signInWithPopup(auth, provider);
}

function signOutOfApp() {
    return signOut(auth);
}

export { 
    connectToFirebase, 
    modelToPersistence, 
    persistenceToModel, 
    saveToFirebase, 
    readFromFirebase,
    signInWithGoogle,
    signOutOfApp,
    auth  // Expose auth object if needed
};