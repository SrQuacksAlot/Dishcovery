import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { IngredientSearchView } from "/src/views/IngredientSearchView.jsx";
import { searchByIngredients } from "/src/utils/dishsource.js"; // Import the function to search by ingredients

const IngredientSearchPresenter = observer(function IngredientSearchPresenter({ model }) {
    const [ingredients, setIngredients] = useState([]);

    // Function to add an ingredient to the list
    const handleAddIngredient = (ingredient) => {
        setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    };

    // Function to perform the search based on selected ingredients
    const handleSearch = async () => {
        try {
            const results = await searchByIngredients(ingredients);
            model.setSearchResults(results); // Assuming model has a method to set search results
        } catch (error) {
            console.error("Error searching by ingredients:", error);
        }
    };

    // Function to clear the ingredient list
    const handleClearIngredients = () => {
        setIngredients([]);
    };

    return (
        <div>
            <IngredientSearchView
                ingredients={ingredients}
                onAddIngredient={handleAddIngredient} // Pass the function here
                onSearch={handleSearch}
                onClearIngredients={handleClearIngredients}
            />
            <button onClick={handleSearch}>Search Recipes</button>
            <button onClick={handleClearIngredients}>Clear Ingredients</button>
        </div>
    );
});

export { IngredientSearchPresenter };