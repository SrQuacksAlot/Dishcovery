import { observer } from "mobx-react-lite";
import { DetailsView } from "/src/views/detailsView.jsx";

const Details = observer(function DetailsPresenter({ model }) {
    if (!model.currentDishPromiseState.promise) return <span>No data</span>;
    if (model.currentDishPromiseState.error) return <span>Error: {String(model.currentDishPromiseState.error)}</span>;
    if (!model.currentDishPromiseState.data) return <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />;

    const isDishInMenu = model.dishes.some(dish => dish.id === model.currentDishPromiseState.data.id);

    function handleAddToMenuACB() {
        model.addToMenu(model.currentDishPromiseState.data);
    }

    function handleCancelACB() {
        model.removeCurrentDishID();
    }

    function handleFlip() {
        model.flipped = !model.flipped; // Toggle the flipped state
    }
    
    return (
        <DetailsView
            dishData={model.currentDishPromiseState.data}
            isDishInMenu={isDishInMenu}
            onAddToMenu={handleAddToMenuACB}
            onCancel={handleCancelACB}
            isFlipped={model.flipped} // Pass flipped state
            onFlip={handleFlip} // Pass the toggle function
        />
    );
    
});

export { Details };
