import { dishType, menuPrice, sortDishes } from "/src/utils/utilities.js";
import "/src/styles/style.css";

export function SidebarView(props) {
    // Sort the dishes before rendering
    const sortedDishes = sortDishes(props.dishes);

    // Event handler for increasing the number
    function increaseNumberACB() { props.onNumberChange(props.servingsMultiplier + 1); }

    // Event handler for decreasing the number
    function decreaseNumberACB() { props.onNumberChange(props.servingsMultiplier - 1); }


    function showComplexSearch() {
        props.onShowComplexSearch();
        window.location.hash = "#/search"; // Navigate to Nutritional Search page
    }

    // Callback function for rendering each dish row
    function dishTableRowCB(dish) {
        // Event handler for deleting a dish
        function xClickedACB() { props.deleteDish(dish); }
        // Event handler for clicking the dish link
        function dishLinkClickedACB(evt) {
            evt.preventDefault(); // Prevent default browser behavior
            props.onDishClick(dish); // Fire custom event with the dish object
            // window.location.hash = `#/details`; // Navigate to /details
        }

        return (
            <tr key={dish.id}>
                <td>
                    <button onClick={xClickedACB}>X</button>
                </td>
                <td>
                    <a
                        href={`#/details/${dish.id}`}
                        onClick={dishLinkClickedACB}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                                src={dish.image}
                                alt={dish.title}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                    marginRight: "10px",
                                    borderRadius: "5px",
                                }}
                            />
                            <span>{dish.title}</span>
                        </div>
                    </a>
                </td>
                <td>{dish.servings * props.servingsMultiplier}</td>
                {/* <td className="right-align">{(props.number).toFixed(2)}</td> */}
                {/* <td className="right-align">{(dish.pricePerServing * props.number).toFixed(2)}</td> */}
            </tr>
        );
    }

    return (
        <div>
            
            <div className="sidebar-buttons">
            <button className="modern-button" onClick={showComplexSearch}>
                Show Complex Search
            </button>
            <h2 className="sidebar-header">Menu</h2> {/* Title added here */}
            </div>
            <div className="servings-multiplier">
            <button className="modern-button circle-button" onClick={decreaseNumberACB} disabled={props.servingsMultiplier <= 1}>
                -
            </button>
            <span className="servings-text">Servings Multiplier</span>
            <span className="number-display">{props.servingsMultiplier}</span>
            <button className="modern-button circle-button" onClick={increaseNumberACB}>
                +
            </button>
            </div>


            <table>
                <tbody>
                    {sortedDishes.map(dishTableRowCB)}

                </tbody>
            </table>
            
        </div>
    );
}
