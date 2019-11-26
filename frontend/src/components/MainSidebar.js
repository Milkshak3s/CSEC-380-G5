import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Cookies from 'universal-cookie';

import LinkModal from './LinkModal';
import UploadModal from './UploadModal';
import PingModal from './PingModal';
import UsersDevModal from './UsersDevModal';
import UsersModal from './UsersModal';
import SSRFModal from './SSRFModal';

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
              <UploadModal />
            </Grid>
            <Grid item>
              <PingModal />
            </Grid>
            <Grid item>
              <UsersDevModal />
            </Grid>
            <Grid item>
              <UsersModal />
            </Grid>
            <Grid item>
              <SSRFModal />
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
