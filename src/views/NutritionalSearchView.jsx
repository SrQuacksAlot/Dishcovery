
export function NutritionalSearchView(props) {
  
  // Callback for when input or slider value changes
  function handleInputChange(event) {
    const { name, value } = event.target;
    props.onInputChange(name, value);
  }


  // Function to render dual slider for each nutrient
  function renderDualSlider(labelText, minName, maxName, minValue, maxValue, min = 0, max = 100) {
    const sliderAttributes = (name, value) => ({
      type: "range",
      value: value || min,
      min,
      max,
      onChange: handleSliderChange,
      name,
      className: "nutritional-search-slider",
    });

    function updateSliderBackground(minSlider, maxSlider) {
      const min = parseInt(minSlider.min, 10);
      const max = parseInt(maxSlider.max, 10);
    
      const minValue = parseInt(minSlider.value, 10);
      const maxValue = parseInt(maxSlider.value, 10);
    
      const minPercent = ((minValue - min) / (max - min)) * 100;
      const maxPercent = ((maxValue - min) / (max - min)) * 100;
    
      // Apply the gradient to the slider track
      minSlider.style.background = `linear-gradient(to right, 
        #c6c6c6 ${minPercent}%, 
        #387bbe ${minPercent}%, 
        #387bbe ${maxPercent}%, 
        #c6c6c6 ${maxPercent}%)`;
    
      maxSlider.style.background = minSlider.style.background; 
    }

    function handleSliderChange(event) {
      const { name, value } = event.target;
      const numValue = parseInt(value, 10);

      if (name === minName) {
        props.onInputChange(minName, Math.min(numValue, (maxValue || max) - 1));}
      else if (name === maxName) {
        props.onInputChange(maxName, Math.max(numValue, (minValue || min)));}

      const minSlider = document.getElementById(`${minName}Slider`);
      const maxSlider = document.getElementById(`${maxName}Slider`);
      updateSliderBackground(minSlider, maxSlider);
    }

    return (
      <div className="nutritional-search-range-container">
        <h5 className="nutritional-search-range-label">{labelText}</h5>
        <div className="nutritional-search-sliders-control">
          <input id={`${minName}Slider`} {...sliderAttributes(minName, minValue)} />
          <input id={`${maxName}Slider`} {...sliderAttributes(maxName, maxValue)} />
        </div>
        <div className="nutritional-search-form-control">
          <div className="nutritional-search-form-control-container">
            <div className="nutritional-search-form-control-label">Min</div>
              <input
                type="number"
                value={minValue || ''}
                onChange={(e) => handleInputChange(e)}
                min={min}
                max={maxValue || max} 
                name={minName}
                className="nutritional-search-number-input"
              />
            </div>
          <div className="nutritional-search-form-control-container">
            <div className="nutritional-search-form-control-label">Max</div>
              <input
                type="number"
                value={maxValue || ''}
                onChange={(e) => handleInputChange(e)}
                min={minValue || min} 
                max={max}
                name={maxName}
                className="nutritional-search-number-input"
              />
            </div>
          </div>
      </div>
    );
  }

  function renderNutrientGroup(label, sliders) {
    return (
      <details className="nutrient-group">
        <summary className="section-header">
          {label}
          <span className="icon">▼</span>
        </summary>
        <div className="nutrient-sliders-container">{sliders}</div>
      </details>
    );
  }



  function renderNutrientInputGroups() {
    return (
      <div className="nutritional-search-container">
        {renderNutrientGroup("Macronutrients", (
          <>
            {renderDualSlider("Calories (kcal):", "minCalories", "maxCalories", props.nutrientParams.minCalories, props.nutrientParams.maxCalories, 0, 1500)}
            {renderDualSlider("Protein (g):", "minProtein", "maxProtein", props.nutrientParams.minProtein, props.nutrientParams.maxProtein, 0, 300)}
            {renderDualSlider("Carbohydrates (g):", "minCarbs", "maxCarbs", props.nutrientParams.minCarbs, props.nutrientParams.maxCarbs, 0, 500)}
            {renderDualSlider("Fat (g):", "minFat", "maxFat", props.nutrientParams.minFat, props.nutrientParams.maxFat, 0, 200)}
            {renderDualSlider("Caffeine (mg):", "minCaffeine", "maxCaffeine", props.nutrientParams.minCaffeine, props.nutrientParams.maxCaffeine, 0, 500)}
            {renderDualSlider("Fiber (g):", "minFiber", "maxFiber", props.nutrientParams.minFiber, props.nutrientParams.maxFiber, 0, 100)}
            {renderDualSlider("Sugar (g):", "minSugar", "maxSugar", props.nutrientParams.minSugar, props.nutrientParams.maxSugar, 0, 200)}
          </>
        ))}
        {renderNutrientGroup("Vitamins", (
          <>
            {renderDualSlider("Vitamin A (IU):", "minVitaminA", "maxVitaminA", props.nutrientParams.minVitaminA, props.nutrientParams.maxVitaminA, 0, 5000)}
            {renderDualSlider("Vitamin C (mg):", "minVitaminC", "maxVitaminC", props.nutrientParams.minVitaminC, props.nutrientParams.maxVitaminC, 0, 500)}
            {renderDualSlider("Vitamin D (µg):", "minVitaminD", "maxVitaminD", props.nutrientParams.minVitaminD, props.nutrientParams.maxVitaminD, 0, 100)}
            {renderDualSlider("Vitamin E (mg):", "minVitaminE", "maxVitaminE", props.nutrientParams.minVitaminE, props.nutrientParams.maxVitaminE, 0, 100)}
            {renderDualSlider("Vitamin K (µg):", "minVitaminK", "maxVitaminK", props.nutrientParams.minVitaminK, props.nutrientParams.maxVitaminK, 0, 100)}
            {renderDualSlider("Vitamin B1 (mg):", "minVitaminB1", "maxVitaminB1", props.nutrientParams.minVitaminB1, props.nutrientParams.maxVitaminB1, 0, 100)}
            {renderDualSlider("Vitamin B2 (mg):", "minVitaminB2", "maxVitaminB2", props.nutrientParams.minVitaminB2, props.nutrientParams.maxVitaminB2, 0, 100)}
            {renderDualSlider("Vitamin B3 (mg):", "minVitaminB3", "maxVitaminB3", props.nutrientParams.minVitaminB3, props.nutrientParams.maxVitaminB3, 0, 100)}
            {renderDualSlider("Vitamin B5 (mg):", "minVitaminB5", "maxVitaminB5", props.nutrientParams.minVitaminB5, props.nutrientParams.maxVitaminB5, 0, 100)}
            {renderDualSlider("Vitamin B6 (mg):", "minVitaminB6", "maxVitaminB6", props.nutrientParams.minVitaminB6, props.nutrientParams.maxVitaminB6, 0, 100)}
            {renderDualSlider("Vitamin B12 (µg):", "minVitaminB12", "maxVitaminB12", props.nutrientParams.minVitaminB12, props.nutrientParams.maxVitaminB12, 0, 100)}

          </>
        ))}
        {renderNutrientGroup("Minerals", (
          <>
            {renderDualSlider("Calcium (mg):", "minCalcium", "maxCalcium", props.nutrientParams.minCalcium, props.nutrientParams.maxCalcium, 0, 1500)}
            {renderDualSlider("Iron (mg):", "minIron", "maxIron", props.nutrientParams.minIron, props.nutrientParams.maxIron, 0, 100)}
            {renderDualSlider("Zinc (mg):", "minZinc", "maxZinc", props.nutrientParams.minZinc, props.nutrientParams.maxZinc, 0, 100)}
            {renderDualSlider("Magnesium (mg):", "minMagnesium", "maxMagnesium", props.nutrientParams.minMagnesium, props.nutrientParams.maxMagnesium, 0, 500)}
            {renderDualSlider("Potassium (mg):", "minPotassium", "maxPotassium", props.nutrientParams.minPotassium, props.nutrientParams.maxPotassium, 0, 3000)}
            {renderDualSlider("Copper (mg):", "minCopper", "maxCopper", props.nutrientParams.minCopper, props.nutrientParams.maxCopper, 0, 100)}
            {renderDualSlider("Phosphorus (mg):", "minPhosphorus", "maxPhosphorus", props.nutrientParams.minPhosphorus, props.nutrientParams.maxPhosphorus, 0, 1000)}
            {renderDualSlider("Sodium (mg):", "minSodium", "maxSodium", props.nutrientParams.minSodium, props.nutrientParams.maxSodium, 0, 2300)}
            {renderDualSlider("Iodine (µg):", "minIodine", "maxIodine", props.nutrientParams.minIodine, props.nutrientParams.maxIodine, 0, 1000)}
            {renderDualSlider("Selenium (µg):", "minSelenium", "maxSelenium", props.nutrientParams.minSelenium, props.nutrientParams.maxSelenium, 0, 400)}
            {renderDualSlider("Manganese (mg):", "minManganese", "maxManganese", props.nutrientParams.minManganese, props.nutrientParams.maxManganese, 0, 11)}

          </>
        ))}
        {renderNutrientGroup("Others", (
        <>
            {renderDualSlider("Fluoride (mg):", "minFluoride", "maxFluoride", props.nutrientParams.minFluoride, props.nutrientParams.maxFluoride, 0, 100)}
            {renderDualSlider("Choline (mg):", "minCholine", "maxCholine", props.nutrientParams.minCholine, props.nutrientParams.maxCholine, 0, 550)}
            {renderDualSlider("Folate (µg):", "minFolate", "maxFolate", props.nutrientParams.minFolate, props.nutrientParams.maxFolate, 0, 1000)}
            {renderDualSlider("Folic Acid (µg):", "minFolicAcid", "maxFolicAcid", props.nutrientParams.minFolicAcid, props.nutrientParams.maxFolicAcid, 0, 1000)}
            {renderDualSlider("Alcohol (g):", "minAlcohol", "maxAlcohol", props.nutrientParams.minAlcohol, props.nutrientParams.maxAlcohol, 0, 100)}
            {renderDualSlider("Cholesterol (mg):", "minCholesterol", "maxCholesterol", props.nutrientParams.minCholesterol, props.nutrientParams.maxCholesterol, 0, 300)}
            {renderDualSlider("Saturated Fat (g):", "minSaturatedFat", "maxSaturatedFat", props.nutrientParams.minSaturatedFat, props.nutrientParams.maxSaturatedFat, 0, 100)}
        </>
        ))}
      </div>
    );
  }


  // Main return without search results
  return (
    <div className="nutritional-search-wrapper">
      <h3 className="nutritional-search-header">Nutritional Search</h3>
      {renderNutrientInputGroups()}
    </div>
  );
}
