import {sortIngredients} from "/src/utils/utilities.js";
import "/src/styles/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props) {
  function ingredientTableRowCB(ingr) {
    return (
      <tr key={ingr.id}> 
        <td>{ingr.name}</td>
        <td>{ingr.aisle}</td>
        <td className="summary-table-quantity">{(ingr.amount * props.servingsMultiplier).toFixed(1)}</td> 
        <td>{ingr.unit}</td> 
      </tr>
    );
  }
 
  function handleBackToSearchClick() {
    window.location.hash = "#/search"; 
  }
 
  return (
    <div className="summary-container">
      <button 
        className="summary-back-button" 
        onClick={handleBackToSearchClick}
      >
        ← Back to Search
      </button>

      <table className="summary-table">
        <caption className="summary-table-caption">
          Shopping list with servings multiplier of <span className="summary-table-caption-guests" title="nr guests">{props.servingsMultiplier}</span>:
        </caption>
        <thead className="summary-table-header">
          <tr>
            <th>Name</th>
            <th>Aisle</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody className="summary-table-body">
          {sortIngredients(props.ingredients).map(ingredientTableRowCB)}
        </tbody>
      </table>
    </div>
  );
}