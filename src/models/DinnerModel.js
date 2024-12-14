import {
  getDishDetails,
  searchDishes,
  fetchIngredientSuggestions,
} from "/src/utils/dishSource.js";
import { resolvePromise } from "/src/utils/resolvePromise";

const model = {
  numberOfGuests: 2,
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


  // Method to set nutrient search parameters
  setNutrientSearchParams(params) {
    this.nutrientSearchParams = params;
  },

  // Add this method to add ingredients to searchIngredients
  addIngredient(ingredient) {
    // Prevent duplicate ingredients
    if (!this.searchIngredients.includes(ingredient.trim())) {
      this.searchIngredients = [...this.searchIngredients, ingredient.trim()];
    }
  },

  // Method to set the current ingredient
  setCurrentIngredient(value) {
    this.currentIngredient = value;
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
  // Unified Search Method Using Complex Search
  doSearch() {
    const params = {};
    if (this.searchParams.query) {
      params.query = this.searchParams.query;
    }
    // Add dish type
    if (this.searchParams.type) {
      params.type = this.searchParams.type;
    }
    // Add ingredients to the search parameters if available
    if (this.searchIngredients.length > 0) {
      params.includeIngredients = this.searchIngredients.join(',');
    }

    // Add nutrient search parameters to the search parameters if available
    Object.entries(this.nutrientSearchParams).forEach(([key, value]) => {
      if (value) {
        params[key] = value;
      }
    });

    // Use the complex search function with the combined parameters
    resolvePromise(searchDishes(params), this.searchResultsPromiseState);
  },


  toggleShowComplexSearch() {
    this.showComplexSearch = !this.showComplexSearch;
  },


  removeCurrentDishID(){ // back to search button/ on cancel click
    model.currentDishId = null;
    model.currentDishPromiseState = {};
    this.isDishDetailsModalOpen = false;
  },

  setCurrentDishId(dishId) { //on select dish
    this.isDishDetailsModalOpen = !this.isDishDetailsModalOpen;
    if (!dishId || dishId === this.currentDishId) return;
    this.currentDishId = dishId;
    resolvePromise(getDishDetails(dishId), this.currentDishPromiseState);
  },

  setNumberOfGuests(number) {
    if (Number.isInteger(number) && number > 0) {
      this.numberOfGuests = number;
    } else {
      throw new Error("Number of guests must be a positive integer");
    }
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

  // Method to remove an ingredient from searchIngredients
  removeIngredient(ingredientToRemove) {
    this.searchIngredients = this.searchIngredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
  },
};

export { model };
