import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

// const middleware = applyMiddleware(promise(), thunk, createLogger())


const store = createStore(
	reducer, 
	applyMiddleware(promise(), thunk));

window.store = store

export default store;
