
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
        <button className="ingredient-action-btn btn-sidebar" onClick={handleShowSidebarClick}>Show Menu</button>
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
            <ul className="ingredient-list">
              {/* Combine included and excluded ingredients */}
              {[...(props.includedIngredients || []), ...(props.excludedIngredients || [])].map(
                (ingredient, index) => (
                  <li
                    key={index}
                    className={`ingredient-list-item ${
                      (props.includedIngredients || []).includes(ingredient)
                        ? "included"
                        : "excluded"
                    }`}
                  >
                    <span
                      className="ingredient-name"
                      onClick={() => props.onToggleIngredient(ingredient)}
                    >
                      {ingredient}
                    </span>
                    <button
                      onClick={() => props.onRemoveIngredient(ingredient)}
                      className="ingredient-list-item-remove"
                    >
                      ✖
                    </button>
                  </li>
                )
              )}
            </ul>
        </div>


      </div>
    );
  }
  