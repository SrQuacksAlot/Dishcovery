// ReactRoot.jsx
import { observer } from 'mobx-react-lite';
import { Summary } from "./summaryPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx"; 
import { Details } from "./detailsPresenter.jsx"; 
import { Search }  from "./searchPresenter.jsx";
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
        <Sidebar model={props.model} />
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
  ]);
}

export { ReactRoot, makeRouter };

