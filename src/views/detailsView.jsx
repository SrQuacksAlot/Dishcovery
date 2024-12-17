import "/src/styles/DishCard.css";

export function DetailsView(props) {
    const {
        dishData,
        isDishInMenu,
        onAddToMenu,
        onCancel,
        isFlipped,
        onFlip, 
    } = props;

    // Callback for rendering ingredients in a table
    function renderIngredientRowCB(ingredient) {
        return (
            <tr key={ingredient.id}>
                <td>{ingredient.name}</td>
                <td className="right-align">{ingredient.amount}</td>
                <td>{ingredient.unit}</td>
            </tr>
        );
    }
    // Callback for rendering ingredients in a table
    function renderNutrientRowCB(nutrient) {
        return (
            <tr key={nutrient.id}>
                <td>{nutrient.name}</td>
                <td className="right-align">{nutrient.amount}</td>
                <td>{nutrient.unit}</td>
            </tr>
        );
    }

    

    // Callback for determining macronutrient-based color class
    function getMacronutrientColorCB(dish) {
        const { protein, fat, carbs } = dish.nutrition.nutrients.reduce(
            (acc, nutrient) => {
                if (nutrient.name === "Protein") acc.protein = nutrient.amount;
                if (nutrient.name === "Fat") acc.fat = nutrient.amount;
                if (nutrient.name === "Carbohydrates") acc.carbs = nutrient.amount;
                return acc;
            },
            { protein: 0, fat: 0, carbs: 0 }
        );

        if (protein > fat && protein > carbs) return "protein-dominant";
        if (fat > protein && fat > carbs) return "fat-dominant";
        if (carbs > protein && carbs > fat) return "carb-dominant";
        return "default-nutrient";
    }

    const nutrientColorClass = getMacronutrientColorCB(dishData);

    return (
        <div className='card-background' onClick={onCancel}>
            <div className="dish-card-container">
                <div className={`dish-card-inner ${isFlipped ? 'flipped' : ''}`}>
                    {/* Front Side */}
                    <div className="dish-card-front" onClick={(e) => e.stopPropagation()}>
                        <div className={`dish-card ${nutrientColorClass}`}>
    
                            {/* Title */}
                            <h2 className="dish-card-title"> {dishData.title}</h2>
    
                            {/* Score Badge with Color */}
                            <div className={"dish-card-score"}> {Math.round(dishData.spoonacularScore) || "N/A"} </div>
    
                            {/* Dish Image */}
                            <img className={`dish-card-image ${nutrientColorClass}`} src={dishData.image} alt={dishData.title} />
    
                            {/* Actions */}
                            <div className="dish-card-actions">
                                <button onClick={(e) => { e.stopPropagation(); onAddToMenu(); }} disabled={isDishInMenu}>Add to Menu</button>
                                <button onClick={(e) => { e.stopPropagation(); onCancel(); }}>Return</button>
                                <button onClick={(e) => { e.stopPropagation(); window.open(props.dishData.sourceUrl, "_blank", "noopener,noreferrer"); }}>More Information</button>
                                <button onClick={(e) => { e.stopPropagation(); onFlip(); }}>Flip</button>
                            </div>
    
                            {/* Card Content */}
                            <div className="dish-card-content">
    
                                {/* Instructions */}
                                <h4>Instructions</h4>
                                <div className="dish-card-instructions">
                                    <p>{dishData.instructions || "No instructions available."}</p>
                                </div>
    
                                {/* Ingredients */}
                                <h4>Ingredients</h4>
                                <ul className="dish-card-ingredients">
                                    {dishData.extendedIngredients.map(renderIngredientRowCB)}
                                </ul>
    
                                {/* Nutrition */}
                                <h4>Nutrition</h4>
                                <ul className="dish-card-nutrition">
                                    {dishData.nutrition.nutrients.map(renderNutrientRowCB)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Back Side */}
                    <div className="dish-card-back" onClick={(e) => e.stopPropagation()}>
                        <h4>Additional Information</h4>
                        <p>{dishData.summary || "No additional information available."}</p>
                        <div className="dish-card-back-actions">
                            <button onClick={(e) => { e.stopPropagation(); onFlip(); }}>Flip</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
