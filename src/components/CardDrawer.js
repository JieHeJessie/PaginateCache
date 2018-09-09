import React from "react"
import { connect } from "react-redux"
import * as DrawerActions from "../actions/drawerActions"
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import '../style/card-drawer.css'


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
				<div >					
                    <Drawer anchor="right" open={this.state.open} onClose={() => this.props.close()}>
                          <div tabIndex={0} role="button" onClick={() => this.props.close()} onKeyDown={() => this.props.close()}>
                              <List className="drawer" component="nav">
                                <ListItem className="drawer-title">{coreData.number ? coreData.number : "No details"}</ListItem>
                                <ListItem>
                                    <ListItemText primary="Assigned to"/>
                                    <ListItemText primary={coreData.assignee ? coreData.assignee : "No details"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Short description"/>
                                    <ListItemText primary={coreData.shortDescription ? coreData.shortDescription : "No details"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Application"/>
                                    <ListItemText primary={coreData.application ? coreData.application : "No details"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="made_sla"/>
                                    <ListItemText primary={serviceData.made_sla ? serviceData.made_sla : "No details"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="upon_reject"/>
                                    <ListItemText primary={serviceData.upon_reject ? serviceData.upon_reject : "No details"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="opened_by"/>
                                    <ListItemText primary={serviceData.opened_by ? serviceData.opened_by : "No details"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="priority"/>
                                    <ListItemText primary={serviceData.priority ? serviceData.priority : "No details"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="activity_due"/>
                                    <ListItemText primary={serviceData.activity_due ? serviceData.activity_due : "No details"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="approval"/>
                                    <ListItemText primary={serviceData.approval ? serviceData.approval : "No details"}/>
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