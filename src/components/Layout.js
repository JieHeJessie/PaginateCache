import React from "react"
import CardGrid from "./CardGrid"
import Pagination from "./Pagination"

export default class Layout extends React.Component {
	render(){
		return(
			<div>
				<div className="grid-container">
					<CardGrid />
				</div>
				<div>
					<Pagination />
				</div>
			</div>
			);
	}

}