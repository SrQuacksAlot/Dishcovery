
# Project: Discover Dishes Web Application

## Short Description of Your Project
This project is a web application designed to enable users to discover dishes through the ingredients they have on hand, their nutritional requirements (if specified), and textual search queries. The platform utilizes the Spoonacular API for resources and queries. The goal is to create a user-friendly and engaging experience by providing users with advanced filtering options to help facilitate discovering dishes according to their specifications. The application also assists in appreciating the nutritional value of any chosen dish by presenting it as a dish card where various relevant metrics are displayed and emphasized through color coding and potentially other techniques.

---

## What You Have Done

- **Implemented Unified Search**: Combined textual, ingredient-based, and nutrient-specific searches into a single cohesive query using the Spoonacular API's complex search endpoint. Created views and presenters for ingredient and nutrient searches.
- **Dynamic Nutrient Input**: Integrated the ability to input and adjust over 30 nutrient parameters using sliders and input fields.
- **Ingredient Suggestions**: Added a feature to suggest ingredients dynamically as users type, using the autocomplete API call.
- **Dual-Handle Sliders**: Added intuitive dual-handle sliders for setting minimum and maximum values for nutrient parameters.
- **Modular File Structure**: Organized the project into a clear and maintainable file structure with reusable components.

---

## What You Still Plan to Do

- **Fully Implement Dish Cards**: Flesh out logic for scoring and rating to present each dish card effectively.
- **User Authentication**: Add login and registration functionality to allow users to save dish cards in their own "inventory."

---

## Project File Structure

### `/src`

#### `/config`
- **(currently empty)**

#### `/firebase`
- **firebaseConfig.js**: Firebase configuration settings.
- **firebaseModel.js**: Firebase-related logic and state management.
- **teacherfirebase.js**: Firebase mock helper function.

#### `/models`
- **DinnerModel.js**: Application state model logic.

#### `/presenters`
- **detailsPresenter.jsx**: Manages the detailed view of a selected recipe.
- **DishCardPresenter.jsx**: Presenter for dish card interaction logic.
- **IngredientSearchPresenter.jsx**: Presenter handling ingredient search-specific functionality.
- **NutritionalSearchPresenter.jsx**: Presenter handling the nutritional search logic.
- **searchPresenter.jsx**: Presenter for main search functionality.
- **sidebarPresenter.jsx**: Handles the sidebar navigation logic.
- **summaryPresenter.jsx**: Presenter for displaying summary information.

#### `/reactjs`
- **index.jsx**: Main entry point for the React application.
- **ReactRoot.jsx**: Root component for rendering the application.

#### `/styles`
- **dualSlider.css**: Styles for the dual-handle sliders used in nutritional search.
- **style.css**: General and global styles for the application.

#### `/utils`
- **apiConfig.js**: API configuration and keys.
- **dishSource.js**: Utility functions for API calls.
- **resolvePromise.js**: Helper function for managing promise states.
- **teacherFetch.js**: Fetch utility for testing and mock operations.

#### `/views`
- **detailsView.jsx**: Displays recipe details.
- **DishCardView.jsx**: View component for individual dish cards.
- **IngredientSearchView.jsx**: UI for searching recipes by ingredients.
- **NutritionalSearchView.jsx**: UI for searching recipes by nutritional criteria.
- **searchFormView.jsx**: Displays search input fields.
- **searchResultsView.jsx**: Displays results of a recipe search.
- **sidebarView.jsx**: Sidebar UI for navigation.
- **summaryView.jsx**: Displays a summary of selected recipes.

