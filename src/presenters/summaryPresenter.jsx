import { SummaryView } from "/src/views/summaryView.jsx";
import { observer } from "mobx-react-lite";
import { shoppingList } from "/src/utils/utilities.js";

const Summary = observer(function SummaryRender(props) {
    // Generate ingredients from the shoppingList function
    const ingredients = shoppingList(props.model.dishes);
    return <SummaryView servingsMultiplier={props.model.servingsMultiplier} ingredients={ingredients} />;
});

export { Summary };
