import React from "react"
import Button from '@material-ui/core/Button'
import { connect } from "react-redux"
import * as DrawerActions from "../actions/drawerActions"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardDrawer from "./CardDrawer";
import '../style/card-basic.css';


export class CardBasic extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			card: props.card,
			index: props.index
		}
		this.showDetailInDrawer = this.showDetailInDrawer.bind(this);
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			card: newProps.card,
			index: newProps.index
		});
	}

	showDetailInDrawer(){
		this.props.open(this.state.card);
	}
    

	render(){
		return(
			<div>
                <Card className="card">
                  <CardContent>
                    <Typography color="textSecondary">
                      {this.state.card == null ? "No Details" : this.state.card.coreData.state}
                    </Typography>
                    <Typography variant="headline" component="h2">
                      {this.state.card == null ? "No Details" : this.state.card.coreData.number}
                    </Typography>
                    <Typography color="textSecondary">
                      Application: {this.state.card == null ? "No Details" : this.state.card.coreData.application}
                    </Typography>
                    <Typography color="textSecondary">
                      Assignee: {this.state.card == null ? "No Details" : this.state.card.coreData.assignee}
                    </Typography>
                    <Typography component="p">
                      {this.state.card == null ? "No Details" : this.state.card.coreData.shortDescription}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={this.showDetailInDrawer} size="small">Learn More</Button>
                  </CardActions>
                </Card>
			</div>
			);
	}
}

const mapStateToProps = (store) => ({})

const mapDispatchToProps = (dispatch) => ({
	open : (card) => dispatch(DrawerActions.open(card))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardBasic)