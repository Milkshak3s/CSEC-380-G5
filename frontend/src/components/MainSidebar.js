import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Cookies from 'universal-cookie';

import LinkModal from './LinkModal';


const styles = theme => ({
  nothing: {
    padding: "0px",
  },
})


class MainSidebar extends React.Component {
  clearCookies = () => {
    const cookies = new Cookies();
    cookies.remove('brickTubeApp');
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    const { username } = this.props;

    return (
      <React.Fragment>
        <Grid item container alignItems="center">
          <Grid item container 
            spacing={2} 
            direction="column" 
            alignItems="center" 
            className={classes.sidebarTopItems}
          >
            <Grid item>
              <Typography variant="h4">
                {username}
              </Typography>
            </Grid>
            <Grid item>
              <LinkModal />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">Upload</Button>
            </Grid>
          </Grid>
          <Grid item container justify="center">
            <Grid item>
              <Button variant="contained" color="secondary" onClick={this.clearCookies}>LOG OUT</Button>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(MainSidebar);