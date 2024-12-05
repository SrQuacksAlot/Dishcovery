// NutritionalSearchPresenter.jsx

import { observer } from 'mobx-react-lite';
import { NutritionalSearchView } from '/src/views/NutritionalSearchView.jsx';

const NutritionalSearchPresenter = observer(function NutritionalSearchPresenter({ model }) {
  const handleInputChange = (name, value) => {
    // Update the nutrient search parameters in the model
    const newParams = { ...model.nutrientSearchParams };
    if (value === '') {
      delete newParams[name]; // Remove the parameter if the input is empty
    } else {
      newParams[name] = parseInt(value, 10);
    }
    model.setNutrientSearchParams(newParams);
  };

  const handleSearch = () => {
    model.doNutrientSearch();
    window.location.hash = '#/nutrient-search-results'; // Navigate to results
  };

  return (
    <NutritionalSearchView
      nutrientParams={model.nutrientSearchParams}
      onInputChange={handleInputChange}
      onSearch={handleSearch}
    />
  );
});

export { NutritionalSearchPresenter };
