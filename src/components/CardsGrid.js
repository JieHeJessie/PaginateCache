import React from "react"
import { connect } from "react-redux"
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardBasic from "./CardBasic"
import '../style/card-grid.css'


const divStyle = {
  color: 'blue',
};
export class CardsGrid extends React.Component {
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

	cardsGridLayout = () => {
        return(
            [0, 1, 2].map(i => (
            <Grid key={i} item xs={12}>
                <Grid container justify="center" spacing={16}>
                    {[0, 1, 2, 3].map(j => (
                        <Grid key={j} item>
                            <CardBasic card={this.state.cards[i * 4 + j]} index={i * 4 + j}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>)
        )
            
        )
		
	}

	render(){
        if(this.state.fetching){
           return(
               <div className="loading">
                   <CircularProgress size={50} />
                   <h1>Loading, please wait</h1>
               </div>
           )
               
        }
		return(
			<div className="cards">               
                {this.cardsGridLayout()}
			</div>
			);
	}
}

const mapStateToProps = (store) => ({
    cards : store.page.cards,
    fetching : store.page.fetching
})

const mapDispatchToProps = (dispatch) => ({})



export default connect(mapStateToProps, mapDispatchToProps)(CardsGrid)
