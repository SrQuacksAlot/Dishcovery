import { getDishDetails, searchDishes } from "/src/utils/dishSource.js"; 
import { resolvePromise } from "/src/utils/resolvePromise";

/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"
    searchParams: {},
    searchResultsPromiseState: {},
    currentDishPromiseState: {},

    setCurrentDishId(dishId) {
        // Only proceed if dishId is valid and different from the current one
        if (!dishId || dishId === this.currentDishId) return;
        this.currentDishId = dishId;
        resolvePromise(getDishDetails(dishId), this.currentDishPromiseState); 
    },
     
    setNumberOfGuests(number){
        if (Number.isInteger(number) && number > 0){
            this.numberOfGuests = number;
        }
        else {
            throw new Error("number of guests not a positive integer");
        }
    },
    
    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.dishes= [...this.dishes, dishToAdd];
    },

    // filter callback exercise 
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){return dish.id !== dishToRemove.id;}
        // Use filter with the callback to keep only the dishes we want
        this.dishes= this.dishes.filter(shouldWeKeepDishCB);
    },
    
    setSearchQuery(query){
        this.searchParams.query = query;
    },

    setSearchType(type){
        this.searchParams.type = type;
    },

    doSearch(params) {
        resolvePromise(searchDishes(params), this.searchResultsPromiseState);
    },
 
    // more methods will be added here, don't forget to separate them with comma!
};

export {model};
