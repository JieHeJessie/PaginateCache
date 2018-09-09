import React from "react"
import { connect } from "react-redux"
import { debounce } from "throttle-debounce";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as PageActions from "../actions/pageActions"
import '../style/pagination.css'

const PREDICT_PAGE_NUM = 3;

export class Pagination extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			cachePages: props.cachePages,
			currentPage: props.currentPage,
			totalPages : props.totalPages,
			nextLoad: props.currentPage
		}

		this.fetchPredPage = this.fetchPredPage.bind(this);
		this.loadPageDebounce = debounce(500, this.loadPage.bind(this));
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			cachePages: newProps.cachePages,
			currentPage: newProps.currentPage,
			totalPages : newProps.totalPages
		});		
	}

	componentDidMount(){
		this.props.loadPage(this.state.currentPage, this.state.cachePages);
	}

	componentDidUpdate(_, prevState){
		if (this.state.currentPage !== prevState.currentPage || 
			this.state.totalPages !== prevState.totalPages) {
			this.fetchPredPage()
		}
	}

	fetchPredPage(){
		for (var i = 0; i <= PREDICT_PAGE_NUM*2; i++) {
			var predictPage = this.state.currentPage - PREDICT_PAGE_NUM + i;
			if(predictPage > 0 && 
				predictPage <= this.state.totalPages &&
				!(predictPage in this.state.cachePages)){
					this.props.fetchPredPage(predictPage, this.state.currentPage)
			}
		}
	}

	willLoadPage(page){
		page = page < 1 ? 1 : page;
		page = page > this.state.totalPages ? this.state.totalPages : page;
		this.setState({
			nextLoad: page
		})
		this.loadPageDebounce(page, this.state.cachePages);
	}

	loadPage(page){
		this.props.loadPage(page, this.state.cachePages);
	}


	render(){
		return(
			<div className="footer">				
                <Grid container justify="center" spacing={40}>
                    <Grid item>
                        <Button disabled={this.state.nextLoad <= 1} 
					onClick={() => this.willLoadPage(this.state.nextLoad - 1)}>
						Back
					</Button>
                    </Grid>
                    <Grid item>
                        <div className="page-indicator">Page: {this.state.nextLoad} of {this.state.totalPages}</div>
                    </Grid>
                    <Grid item>
                        <Button disabled={this.state.nextLoad >= this.state.totalPages} 
					onClick={() => this.willLoadPage(this.state.nextLoad + 1)}>
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
    totalPages : store.pagination.totalPages
})

const mapDispatchToProps = (dispatch) => ({
	loadPage : (page, cachePages) => dispatch(PageActions.loadPage(page, cachePages)),
	fetchPredPage : (page, current) => dispatch(PageActions.fetchPredPage(page, current)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
