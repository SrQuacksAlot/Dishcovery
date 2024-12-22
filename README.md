
# Project: Discover Dishes Web Application

## Short Description the Project
This project is a web application designed to enable users to discover dishes through the ingredients they have on hand, their nutritional requirements and textual search queries. The platform utilizes the Spoonacular API for resources and queries and the codebase itself is based on the tutorial week project, it is further evolved in our own vision. 

The goal is to create a user-friendly and engaging experience by providing users with advanced filtering options to help facilitate discovering dishes according to their specifications. The application also assists in appreciating the nutritional value of any chosen dish by presenting it as a dish card where various relevant metrics are displayed and emphasized through color coding and a generalized nutrient score.

---

## What has been done

- **Implemented Unified Search**: Combined textual, ingredient-based, and nutrient-specific searches into a single cohesive query using the Spoonacular API's complex search endpoint. Created views and presenters for ingredient and nutrient searches.
- **Dynamic Nutrient Input**: Integrated the ability to input and adjust over 30 nutrient parameters using sliders and input fields.
- **Ingredient Suggestions**: Added a feature to suggest ingredients dynamically as users type, using the autocomplete API call.
- **Dual-Handle Sliders**: Added intuitive dual-handle sliders for setting minimum and maximum values for nutrient parameters.
- **Modular File Structure**: Organized the project into a clear and maintainable file structure with reusable components.
- **Fully Implemented Dish Cards**: Detailsview is now a Dish-Card, try clicking a dish to dishcover further!
- **User Authentication**: login and registration functionality added for persistence.
- **Color coding**: added color coding based on the dominant macronutrient group, groups included for macronutrients are carbs(blue), proteins(red) & fats(yellow).
---

## What is planned.
For future work we will consider improving the UI/UX further and implementing additional features that may serve to enhance the utility of this platform.
---

## Project File Structure
### `/src`


#### `/firebase`
- **firebaseConfig.js**: Firebase configuration settings.
- **firebaseModel.js**: Firebase-related logic and state management.
- **teacherfirebase.js**: Firebase mock helper function.

#### `/models`
- **DinnerModel.js**: Application state model logic.

#### `/presenters`
- **detailsPresenter.jsx**:  Presenter for dish card interaction logic.
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
- **detailsView.jsx**:  View component for individual dish cards.
- **IngredientSearchView.jsx**: UI for searching recipes by ingredients.
- **NutritionalSearchView.jsx**: UI for searching recipes by nutritional criteria.
- **searchFormView.jsx**: Displays search input fields.
- **searchResultsView.jsx**: Displays results of a recipe search.
- **sidebarView.jsx**: Sidebar UI for navigation.
- **summaryView.jsx**: Displays a summary of selected recipes.


## Setup
### Clone the Repository:
#### - Switch to your working directory `cd [working_directory/cloned_repo/etc...]`

### Install Dependencies: 
### - Run the following command to install required packages: `npm install`
### Start the Development Server: 
### - Launch the local development server with: `npm run dev`

