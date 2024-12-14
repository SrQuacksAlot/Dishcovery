import { observer } from 'mobx-react-lite';
import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { Sidebar } from "/src/presenters/sidebarPresenter.jsx"; 
import { Details } from "/src/presenters/detailsPresenter.jsx"; 
import { Search }  from "/src/presenters/searchPresenter.jsx";
import { IngredientSearchPresenter }  from "/src/presenters/IngredientSearchPresenter.jsx";
import { NutritionalSearchPresenter } from '/src/presenters/NutritionalSearchPresenter.jsx';
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
    <>
      <div className="flexParent">
        <div className="sidebar">
          {props.model.showComplexSearch ? (
            <div>
              <IngredientSearchPresenter model={props.model} />
              <NutritionalSearchPresenter model={props.model} />
            </div>
          ) : (
            <Sidebar model={props.model} />
          )}
        </div>
        <div className="mainContent">
          <RouterProvider router={makeRouter(props.model)} />
        </div>
      </div>
  
      {/* Render modal outside of flexParent */}
      {props.model.isDishDetailsModalOpen && (
        <>
          <div className="dimmed-background" />
          <Details
            model={props.model}
            isModal={true}
            onCancel={() => props.model.onCancel()}
          />
        </>
      )}
    </>
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
    // {
    //   path: "/details",
    //   element: <Details model={model} />,
    // },

  ]);
}

export { ReactRoot, makeRouter };
