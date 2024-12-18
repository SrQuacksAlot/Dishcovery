import { observer } from "mobx-react-lite";
import { SearchFormView } from "/src/views/searchFormView.jsx";
import { SearchResultsView } from "/src/views/searchResultsView.jsx";
import { signInWithGoogle } from "/src/firebase/firebaseModel";
import { signOutOfApp } from "/src/firebase/firebaseModel.js";

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
    

    function SignIn(){
        if(!model.userIsSignedIn){
        signInWithGoogle(model).then(() => {
            // Handle successful sign-in
          }).catch((error) => {
            // Handle errors
          });
        }
    }

    function SignOut(){
        signOutOfApp().then(() => {
            // model.removeUsername();
            // Handle successful sign-out
          }).catch((error) => {
            // Handle errors
          });
    }

    return (
        <div>
            <SearchFormView
                dishTypeOptions={["starter", "main course", "dessert"]}
                text={model.searchParams.query || ""}
                type={model.searchParams.type || ""}
                username={model.username}
                isUserSignedInText = {model.userIsSignedIn}
                onTextInput={handleTextInputACB}
                onTypeSelect={handleTypeSelectACB}
                onSearchInitiate={handleSearchInitiateACB}
                onSignIn={SignIn}
                onSignOut={SignOut}
            />
            {renderSearchResultsCB()}
        </div>
    );
});

export { Search };
