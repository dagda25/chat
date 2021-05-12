
import {createStore, applyMiddleware} from "redux";
import reducer from "./reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {redirect} from "../middlewares/redirect";


const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk),
        applyMiddleware(redirect)
    )
);

export default store;
