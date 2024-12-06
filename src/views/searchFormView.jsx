export function SearchFormView(props) {
    function renderDishOptionCB(optionStr) {
        return (
            <option key={optionStr} value={optionStr}>
                {optionStr}
            </option>
        );
    }

    function handleTextChangeACB(event) {
        props.onTextInput(event.target.value);
    }

    function handleTypeChangeACB(event) {
        props.onTypeSelect(event.target.value);
    }

    function handleSearchClickACB() {
        props.onSearchInitiate();
    }

    function handleSummaryClickACB() {
        window.location.hash = "#/summary";
    }

    return (
        <div className="modern-search-form">
            <header className="form-header">
                <h1 className="form-title">Dish Finder</h1>
            </header>

            <div className="form-body">
                <div className="form-group">
                    <label htmlFor="dish-search" className="form-label">Search</label>
                    <input 
                        id="dish-search"
                        className="form-input" 
                        placeholder="Type a dish name..." 
                        value={props.text || ""} 
                        onChange={handleTextChangeACB}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dish-type" className="form-label">Dish Type</label>
                    <select 
                        id="dish-type"
                        className="form-select" 
                        value={props.type || ""}
                        onChange={handleTypeChangeACB}
                    >
                        <option value="">Select a type</option>
                        {props.dishTypeOptions.map(renderDishOptionCB)}
                    </select>
                </div>

                <div className="form-actions">
                    <button 
                        className="btn btn-primary" 
                        onClick={handleSearchClickACB}
                    >
                        Search
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={handleSummaryClickACB}
                    >
                        Summary
                    </button>
                </div>
            </div>
        </div>
    );
}
