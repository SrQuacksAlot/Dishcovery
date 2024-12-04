import React, { useState } from "react";

export function IngredientSearchView(props) {
    const [ingredient, setIngredient] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Handle input change for ingredient
    function handleIngredientChangeACB(event) {
        const value = event.target.value;
        setIngredient(value);
        
        // Fetch suggestions based on the current input value
        if (value) {
            fetchSuggestions(value);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    }

    // Fetch ingredient suggestions (this could be an API call)
    function fetchSuggestions(value) {
        // Example: Replace this with your actual suggestion fetching logic
        const allIngredients = ["Tomato", "Onion", "Garlic", "Ginger", "Pepper"];
        const filteredSuggestions = allIngredients.filter(ingredient =>
            ingredient.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    }

    // Add the ingredient to the list
    function handleAddIngredientACB() {
        if (ingredient.trim()) {
            props.onAddIngredient(ingredient);
            setIngredient(""); // Clear input
            setSuggestions([]); // Clear suggestions
        }
    }

    // Navigate back to the main search
    function handleBackClickACB() {
        window.location.hash = "#/search";
    }

    return (
        <div>
            <h3>Ingredient Search</h3>
            <input
                value={ingredient}
                onChange={handleIngredientChangeACB}
                placeholder="Enter ingredient"
                style={{ position: 'relative' }} // Ensure relative positioning for dropdown
            />
            <button onClick={handleAddIngredientACB}>Add Ingredient</button>
            <button onClick={handleBackClickACB}>Back to Search</button>
            {/* Dropdown for suggestions */}
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => {
                            setIngredient(suggestion);
                            setSuggestions([]); // Clear suggestions after selection
                        }} style={{ cursor: 'pointer', padding: '5px' }}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            <div>
                <h4>Selected Ingredients:</h4>
                <ul>
                    {props.ingredients.map((ing, index) => (
                        <li key={index}>{ing}</li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
}