import { dishType, menuPrice, sortDishes } from "/src/utils/utilities.js";
import "/src/styles/style.css";

export function SidebarView(props) {
    // Sort the dishes before rendering
    const sortedDishes = sortDishes(props.dishes);
    const totalPrice = (menuPrice(sortedDishes) * props.number).toFixed(2);

    // Event handler for increasing the number
    function increaseNumberACB() {props.onNumberChange(props.number + 1);}

    // Event handler for decreasing the number
    function decreaseNumberACB() {props.onNumberChange(props.number - 1);}

    // Callback function for rendering each dish row
    function dishTableRowCB(dish) {
        // Event handler for deleting a dish
        function xClickedACB() {props.deleteDish(dish);}
        // Event handler for clicking the dish link
        function dishLinkClickedACB(evt) {
            evt.preventDefault(); // Prevent default browser behavior
            props.onDishClick(dish); // Fire custom event with the dish object
            window.location.hash = `#/details`; // Navigate to /details
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
                <td>{dishType(dish)}</td>
                <td className="right-align">{(dish.pricePerServing * props.number).toFixed(2)}</td>
            </tr>
        );
    }

    return (
        <div className="sidebar">
            <button onClick={decreaseNumberACB} disabled={props.number <= 1}>-</button>
            <span>{props.number}</span>
            <button onClick={increaseNumberACB}>+</button>
            <table>
                <tbody>
                    {sortedDishes.map(dishTableRowCB)}
                    <tr>
                        <td></td> {/* Empty space */}
                        <td>Total:</td>
                        <td></td> {/* Empty space */}
                        <td className="right-align">{totalPrice}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}