import { observer } from 'mobx-react-lite';
import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { Sidebar } from "/src/presenters/sidebarPresenter.jsx"; 
import { Details } from "/src/presenters/detailsPresenter.jsx"; 
import { Search }  from "/src/presenters/searchPresenter.jsx";
import { IngredientSearchPresenter }  from "/src/presenters/IngredientSearchPresenter.jsx";
import { NutritionalSearchPresenter } from '/src/presenters/NutritionalSearchPresenter.jsx';
import { NutrientSearchResultsPresenter } from '/src/presenters/NutrientSearchResultsPresenter.jsx'; // We'll create this next
import { createHashRouter, RouterProvider } from "react-router-dom";

const ReactRoot = observer(function ReactRoot(props) {
  if (!props.model.ready) {
    return (
      <div className="loading">
        <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />
      </div>
    );
  }

  return (
    <div className="flexParent">
      <div className="sidebar">
      {console.log("Rendering sidebar: Ingredient Search?", props.model.showIngredientSearch)}
        {console.log("Rendering sidebar: Nutrient Search?", props.model.showNutrientSearch)}
        
        {props.model.showIngredientSearch ? (
          <IngredientSearchPresenter model={props.model} />
        ) : props.model.showNutrientSearch ? (
          <NutritionalSearchPresenter model={props.model} />
        ) : (
          <Sidebar model={props.model} />
        )}
      </div>
      <div className="mainContent">
        <RouterProvider router={makeRouter(props.model)} />
      </div>
    </div>
  );
});

function makeRouter(model) {
  return createHashRouter([
    {
      path: "/",
      element: <Search model={model} />,
    },
    {
      path: "/search",
      element: <Search model={model} />,
    },
    {
      path: "/summary",
      element: <Summary model={model} />,
    },
    {
      path: "/details",
      element: <Details model={model} />,
    },
    // {
    //   path: "/nutritional-search",
    //   element: <NutritionalSearchPresenter model={model} />,
    // },
    // {
    //   path: "/nutrient-search-results",
    //   element: <NutrientSearchResultsPresenter model={model} />,
    // },
  ]);
}

export { ReactRoot, makeRouter };
