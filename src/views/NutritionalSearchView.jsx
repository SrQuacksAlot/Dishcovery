// NutritionalSearchView.jsx

export function NutritionalSearchView(props) {
  function handleInputChange(event) {
    const { name, value } = event.target;
    props.onInputChange(name, value);
  }

  function handleSearchClick() {
    props.onSearch();
  }
  function handleShowSidebarClick() {
    props.onShowSidebar(); // Function to show the sidebar
  }

  return (
    <div className="nutritional-search-wrapper">
      <button
            
            onClick={handleShowSidebarClick}
          >
            Show Sidebar
          </button>
      <h3 className="nutritional-search-header">Nutritional Search</h3>
      <div className="nutritional-search-container">
        <div className="nutrient-input-group">
          <label>
            Min Calories:
            <input
              type="number"
              name="minCalories"
              value={props.nutrientParams.minCalories || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Max Calories:
            <input
              type="number"
              name="maxCalories"
              value={props.nutrientParams.maxCalories || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="nutrient-input-group">
          <label>
            Min Protein (g):
            <input
              type="number"
              name="minProtein"
              value={props.nutrientParams.minProtein || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Max Protein (g):
            <input
              type="number"
              name="maxProtein"
              value={props.nutrientParams.maxProtein || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="nutrient-input-group">
          <label>
            Min Fat (g):
            <input
              type="number"
              name="minFat"
              value={props.nutrientParams.minFat || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Max Fat (g):
            <input
              type="number"
              name="maxFat"
              value={props.nutrientParams.maxFat || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="nutrient-input-group">
          <label>
            Min Carbs (g):
            <input
              type="number"
              name="minCarbs"
              value={props.nutrientParams.minCarbs || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Max Carbs (g):
            <input
              type="number"
              name="maxCarbs"
              value={props.nutrientParams.maxCarbs || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        {/* Add more nutrient inputs as needed */}
        <button className="nutritional-search-btn" onClick={handleSearchClick}>
          Search Recipes
        </button>
      </div>
    </div>
  );
}
