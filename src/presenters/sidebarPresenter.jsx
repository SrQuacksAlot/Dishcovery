import { SidebarView } from "/src/views/sidebarView.jsx";
import { observer } from "mobx-react-lite";

const Sidebar = observer(function SidebarRender(props) {
    const { model } = props;

    // Event handler for changing the number of guests
    function handleNumberChange(newNumber) {
        model.setservingsMultiplier(newNumber);
    }

    // Event handler for selecting a dish
    function handleDishClick(dish) {
        model.setCurrentDishId(dish.id);
    }

    // Event handler for removing a dish
    function deleteDish(dish) {
        model.removeFromMenu(dish);
    }


    function handleOnShowComplexSearch() {
        model.toggleShowComplexSearch();
    }

    return (
        <SidebarView
            servingsMultiplier={model.servingsMultiplier}
            dishes={model.dishes}
            onNumberChange={handleNumberChange}
            onDishClick={handleDishClick}
            deleteDish={deleteDish}
            onShowComplexSearch={handleOnShowComplexSearch}
        />
    );
});

export { Sidebar };