import "/src/utils/teacherFetch.js"; // protection against fetch() in infinite re-render
import { createElement} from "react";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
import { connectToFirebase } from "/src/firebase/firebaseModel.js";


window.React= {createElement:createElement}; // needed in the lab because it works with both React and Vue

import { observable, configure, reaction } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions


// (1) ------------ retrieve the application state (model) ----------
import { model } from '/src/models/DinnerModel.js';

const reactiveModel= observable(model); 

reactiveModel.doSearch({});
// (2) ----------  display (mount) the root component in the browser page. Pass the reactive model as prop ---------

// mount the app in the page DIV with the id "root":
createRoot(document.getElementById("root")).render(<ReactRoot model={reactiveModel} />);

// making the model available at the console
window.myModel= reactiveModel;
// making some example dishes available at the console:
function watchFunction(trackerACB, effectACB) {reaction(trackerACB, effectACB);}
connectToFirebase(reactiveModel, watchFunction);




