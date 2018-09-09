import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TemporaryDrawer from './TemporaryDrawer';


export default class Card extends React.Component {
    
    constructor(props){
		super(props);
		this.state = {
			
		}
	}
    
	render(){
        
		return(
           <Grid item xs={6} sm={3}>
              <Paper>
                  <Grid item xs={12} sm container>
                      <Grid className="card" item xs container direction="column" spacing={16}>
                        <Grid item xs>
                            <Typography color="textSecondary">New</Typography>
                            <Typography gutterBottom variant="subheading">INCXXXXXXX</Typography>
                            <Typography color="textSecondary">Appllication: System</Typography>
                            <Typography color="textSecondary">Assignee: sing.le</Typography>
                            <Typography gutterBottom variant="subheading">This is an exampleof a long</Typography>
                        </Grid>
                        <TemporaryDrawer/>
                      </Grid>
                  </Grid>
              </Paper>                    
            </Grid>
        );
	}
}