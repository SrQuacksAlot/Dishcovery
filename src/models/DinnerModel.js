import { getDishDetails, searchDishes, searchByIngredients, fetchIngredientSuggestions } from "/src/utils/dishSource.js"; 
import { resolvePromise } from "/src/utils/resolvePromise";

const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null, 
    searchParams: {},
    searchIngredients: [], // Store ingredients for ingredient-based search
    searchResultsPromiseState: {},
    currentDishPromiseState: {},
    suggestions: [], 
    currentIngredient: "", 
    showIngredientSearch: false, // New property to manage visibility

    // Add this method to add ingredients to searchIngredients
    addIngredient(ingredient) {
        // Prevent duplicate ingredients
        if (!this.searchIngredients.includes(ingredient.trim())) {
            this.searchIngredients = [...this.searchIngredients, ingredient.trim()];
        }
    },

    setCurrentIngredient(value) {
        this.currentIngredient = value;
    },

    

    toggleIngredientSearch() {
        this.showIngredientSearch = !this.showIngredientSearch; // Toggle the visibility
    },

    setCurrentDishId(dishId) {
        if (!dishId || dishId === this.currentDishId) return;
        this.currentDishId = dishId;
        resolvePromise(getDishDetails(dishId), this.currentDishPromiseState); 
    },
     
    setNumberOfGuests(number) {
        if (Number.isInteger(number) && number > 0) {
            this.numberOfGuests = number;
        } else {
            throw new Error("number of guests not a positive integer");
        }
    },
    
    addToMenu(dishToAdd) {
        this.dishes = [...this.dishes, dishToAdd];
    },

    removeFromMenu(dishToRemove) {
        function shouldWeKeepDishCB(dish) { return dish.id !== dishToRemove.id; }
        this.dishes = this.dishes.filter(shouldWeKeepDishCB);
    },
    
    setSearchQuery(query) {
        this.searchParams.query = query;
    },

    setSearchType(type) {
        this.searchParams.type = type;
    },

    setSearchIngredients(ingredients) {
        if (Array.isArray(ingredients)) {
            this.searchIngredients = ingredients;
        } else {
            throw new Error("Ingredients must be an array");
        }
    },

    doIngredientSearch() {
        resolvePromise(searchByIngredients(this.searchIngredients), this.searchResultsPromiseState);
    },

    doSearch(params) {
        resolvePromise(searchDishes(params), this.searchResultsPromiseState);
    },

    setSuggestions(suggestions) {
        if (Array.isArray(suggestions)) {
            this.suggestions = suggestions;
        } else {
            throw new Error("Suggestions must be an array");
        }
    },

    clearCurrentIngredient() {
        this.currentIngredient = "";
    },

    // Method to clear suggestions
    clearSuggestions() {
        this.suggestions = [];
    },

    // Method to fetch suggestions based on input
    async fetchSuggestions(input) {
        try {
            // Only proceed if input is more than 2 characters long
            if (input.trim().length > 2) {
                const suggestions = await fetchIngredientSuggestions(input);
                
                // Check if suggestions array has items
                if (Array.isArray(suggestions) && suggestions.length > 0) {
                    this.suggestions = suggestions;
                } else {
                    this.suggestions = []; // Clear suggestions if no results
                }
            } else {
                this.suggestions = []; // Clear suggestions if input is too short
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            this.suggestions = []; // Clear suggestions on error
        }
    },
};

export { model };