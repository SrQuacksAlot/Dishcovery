import '/src/styles/Ingredient.css';
export function IngredientSearchView(props) {
    function handleIngredientChangeACB(event) {
      const value = event.target.value;
      props.onIngredientChange(value);
  
      if (!value) {
        props.onClearSuggestions();
      }
    }
    function handleShowSidebarClick() {
      props.onShowSidebar();
    }
  
    return (
      <div className="ingredient-search-wrapper">
        <div className="sidebar-buttons">
        <button className="ingredient-action-btn btn-sidebar" onClick={handleShowSidebarClick}>Show Sidebar</button>
        </div>
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
        </div>
  
        <div>
          <h4>Selected Ingredients:</h4>
          <ul className="ingredient-list">
            {props.ingredients.map((ing, index) => (
              <li key={index} className="ingredient-list-item">
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
  