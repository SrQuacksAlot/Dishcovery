export function IngredientSearchView(props) {
    function handleIngredientChangeACB(event) {
        const value = event.target.value;
        props.onIngredientChange(value);

        if (!value) {
            props.onClearSuggestions();
        }
    }

    function handleSearchDishesACB() {
        // Call the search function in the presenter
        props.onSearchDishes();
        window.location.hash = "#/search";
    }

    function handleShowSidebarClick() {
        props.onShowSidebar(); // Function to show the sidebar
    }
    

    return (
        <div className="ingredient-search-wrapper">
            <h3 className="ingredient-search-header">Ingredient Search</h3>

            <div className="ingredient-search-container">
                <input
                    className="ingredient-search-input"
                    value={props.ingredient}
                    onChange={handleIngredientChangeACB}
                    placeholder="Enter ingredient"
                />

                {props.suggestions && props.suggestions.length > 0 && (
                    <ul className="ingredient-suggestions">
                        {props.suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="ingredient-suggestion-item"
                                onClick={() => {
                                    props.onSelectSuggestion(suggestion);
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="ingredient-actions">
                <button
                    className="ingredient-action-btn"
                    onClick={handleSearchDishesACB}
                >
                    Search Dishes
                </button>

                <button
                    className="ingredient-action-btn btn-sidebar"
                    onClick={handleShowSidebarClick}
                >
                    Show Sidebar
                </button>
            </div>

            <div>
                <h4>Selected Ingredients:</h4>
                <ul className="ingredient-list">
                    {props.ingredients.map((ing, index) => (
                        <li
                            key={index}
                            className="ingredient-list-item"
                        >
                            <span>{ing}</span>
                            <button
                                onClick={() => props.onRemoveIngredient(ing)}
                                className="ingredient-list-item-remove"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}