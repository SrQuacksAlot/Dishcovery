import { SidebarView } from "/src/views/sidebarView.jsx";
import { observer } from "mobx-react-lite";

const Sidebar = observer(function SidebarRender(props) {
    // Event handler for changing the number of guests
    function handleNumberChange(newNumber) {
        props.model.setNumberOfGuests(newNumber);
    }

    // Event handler for selecting a dish
    function handleDishClick(dish) {  
        props.model.setCurrentDishId(dish.id);
    }

    // Event handler for removing a dish
    function deleteDish(dish) {  
        props.model.removeFromMenu(dish);
    }

    return (
        <SidebarView
            number={props.model.numberOfGuests}
            dishes={props.model.dishes}
            onNumberChange={handleNumberChange}
            onDishClick={handleDishClick}  
            deleteDish={deleteDish}  
        />
    );
});

export { Sidebar };
