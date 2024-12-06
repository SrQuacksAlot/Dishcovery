export function SearchResultsView(props) {
    return (
        <div className="search-results-container">
            {props.searchResults.map(renderDishResultCB)}
        </div>
    );

    function renderDishResultCB(dish) {
        function handleDishClickACB() {
            props.onDishSelect(dish);
            window.location.hash = `#/details`;
        }

        return (
            <div 
                key={dish.id} 
                className="search-result-card" 
                onClick={handleDishClickACB}
            >
                <img 
                    className="dish-image" 
                    src={dish.image} 
                    alt={dish.title} 
                />
                <div className="dish-title" title={dish.title}>{dish.title}</div>
            </div>
        );
    }
}
