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
        model.toggleIngredient(suggestion); // Add the selected suggestion as an ingredient
        model.setCurrentIngredient(""); // Clear the current ingredient input
        model.clearSuggestions(); // Clear suggestions after selection
    };

    const handleShowSidebar = () => {
        model.toggleShowComplexSearch();
    };

    return (
        <IngredientSearchView
          ingredient={model.currentIngredient}
          suggestions={model.suggestions}
          includedIngredients={model.includedIngredients} // Pass included ingredients
          excludedIngredients={model.excludedIngredients} // Pass excluded ingredients
          onIngredientChange={handleIngredientChange}
          onSelectSuggestion={handleSelectSuggestion}
          onRemoveIngredient={(ingredient) => model.removeIngredient(ingredient)}
          onToggleIngredient={(ingredient) => model.toggleIngredient(ingredient)}
          onClearSuggestions={() => model.clearSuggestions()} 
          onClearCurrentIngredient={() => model.clearCurrentIngredient()} 
          onShowSidebar={handleShowSidebar} 
        />
      );
});

export { IngredientSearchPresenter };