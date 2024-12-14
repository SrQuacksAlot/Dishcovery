import '/src/styles/Details.css';
import "/src/styles/DishCard.css";

export function DetailsView(props) {
    const { dishData, isDishInMenu, onAddToMenu, onCancel, isModal } = props;

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

    // Navigation handler for "Add to Menu" button
    function handleAddToMenuClick() {
        onAddToMenu();

        if (isModal && onCancel) {
            onCancel(); // Close modal if applicable
        } else {
            window.location.hash = "#/search"; // Navigate back to search
        }
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
            <div className={`dish-card ${nutrientColorClass}`} >

                {/* Title */}
                <h2 className="dish-card-title"> {dishData.title}</h2>
                {/* Score Badge with  Color */}
                <div className={"dish-card-rarity"}> {Math.round(dishData.spoonacularScore) || "N/A"} </div>
                {/* Dish Image */}
                <img className="dish-card-image" src={dishData.image} alt={dishData.title} />
    
                {/* Card Content */}
                <div className="dish-card-content">

    
                    {/* Description */}
                    <div className="expandable-section" onClick={() => props.onSectionClick("description")}> 
                        <h4>Description</h4>
                        <div className="dish-card-description">
                            <p>{dishData.summary || "No description available."}</p>
                        </div>
                    </div>
                    
                    {/* instructions */}
                    <div className="expandable-section" onClick={() => props.onSectionClick("instructions")}> 
                        <h4>Instructions</h4>
                        <div className="dish-card-instructions">
                            <p>{dishData.instructions || "No instructions available."}</p>
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="expandable-section" onClick={() => props.onSectionClick("ingredients")}> 
                        <h4>Ingredients</h4>
                        <ul className="dish-card-ingredients">
                            {dishData.extendedIngredients.map(renderIngredientRowCB)}
                        </ul>
                    </div>
    
                    {/* Nutrition */}
                    <div className="expandable-section" onClick={() => props.onSectionClick("nutrition")}> 
                        <h4>Nutrition</h4>
                        <ul className="dish-card-nutrition">
                            {dishData.nutrition.nutrients.map((nutrient) => (
                                <li key={nutrient.name}>
                                    {nutrient.name}: {nutrient.amount} {nutrient.unit}
                                </li>
                            ))}
                        </ul>
                    </div>
    
                    {/* Actions */}
                    <div className="dish-card-actions">
                        <button onClick={handleAddToMenuClick} disabled={isDishInMenu}>Add to Menu</button>
                        <button onClick={onCancel}>Return</button>
                    </div>
                </div>
            </div>
    );
}
