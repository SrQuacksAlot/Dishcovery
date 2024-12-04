import { SummaryView } from "../views/summaryView.jsx";
import { observer } from "mobx-react-lite";
import { shoppingList } from "/src/utils/utilities.js";

const Summary = observer(function SummaryRender(props) {
    // Generate ingredients from the shoppingList function
    const ingredients = shoppingList(props.model.dishes);
    return <SummaryView people={props.model.numberOfGuests} ingredients={ingredients} />;
});

export { Summary };
