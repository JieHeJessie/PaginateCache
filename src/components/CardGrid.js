import React from "react";
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import { connect } from "react-redux"

import "../style/card-grid.css";

export class CardGrid extends React.Component {
    constructor(props){
		super(props);
		this.state = {
			cards: props.cards,
			fetching: props.fetching
		}
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			cards: newProps.cards,
			fetching: newProps.fetching
		});
	}	

	render(){
		return(
			<div>
              <Grid container spacing={24}>
                  <Card/>
              </Grid>              
            </div>
			);
	}
}

const mapStateToProps = (store) => ({
    cards : store.page.cards,
    fetching : store.page.fetching
})

const mapDispatchToProps = (dispatch) => ({})



export default connect(mapStateToProps, mapDispatchToProps)(CardGrid)