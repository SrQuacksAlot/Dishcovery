
export function DetailsView(props) {


    // Callback for rendering ingredients in a table
    function renderIngredientRowCB(ingredient) {
        return (
            <tr key={ingredient.id}>
                <td>{ingredient.name}</td>
                <td>{ingredient.amount}</td>
                <td>{ingredient.unit}</td>
            </tr>
        );
    }
    // Callback for rendering ingredients in a table
    function renderNutrientRowCB(nutrient) {
        return (
            <tr key={nutrient.id}>
                <td>{nutrient.name}</td>
                <td>{nutrient.amount}</td>
                <td>{nutrient.unit}</td>
            </tr>
        );
    }
    // Callback for rendering instructions as steps
    function renderInstructionStepCB(step, index) {
        return (
            <li key={index}>
            {step}
            </li>
        );
    }
    
    function Tooltip({ text }) {
        return (
            <div className="tooltip-container">
                <span className="tooltip-icon">?</span>
                <div className="tooltip-text">{text}</div>
            </div>
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

    const nutrientColorClass = getMacronutrientColorCB(props.dishData);

    return (
        <div className='card-background' onClick={props.onCancel}> 
            {/* Front Side */}
            <div className={`dish-card-front ${nutrientColorClass} ${props.isFlipped ? 'flipped' : ''} `} onClick={(e) => e.stopPropagation()}>
                {/* Title and Score */}
                <h2 className="dish-card-title">{props.dishData.title}</h2>
                <div className="dish-card-score">{Math.round(props.dishData.spoonacularScore) || "N/A"}</div>

                {/* Dish Image */}
                <img
                    className={`dish-card-image ${nutrientColorClass}`}
                    src={props.dishData.image}
                    alt={props.dishData.title}
                />

                {/* Actions */}
                <div className="dish-card-actions">
                    <button onClick={props.onAddToMenu} disabled={props.isDishInMenu}>Add to Menu</button>
                    <button onClick={props.onCancel}>Return</button>
                    <button onClick={() => window.open(props.dishData.sourceUrl, "_blank", "noopener,noreferrer")}>
                        More Information
                    </button>
                    <button onClick={props.onFlip}>Flip</button>
                </div>

                {/* Card Content */}
                <div className="dish-card-section">
                    <h4>Nutrition</h4>
                    <table className="dish-card-nutrition">
                        <thead>
                            <tr>
                                <th>Nutrient</th>
                                <th>Amount</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.dishData.nutrition.nutrients.map(renderNutrientRowCB)}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Back Side */}
            <div className={`dish-card-back ${nutrientColorClass} ${props.isFlipped ? 'flipped' : ''} `} onClick={(e) => e.stopPropagation()}>
                <div className="dish-card-actions">
                    <button onClick={props.onFlip}>Flip</button>
                </div>    
                

                <div className="dish-card-section">
                    <h4>Instructions  </h4>
                    <ol className="dish-card-instructions">
                        {props.dishData.instructions
                            ? props.dishData.instructions.split('. ').map(renderInstructionStepCB) // Split by sentence or step
                            : <li>No instructions available.</li>
                        }
                    </ol>
                </div>

                <div className="dish-card-section">
                    <h4>Ingredients for {props.dishData.servings || ""} servings</h4>
                    <table className="dish-card-ingredients">
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Amount</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.dishData.extendedIngredients.map(renderIngredientRowCB)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    
    
}
