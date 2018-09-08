import React from "react"

import Grid from "./Grid"
import Drawer from "./Drawer"
import Pagination from "./Pagination"

export default class Layout extends React.Component {
	render(){
		return(
			<div>
				<div className="grid-container">
					<Grid />
				</div>
				<div>
					<Drawer />
				</div>
				<div>
					<Pagination />
				</div>
			</div>
			);
	}

}