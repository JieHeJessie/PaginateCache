import React from "react";
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import '../style/temporary-drawer.css';

export default class TemporaryDrawer extends React.Component {
    constructor(props){
		super(props);
		this.state = {
			right: false,
		}

		this.toggleDrawer = this.toggleDrawer.bind(this);
	}
    
    toggleDrawer = (side, open) => () => {
            this.setState({
              [side]: open,
            });
    }
    
	render(){
        
        const sideList = (
          <div>
            <h3>INCXXXXXX</h3>
            <List>
                <ListItem>
                  <ListItemText>Short Description: </ListItemText>
                  <ListItemText>This is a shor</ListItemText>
                </ListItem>
            </List>           
          </div>
        );
        
		return(
            <Grid item>                     
                <Typography onClick={this.toggleDrawer('right', true)} style={{ cursor: 'pointer' }}>LEARN MORE</Typography>
                <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('right', false)}
                            onKeyDown={this.toggleDrawer('right', false)}
                        >
                        {sideList}
                        </div>
                </Drawer>        
            </Grid>
        );
	}
}

