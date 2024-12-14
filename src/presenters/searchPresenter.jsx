import { observer } from "mobx-react-lite";
import { SearchFormView } from "/src/views/searchFormView.jsx";
import { SearchResultsView } from "/src/views/searchResultsView.jsx";

const Search = observer(function SearchPresenter(props) {
    const { model } = props;

    // Conditional rendering helper for search results
    function renderSearchResultsCB() {
        if (!model.searchResultsPromiseState.promise) return <span>No data</span>;
        if (model.searchResultsPromiseState.error) return <span>Error: {String(model.searchResultsPromiseState.error)}</span>;
        if (!model.searchResultsPromiseState.data) return <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />;

        return (
            <SearchResultsView
                searchResults={model.searchResultsPromiseState.data || []}
                onDishSelect={handleDishSelectACB}
            />
        );
    }

    // Callback for selecting a dish from search results
    function handleDishSelectACB(dish) {
        model.setCurrentDishId(dish.id);
    }

    // Named callbacks for SearchFormView events
    function handleTextInputACB(text) {
        model.setSearchQuery(text);
    }

    function handleTypeSelectACB(type) {
        model.setSearchType(type);
    }

    function handleSearchInitiateACB() {
        model.doSearch();
    }

    return (
        <div>
            <SearchFormView
                dishTypeOptions={["starter", "main course", "dessert"]}
                text={model.searchParams.query || ""}
                type={model.searchParams.type || ""}
                onTextInput={handleTextInputACB}
                onTypeSelect={handleTypeSelectACB}
                onSearchInitiate={handleSearchInitiateACB}
            />
            {renderSearchResultsCB()}
        </div>
    );
});

export { Search };
