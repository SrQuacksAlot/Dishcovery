import {sortIngredients} from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props){
    /* callback for Array Rendering in TW 1.3 */
    function ingredientTableRowCB(ingr){
      return (<tr key={ingr.id} > 
               <td>{ingr.name}</td>
               <td>{ingr.aisle}</td>
               <td className="quantity">{(ingr.amount * props.people).toFixed(2)}</td> 
               <td>{ingr.unit}</td> 
             </tr>
      );
    }
    /* Navigation back to search */
    function handleBackToSearchClick() {window.location.hash = "#/search"; }
   
  return (
            <div className="debug">
              {/* Back to Search Button */}
              <button className="back-to-search-button" onClick={handleBackToSearchClick}>Back to Search</button>

              <table>
              <caption>Summary for <span title="nr guests">{props.people}</span> persons:</caption>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>{sortIngredients(props.ingredients).map(ingredientTableRowCB)}</tbody>
              </table>
            </div>
          );
}

