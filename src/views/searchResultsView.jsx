export function SearchResultsView(props) {
    // handle event for the dish click
    return (<div>{props.searchResults.map(renderDishResultCB)}</div>);

    function renderDishResultCB(dish) {
        function handleDishClickACB() {
            props.onDishSelect(dish); // Fire custom event with dish object
            window.location.hash = `#/details`; // Set hash to navigate to details
        }

        return (
            <span
                key={dish.id}
                className="search-result"
                onClick={handleDishClickACB} // Custom event
                style={{ display: "inline-block",
                         textAlign: "center", 
                         width: "150px", 
                         verticalAlign: "top", 
                         margin: "10px",
                        }}
            >
                {/* Dish image */}
                <img
                    src={dish.image}
                    alt={dish.title}
                    height="100" // Fixed height
                />
                {/* Dish title */}
                <div>{dish.title}</div>
            </span>
        );
    }
}