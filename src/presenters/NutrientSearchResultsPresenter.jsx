// NutrientSearchResultsPresenter.jsx

import { observer } from 'mobx-react-lite';
import { NutrientSearchResultsView } from '/src/views/NutrientSearchResultsView.jsx';

const NutrientSearchResultsPresenter = observer(function NutrientSearchResultsPresenter({ model }) {
    // Handle the promise state here
    const { nutrientSearchResultsPromiseState } = model;

    if (!nutrientSearchResultsPromiseState.promise) {
        return <span>No data</span>;
    }
    if (nutrientSearchResultsPromiseState.error) {
        return <span>Error: {String(nutrientSearchResultsPromiseState.error)}</span>;
    }
    if (!nutrientSearchResultsPromiseState.data) {
        return <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />;
    }

    // Named callback for handling dish selection
    function handleDishClickACB(dishId) {
        model.setCurrentDishId(dishId);
        window.location.hash = '#/details'; // Navigate to the details page
    }

    return (
        <NutrientSearchResultsView
            results={nutrientSearchResultsPromiseState.data}
            onDishClick={handleDishClickACB}
        />
    );
});

export { NutrientSearchResultsPresenter };
