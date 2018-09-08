import React from "react"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button';
import * as PaginationActions from "../actions/paginationActions"

const PREDICT_NEXT = 3;
const PREDICT_BEFORE = 1;

export class Pagination extends React.Component {
	constructor(props){
		console.log(props)
		super(props);
		this.state = {
			cachePages: props.cachePages,
			currentPage: props.currentPage,
			lastPage: props.lastPage,
			totalPages : props.totalPages
		}

		this.fetchPredictPages = this.fetchPredictPages.bind(this);
		this.handleToPage = this.handleToPage.bind(this);
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			cachePages: newProps.cachePages,
			currentPage: newProps.currentPage,
			lastPage: newProps.lastPage,
			totalPages : newProps.totalPages
		});
		this.fetchPredictPages();
	}

	fetchPredictPages(){
		var predictPages = [];
		var increase = this.state.lastPage < this.state.currentPage ? 1 : -1;
		for (var i = 1; i <= PREDICT_NEXT; i++) {
			var predictPage = this.state.currentPage + i*increase;
			if(predictPage > 0 && predictPage <= this.state.totalPages){
				predictPages.push(predictPage);
			}
		}

		for (var d = 1; d <= PREDICT_BEFORE; d++) {
			var predictDesc = this.state.currentPage - d*increase;
			if(predictDesc > 0 && predictDesc <= this.state.totalPages){
				predictPages.push(predictDesc);
			}
		}

		PaginationActions.fetchPages(predictPages, this.status.cachePages);
	}

	handleToPage(page){
		console.log('Load Page' + this.state.currentPage);
		PaginationActions.loadPage(page, this.state.cachePages);
	}


	render(){
		if(!(this.state.currentPage in this.state.cachePages)){
			this.handleToPage(this.state.currentPage);
		}

		return(
			<div>
				<div>
					<Button disabled={this.state.currentPage <= 1} 
					onClick={() => this.handleToPage(this.state.currentPage - 1)}>
						Back
					</Button>
					<div className="page-indicator">
						Page: {this.state.currentPage} of {this.state.totalPages}
					</div>
					<Button disabled={this.state.currentPage >= this.state.totalPages} 
					onClick={() => this.handleToPage(this.state.currentPage + 1)}>
						Next
					</Button>
				</div>
			</div>
			);
	}
}

const mapStateToProps = (store) => ({
    cachePages : store.cache,
    currentPage : store.pagination.currentPage,
    lastPage: store.pagination.lastPage,
    totalPages : store.pagination.totalPages
    
})

export default connect(mapStateToProps)(Pagination)
