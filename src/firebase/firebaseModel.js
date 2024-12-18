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

// Convert model data to Firebase-compatible format
function modelToPersistence(model) {
    function extractDishIdCB(dish) {
        return dish.id;
    }

    const sortedDishIds = model.dishes.map(extractDishIdCB).sort();

    return {
        guests: model.numberOfGuests,
        dishIDs: sortedDishIds,
        selectedDishID: model.currentDishId,
        userId: auth.currentUser ? auth.currentUser.uid : null,
        username: model.username || "", // Save username to Firebase
    };
}

// Convert Firebase data to model format
function persistenceToModel(firebaseData, model) {
    if (!firebaseData) {
        // Default values if no data exists
        model.dishes = [];
        model.numberOfGuests = 2;
        model.setCurrentDishId(null);
        model.username = "";
        model.user = null;
        return Promise.resolve(model);
    }

    model.user = firebaseData.userId;
    model.username = firebaseData.username || ""; // Restore username

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

// Save model data to Firebase
function saveToFirebase(model) {
    if (model.ready && auth.currentUser) {
        set(ref(db, `${PATH}/${auth.currentUser.uid}`), modelToPersistence(model));
    }
}

// Read model data from Firebase
function readFromFirebase(model) {
    model.ready = false;

    // Check if user is authenticated before reading
    if (!auth.currentUser) {
        model.ready = true;
        return Promise.resolve(model);
    }

    return get(ref(db, `${PATH}/${auth.currentUser.uid}`))
        .then(function convertACB(snapshot) {
            return persistenceToModel(snapshot.val(), model);
        })
        .then(function setModelReadyACB() {
            model.ready = true;
        });
}

// Connect model to Firebase and set up listeners
function connectToFirebase(model, watchFunction) {
    onAuthStateChanged(auth, function authStateChangedACB(user) {
        if (user) {
            // User is signed in, read data and restore username
            readFromFirebase(model).then(() => {
                model.userIsSigned = true;
                model.setUsername(model.username || user.email.substring(0, 3));
            });
        } else {
            // User is signed out, reset model
            model.dishes = [];
            model.numberOfGuests = 2;
            model.setCurrentDishId(null);
            model.username = "";
            model.ready = true;
            model.userIsSigned = false;
        }
    });

    function checkModelChangesACB() {
        return [model.numberOfGuests, model.currentDishId, model.dishes, model.username];
    }

    function handleModelChangesACB() {
        saveToFirebase(model);
    }

    watchFunction(checkModelChangesACB, handleModelChangesACB);
}

// Google sign-in and username handling
function signInWithGoogle() {
    return signInWithPopup(auth, provider)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error during sign-in:", error);
        });
}

// Google sign-out
function signOutOfApp() {
    return signOut(auth).then(() => {
        console.log("User signed out");
        window.location.reload(); // Reload the page after sign-out
    });
}

export {
    connectToFirebase,
    modelToPersistence,
    persistenceToModel,
    saveToFirebase,
    readFromFirebase,
    signInWithGoogle,
    signOutOfApp,
    auth, // Expose auth object if needed
};
