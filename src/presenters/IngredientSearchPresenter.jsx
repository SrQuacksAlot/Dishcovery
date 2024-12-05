import { observer } from "mobx-react-lite";
import { IngredientSearchView } from "/src/views/IngredientSearchView.jsx";

const IngredientSearchPresenter = observer(function IngredientSearchPresenter({ model }) {
    const handleIngredientChange = (value) => {
        model.setCurrentIngredient(value);
        
        // Only fetch suggestions if there's a value
        if (value) {
            model.fetchSuggestions(value); // Call the model's fetchSuggestions method
        } else {
            model.clearSuggestions(); // Clear suggestions if no value
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        model.addIngredient(suggestion); // Add the selected suggestion as an ingredient
        model.setCurrentIngredient(""); // Clear the current ingredient input
        model.clearSuggestions(); // Clear suggestions after selection
    };

    const handleRemoveIngredient = (ingredientToRemove) => {
        const updatedIngredients = model.searchIngredients.filter(
            ingredient => ingredient !== ingredientToRemove
        );
        
        model.setSearchIngredients(updatedIngredients);
    };

    const handleSearchDishes = () => {
        model.doIngredientSearch(); // Call the method to search dishes based on ingredients
    };

    const handleShowSidebar = () => {
        model.toggleIngredientSearch();
    };

    return (
        <IngredientSearchView
            ingredient={model.currentIngredient}
            suggestions={model.suggestions}
            ingredients={model.searchIngredients}
            onIngredientChange={handleIngredientChange}
            onSelectSuggestion={handleSelectSuggestion}
            onRemoveIngredient={handleRemoveIngredient}
            onClearSuggestions={model.clearSuggestions} // Pass the clearSuggestions method
            onSearchDishes={handleSearchDishes} // Pass the search dishes handler
            onShowSidebar={handleShowSidebar} // Pass the show sidebar handler
        />
    );
});

export { IngredientSearchPresenter };