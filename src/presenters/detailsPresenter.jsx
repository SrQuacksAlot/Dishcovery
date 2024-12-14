import { observer } from "mobx-react-lite";
import { DetailsView } from "/src/views/detailsView.jsx";

const Details = observer(function DetailsPresenter(props) {
    const { model } = props;

    // Conditional rendering based on promise state in model
    if (!model.currentDishPromiseState.promise) return <span>No data</span>;
    if (model.currentDishPromiseState.error) return <span>Error: {String(model.currentDishPromiseState.error)}</span>;
    if (!model.currentDishPromiseState.data) return <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />;

    // Check if dish is already in the menu
    const isDishInMenu = model.dishes.some(dish => dish.id === model.currentDishPromiseState.data.id);

    // Named callback for adding the dish to the menu
    function handleAddToMenuACB() {
        model.addToMenu(model.currentDishPromiseState.data);
    }

    // Named callback for canceling the current selection
    function handleCancelACB() {
        model.removeCurrentDishID();
    }

    return (
        <DetailsView
            dishData={model.currentDishPromiseState.data}
            guests={model.numberOfGuests}
            isDishInMenu={isDishInMenu}
            onAddToMenu={handleAddToMenuACB}
            onCancel={handleCancelACB}
        />
    );
});

export { Details };
