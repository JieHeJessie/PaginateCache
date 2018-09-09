import React from "react"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button';
import * as PageActions from "../actions/pageActions"
import Grid from '@material-ui/core/Grid';

const PREDICT_NEXT = 3;
const PREDICT_BEFORE = 1;

export class Pagination extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			cachePages: props.cachePages,
			currentPage: props.currentPage,
			lastPage: props.lastPage,
			totalPages : props.totalPages
		}

		this.fetchPredictPages = this.fetchPredictPages.bind(this);
		this.loadPage = this.loadPage.bind(this);
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			cachePages: newProps.cachePages,
			currentPage: newProps.currentPage,
			lastPage: newProps.lastPage,
			totalPages : newProps.totalPages
		});		
	}

	componentDidUpdate(prevProps, prevState){
		if (this.state.currentPage != prevState.currentPage || 
			this.state.totalPages != prevState.totalPages) {
			this.fetchPredictPages()
		}
	}

	fetchPredictPages(){
		var increase = this.state.lastPage < this.state.currentPage ? 1 : -1;
		for (var i = 1; i <= PREDICT_NEXT; i++) {
			var predictPage = this.state.currentPage + i*increase;
			if(predictPage > 0 && predictPage <= this.state.totalPages){
				this.props.fetchPage(predictPage, this.state.cachePages)
			}
		}

		for (var d = 1; d <= PREDICT_BEFORE; d++) {
			var predictDesc = this.state.currentPage - d*increase;
			if(predictDesc > 0 && predictDesc <= this.state.totalPages){
				this.props.fetchPage(predictDesc, this.state.cachePages)
			}
		}
	}

	loadPage(page){
		this.props.loadPage(page, this.state.cachePages);
	}


	render(){
		if(!(this.state.currentPage in this.state.cachePages)){
			this.loadPage(this.state.currentPage);
		}

		return(
			<div>				
                <Grid container justify="center" spacing={40}>
                    <Grid item>
                        <Button disabled={this.state.currentPage <= 1} 
                        onClick={() => this.loadPage(this.state.currentPage - 1)}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <div className="page-indicator">Page: {this.state.currentPage} of {this.state.totalPages}</div>
                    </Grid>
                    <Grid item>
                        <Button disabled={this.state.currentPage >= this.state.totalPages} 
                        onClick={() => this.loadPage(this.state.currentPage + 1)}>
                            Next
                        </Button>
                    </Grid>
                </Grid>
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

const mapDispatchToProps = (dispatch) => ({
	loadPage : (page, cachePages) => dispatch(PageActions.loadPage(page, cachePages)),
	fetchPage : (page, cachePages) => dispatch(PageActions.fetchPage(page, cachePages))
})



export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
