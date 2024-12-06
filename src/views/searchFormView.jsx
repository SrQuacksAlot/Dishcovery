export function SearchFormView(props) {
    function renderDishOptionCB(optionStr) {
        return (
            <option key={optionStr} value={optionStr}>
                {optionStr}
            </option>
        );
    }

    // textbox input event handler 
    // fire custom event for changing text with current value
    function handleTextChangeACB(event) {
        props.onTextInput(event.target.value);
    }

    // select dropdown event handler 
    // Fires a custom event for changing type to selected option
    function handleTypeChangeACB(event) {
        props.onTypeSelect(event.target.value);
    }

    // search button event handler
    // fire custom event for search action
    function handleSearchClickACB() {
        props.onSearchInitiate();
    }

    // summary button event handler
    function handleSummaryClickACB() {
        window.location.hash = "#/summary"; // Navigate to summary page
    }


    return (
        <div>
            {/* search box */}
            <input 
                value={props.text || ""}  // checks that the input displays text prop value or empty string if undefined
                onChange={handleTextChangeACB}  // wait for native onChange and fires the custom event
            />
            
            {/* dish types dropdown menu */}
            <select 
                value={props.type || ""}
                onChange={handleTypeChangeACB}
            >
                <option value="">Choose:</option>
                {props.dishTypeOptions.map(renderDishOptionCB)}
            </select>

            {/* search button */}
            <button onClick={handleSearchClickACB}>Search!</button>

            {/* summary button */}
            <button onClick={handleSummaryClickACB}>Summary</button>

        </div>
    );
}
