import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Layout from "./components/Layout"
import store from "./store"

// import 'bootstrap/dist/css/bootstrap.css'
// import './scss/style.css'

const app = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
  		<Layout />
	</Provider>, app);
