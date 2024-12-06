export function NutritionalSearchView(props) {
  // Callbacks for various actions
  function handleInputChange(event) {
    const { name, value } = event.target;
    props.onInputChange(name, value);
  }

  function handleSearchClick() {
    props.onSearch();
  }

  function handleShowSidebarClick() {
    props.onShowSidebar();
  }

  // Callback to render nutrient input fields
  function renderNutrientInput(labelText, name, value) {
    return (
      <div className="nutrient-input-field">
        <label>
          {labelText}
          <input
            type="number" 
            name={name}
            value={value || ''}
            onChange={handleInputChange}
          />
        </label>
      </div>
    );
  }

  // Rendering all nutrient input groups
  function renderNutrientInputGroups() {
    return (
      <div className="nutritional-search-container">
        {renderNutrientInput("Min Calories:", "minCalories", props.nutrientParams.minCalories)}
        {renderNutrientInput("Max Calories:", "maxCalories", props.nutrientParams.maxCalories)}
        {renderNutrientInput("Min Protein (g):", "minProtein", props.nutrientParams.minProtein)}
        {renderNutrientInput("Max Protein (g):", "maxProtein", props.nutrientParams.maxProtein)}
        {renderNutrientInput("Min Fat (g):", "minFat", props.nutrientParams.minFat)}
        {renderNutrientInput("Max Fat (g):", "maxFat", props.nutrientParams.maxFat)}
        {renderNutrientInput("Min Carbs (g):", "minCarbs", props.nutrientParams.minCarbs)}
        {renderNutrientInput("Max Carbs (g):", "maxCarbs", props.nutrientParams.maxCarbs)}
      </div>
    );
  }

  // Main return without search results
  return (
    <div className="nutritional-search-wrapper">
      <button onClick={handleShowSidebarClick}>Show Sidebar</button>
      <h3 className="nutritional-search-header">Nutritional Search</h3>
      {renderNutrientInputGroups()}
      <button className="nutritional-search-btn" onClick={handleSearchClick}>
        Search Dishes
      </button>
    </div>
  );
}
