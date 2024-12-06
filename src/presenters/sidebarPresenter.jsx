import { SidebarView } from "/src/views/sidebarView.jsx";
import { observer } from "mobx-react-lite";

const Sidebar = observer(function SidebarRender(props) {
    const { model } = props;

    // Event handler for changing the number of guests
    function handleNumberChange(newNumber) {
        model.setNumberOfGuests(newNumber);
    }

    // Event handler for selecting a dish
    function handleDishClick(dish) {
        model.setCurrentDishId(dish.id);
    }

    // Event handler for removing a dish
    function deleteDish(dish) {
        model.removeFromMenu(dish);
    }

    function handleShowIngredientSearch() {
        model.toggleIngredientSearch();
    }

    function handleNavigateToNutritionalSearch() {
        model.toggleNutrientSearch();
    }

    return (
        <SidebarView
            number={model.numberOfGuests}
            dishes={model.dishes}
            onNumberChange={handleNumberChange}
            onDishClick={handleDishClick}
            deleteDish={deleteDish}
            onShowIngredientSearch={handleShowIngredientSearch}
            onNavigateToNutritionalSearch={handleNavigateToNutritionalSearch}
        />
    );
});

export { Sidebar };