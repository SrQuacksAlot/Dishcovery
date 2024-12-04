import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/firebase/teacherFirebase.js";



/* you will find 2 imports in firebaseModel, add the configuration and instantiate the app and database: */
import {firebaseConfig} from "/src/firebase/firebaseConfig.js";
import { getMenuDetails } from "/src/utils/dishSource";
const app= initializeApp(firebaseConfig)
const db= getDatabase(app)

/*  PATH is the “root” Firebase path. NN is your TW2_TW3 group number */
const PATH="dinnerModel69";
// Add relevant imports here 
// TODO

// Initialise firebase app, database, ref
// TODO
//set(ref(db, PATH+"/test"), "dummy");
// set(ref(db, PATH), modelToPersistence({
//     numberOfGuests:5, 
//     currentDishId:13, 
//     dishes:[{id:13, title:"dummy1"}, 
//             {id:42, title:"dummy2"}]
//    }))

function modelToPersistence(model){
    
    // Named callback for map
    function extractDishIdCB(dish) {
        return dish.id;
    }

    const sortedDishIds = model.dishes.map(extractDishIdCB).sort();

    return {
        guests: model.numberOfGuests,      
        dishIDs: sortedDishIds,            
        selectedDishID: model.currentDishId
    };

}

function persistenceToModel(firebaseData, model){
    if (!firebaseData) { 
        
        model.dishes = [];
        model.numberOfGuests = 2;
        model.setCurrentDishId(null); 
        return Promise.resolve(model);
    }   
    else if (!firebaseData.dishIDs) {
        
        model.dishes = [];
    } 
    else {
        
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
    // TODO
    if (model.ready) {
        set(ref(db, PATH), modelToPersistence(model));
      }
}
function readFromFirebase(model){

    // TODO
    
    model.ready=false;
    return get(ref(db, PATH))
                .then(function convertACB(snapshot){
                        // return promise
                        return persistenceToModel(snapshot.val(), model);
                })
                .then(function setModelReadyACB(){
                            model.ready=true;
                })           
    
}
function connectToFirebase(model, watchFunction){
        // TODO
    readFromFirebase(model); 

    function checkModelChangesACB() {
        return [ model.numberOfGuests, model.currentDishId, model.dishes];

    }

    function handleModelChangesACB() { 
        saveToFirebase(model); 
    }

    watchFunction(checkModelChangesACB, handleModelChangesACB); 
    

}
// Remember to uncomment the following line:
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }
