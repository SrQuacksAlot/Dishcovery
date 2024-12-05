// NutrientSearchResultsView.jsx

export function NutrientSearchResultsView(props) {
    const { results, onDishClick } = props;

    return (
        <div className="search-results">
            <h3>Nutrient Search Results</h3>
            <ul className="dish-list">
                {results.map((dish) => (
                    <li key={dish.id} className="dish-item">
                        <img src={dish.image} alt={dish.title} />
                        <h4>{dish.title}</h4>
                        <p>Calories: {dish.calories}</p>
                        <p>Protein: {dish.protein}</p>
                        <p>Fat: {dish.fat}</p>
                        <p>Carbs: {dish.carbs}</p>
                        <button onClick={() => onDishClick(dish.id)}>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
