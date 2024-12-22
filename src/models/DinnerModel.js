import {
  getDishDetails,
  searchDishes,
  fetchIngredientSuggestions,
} from "/src/utils/dishSource.js";
import { resolvePromise } from "/src/utils/resolvePromise";

const model = {
  servingsMultiplier: 1,
  dishes: [],
  currentDishId: null,
  searchParams: {}, // Stores general search parameters
  searchIngredients: [], // Stores ingredients for ingredient-based search
  searchResultsPromiseState: {},
  currentDishPromiseState: {},
  suggestions: [],
  currentIngredient: "", // Track current ingredient being typed
  nutrientSearchParams: {}, // Stores nutrient search parameters
  showComplexSearch: false,
  isDishDetailsModalOpen: false,
  userIsSignedIn: false,
  flipped: false, // Default state
  username: "",

  includedIngredients: [], // Tracks ingredients to include
  excludedIngredients: [], // Tracks ingredients to exclude




  toggleShowComplexSearch() {
    this.showComplexSearch = !this.showComplexSearch;
  },


  doSearch() {
    const params = {};
  
    // Add query
    if (this.searchParams.query) {
      params.query = this.searchParams.query;
    }
  
    // Add dish type
    if (this.searchParams.type) {
      params.type = this.searchParams.type;
    }
  
    // Add included ingredients
    if (this.includedIngredients.length > 0) {
      params.includeIngredients = this.includedIngredients.join(",");
    }
  
    // Add excluded ingredients
    if (this.excludedIngredients.length > 0) {
      params.excludeIngredients = this.excludedIngredients.join(",");
    }
  
    // Add nutrient search parameters
    Object.entries(this.nutrientSearchParams).forEach(([key, value]) => {
      if (value) {
        params[key] = value;
      }
    });

    params.offset = 0;

    // Store the searchParams in the model for reuse
    this.searchParams = params;
  
    // Perform the search
    resolvePromise(searchDishes(params), this.searchResultsPromiseState);
  },
  
  fetchMoreDishes() {
    if (!this.searchParams) {
        throw new Error("No search parameters set. Perform a search first.");
    }

    // Initialize offset if it doesn't exist
    if (!this.searchParams.offset) {
        this.searchParams.offset = 0;
    }

    // Increment offset for the next batch
    this.searchParams.offset += 10;

    // Build parameters for the API call
    const params = {
        ...this.searchParams,
        includeIngredients: this.includedIngredients.join(","),
        excludeIngredients: this.excludedIngredients.join(","),
        number: 10,
    };

    // Fetch the next batch of dishes
    const existingResults = this.searchResultsPromiseState.data || [];
    resolvePromise(
        searchDishes(params).then(newResults => {
            // Merge existing results with the new ones
            return [...existingResults, ...newResults];
        }),
        this.searchResultsPromiseState
    );
  },


  


  // Add dish to the menu
  addToMenu(dishToAdd) {
    this.dishes = [...this.dishes, dishToAdd];
  },

  // Remove dish from the menu
  removeFromMenu(dishToRemove) {
    function shouldWeKeepDishCB(dish) {
      return dish.id !== dishToRemove.id;
    }
    this.dishes = this.dishes.filter(shouldWeKeepDishCB);
  },


  setCurrentDishId(dishId) { //on select dish
    this.isDishDetailsModalOpen = true;
    if (!dishId || dishId === this.currentDishId) return;
    this.currentDishId = dishId;
    resolvePromise(getDishDetails(dishId), this.currentDishPromiseState);
  },
  removeCurrentDishID(){ // back to search button/ on cancel click
    this.currentDishId = null;
    this.currentDishPromiseState = {};
    this.isDishDetailsModalOpen = false;
  },

  setservingsMultiplier(number) {
    if (Number.isInteger(number) && number > 0) {
      this.servingsMultiplier = number;
    } else {
      throw new Error("multiplier must be a positive integer");
    }
  },

  setSearchQuery(query) {
    this.searchParams.query = query;
  },

  setSearchType(type) {
    this.searchParams.type = type;
  },


  toggleIngredient(ingredient) {
    if (this.includedIngredients.includes(ingredient)) {
      // Move from include to exclude
      this.includedIngredients = this.includedIngredients.filter(
        (ing) => ing !== ingredient
      );
      this.excludedIngredients = [...this.excludedIngredients, ingredient];
    } else if (this.excludedIngredients.includes(ingredient)) {
        // Remove from excluded state
        this.excludedIngredients = this.excludedIngredients.filter(
          (ing) => ing !== ingredient
        );
      this.includedIngredients = [...this.includedIngredients, ingredient];
    } else {
          // Add to included state & prevent duplicates
        if (!this.includedIngredients.includes(ingredient.trim())) {
          this.includedIngredients = [...this.includedIngredients, ingredient.trim()];
        }
    }
  },
  
  addIngredient(ingredient) {
    // Prevent duplicate ingredients
    if (!this.searchIngredients.includes(ingredient.trim())) {
      this.searchIngredients = [...this.searchIngredients, ingredient.trim()];
    }
    toggleIngredient(ingredient);
  },

  // Method to remove an ingredient from searchIngredients
  removeIngredient(ingredientToRemove) {
    this.searchIngredients = this.searchIngredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
    this.includedIngredients = this.includedIngredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
    this.excludedIngredients = this.excludedIngredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
  },

  // Method to set the current ingredient
  setCurrentIngredient(value) {
    this.currentIngredient = value;
  },

  setSearchIngredients(ingredients) {
    if (Array.isArray(ingredients)) {
      this.searchIngredients = ingredients;
    } else {
      throw new Error("Ingredients must be an array");
    }
  },

  // Method to clear the current ingredient input
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
      if (input.trim().length > 2) {
        const suggestions = await fetchIngredientSuggestions(input);
        this.suggestions = Array.isArray(suggestions) ? suggestions : [];
      } else {
        this.suggestions = [];
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      this.suggestions = [];
    }
  },

  // Method to set nutrient search parameters
  setNutrientSearchParams(params) {
    this.nutrientSearchParams = params;
  },

  setUsername(newUsername) {
    this.username = newUsername;
    this.userIsSignedIn = true;
  },

  removeUsername(){
    this.username = "";
    this.userIsSignedIn = false;
  },

};

export { model };
