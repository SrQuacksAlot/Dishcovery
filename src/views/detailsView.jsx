export function DetailsView(props) {
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

    // Navigation handler for "Cancel" button, navigates to /search
    function handleCancelClick() {window.location.hash = "#/search";} 

    // Navigation handler for "Add to Menu" button
    function handleAddToMenuClick() {
        props.onAddToMenu(); // Call the existing handler
        window.location.hash = "#/search"; // Navigate to /search
    }

    return (
        <div className="details-view">
            {/* Dish Figure */}
            <figure className="dish-figure">
                <img
                    src={props.dishData.image}
                    alt={props.dishData.title}
                />
                <figcaption>{props.dishData.title}</figcaption>
            </figure>

            <div className="details-body">
                {/* Price Section */}
                <section className="price-details">
                    <table>
                        <caption>Price Information</caption>
                        <tbody>
                            <tr>
                                <td>Price per person:</td>
                                <td>{props.dishData.pricePerServing}</td>
                            </tr>
                            <tr>
                                <td>Total for {props.guests} guests:</td>
                                <td>{(props.dishData.pricePerServing * props.guests).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* Ingredients Section */}
                <section className="ingredients-section">
                    <table>
                        <caption>Ingredients</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>{props.dishData.extendedIngredients.map(renderIngredientRowCB)}</tbody>
                    </table>
                </section>

                {/* Instructions Section */}
                <section className="instructions-section">
                    <table>
                        <caption>Instructions</caption>
                        <tbody>
                            <tr><td>{props.dishData.instructions || "No instructions available."}</td></tr>
                        </tbody>
                    </table>
                </section>

                {/* Recipe Link Section */}
                <section className="recipe-link">
                    <a href={props.dishData.sourceUrl} target="_blank" rel="noopener noreferrer">More information</a>
                </section>

                {/* Footer Buttons */}
                <div className="details-footer">
                    <button onClick={handleAddToMenuClick} disabled={props.isDishInMenu}>Add to menu!</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
