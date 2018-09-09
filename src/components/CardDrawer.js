import React from "react"
import Button from '@material-ui/core/Button'
import { connect } from "react-redux"
import * as DrawerActions from "../actions/drawerActions"
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';


export class CardDrawer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			card: props.card,
			open: props.open
		}
		this.ticketDetails = this.ticketDetails.bind(this)
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			card: newProps.card,
			open: newProps.open
		});
	}
    
	ticketDetails(){
		if (Object.keys(this.state.card).length === 0) {
			return (<div></div>)
		}else{
            
			var coreData = this.state.card.coreData;
            var serviceData = this.state.card.serviceData;
            
			return (
				<div>					
                    <Drawer anchor="right" open={this.state.open} onClose={() => this.props.close()}>
                          <div tabIndex={0} role="button" onClick={() => this.props.close()} onKeyDown={() => this.props.close()}>
                              <List component="nav">
                                <ListItem>{coreData.number ? coreData.number : "No details"}</ListItem>
                                <ListItem>
                                    <ListItemText>Assigned to</ListItemText>
                                    <ListItemText>
                                        {coreData.assignee ? coreData.assignee : "No details"}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>Short description</ListItemText>
                                    <ListItemText>
                                        {coreData.shortDescription ? coreData.shortDescription : "No details"}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>Application</ListItemText>
                                    <ListItemText>
                                        {coreData.application ? coreData.application : "No details"}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>made_sla</ListItemText>
                                    <ListItemText>
                                        {serviceData.made_sla ? serviceData.made_sla : "No details"}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>upon_reject</ListItemText>
                                    <ListItemText>
                                        {serviceData.upon_reject ? serviceData.upon_reject : "No details"}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>opened_by</ListItemText>
                                    <ListItemText>
                                        {serviceData.opened_by ? serviceData.opened_by : "No details"}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>priority</ListItemText>
                                    <ListItemText>
                                        {serviceData.priority ? serviceData.priority : "No details"}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>activity_due</ListItemText>
                                    <ListItemText>
                                        {serviceData.activity_due ? serviceData.activity_due : "No details"}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>approval</ListItemText>
                                    <ListItemText>
                                        {serviceData.approval ? serviceData.approval : "No details"}
                                    </ListItemText>
                                </ListItem>
                              </List>                          
                          </div>
                    </Drawer>
				</div>
				)
		}
	}

	render(){
		return(
			<div>
				{this.ticketDetails()}
			</div>
			);
	}
}

const mapStateToProps = (store) => ({
	card : store.drawer.card,
	open : store.drawer.open
})

const mapDispatchToProps = (dispatch) => ({
	close : () => dispatch(DrawerActions.close())
})

export default connect(mapStateToProps, mapDispatchToProps)(CardDrawer)