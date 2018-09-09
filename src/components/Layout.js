import React from "react"

import CardsGrid from "./CardsGrid"
import CardDrawer from "./CardDrawer"
import Pagination from "./Pagination"

export default class Layout extends React.Component {
	render(){
		return(
			<div>
				<div className="grid-container">
					<CardsGrid />
				</div>

				<div>
					<Pagination />
				</div>
				<div>
					<CardDrawer />
				</div>
			</div>
			);
	}

}