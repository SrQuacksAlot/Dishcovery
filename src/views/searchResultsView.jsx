
export function SearchResultsView(props) {
    return (
        <div className="search-results-view">
            <div className="search-results-container">
                {props.searchResults.length === 0 ? (
                <div className="no-results">No dishes found.</div>
            ) : (
                props.searchResults.map(renderDishResultCB)
            )}
            </div>
            <button className="load-more-btn" onClick={props.loadMore}> Load More </button> 

        </div>
    );

    function renderDishResultCB(dish) {
        function handleDishClickACB() {
            props.onDishSelect(dish);
            // window.location.hash = `#/details`;
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
