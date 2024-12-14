import '/src/styles/Details.css';

export function DetailsView(props) {
    // Existing callback for rendering ingredients in a table
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
    function handleCancelClick() {
        props.onCancel();
    } 

    // Navigation handler for "Add to Menu" button
    function handleAddToMenuClick() {
        props.onAddToMenu(); // Call the existing handler
        
        // If in modal mode, close the modal
        if (props.isDishDetailsModalOpen && props.onCancel) {
            props.onCancel();
        } else {
            window.location.hash = "#/search"; // Navigate to /search
        }
    }

    // Determine the container classes based on modal prop
    const containerClasses = `details-view ${props.isModal ? 'modal' : ''}`;
    const contentClasses = `details-content ${props.isModal ? 'modal-content' : ''}`;

    return (
        <div className={containerClasses}>
            <div className={contentClasses}>
                
                {/* Close button for modal mode */}
                {props.isModal && (
                    <button 
                        className="close-modal-btn" 
                        onClick={props.onCancel}
                    >
                        ×
                    </button>
                )}

                {/* Dish Figure */}
                <figure className="dish-figure">
                    <img
                        src={props.dishData.image}
                        alt={props.dishData.title}
                    />
                    <figcaption>{props.dishData.title}</figcaption>
                </figure>

                <div className="details-body">
                    {/* Footer Buttons */}
                    <div className="details-footer">
                        <button 
                            onClick={handleAddToMenuClick} 
                            disabled={props.isDishInMenu}
                        >
                            Add to menu!
                        </button>
                        
                        {/* Only show "Back to Search" button if not in modal mode */}
                        {!props.isModal && (
                            <button onClick={handleCancelClick}>
                                Back To Search
                            </button>
                        )}
                    </div>

                    {/* Servings Section */}
                    <section className="servings-section">
                        <table>
                            <tbody>
                            <tr>
                                <td>Servings:</td>
                                <td>{props.dishData.servings}</td>
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
                            <tbody>
                                {props.dishData.extendedIngredients.map(renderIngredientRowCB)}
                            </tbody>
                        </table>
                    </section>

                    {/* Instructions Section */}
                    <section className="instructions-section">
                        <table>
                            <caption>Instructions</caption>
                            <tbody>
                                <tr>
                                    <td>
                                        {props.dishData.instructions || "No instructions available."}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* Recipe Link Section */}
                    <section className="recipe-link">
                        <a 
                            href={props.dishData.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            More information
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}