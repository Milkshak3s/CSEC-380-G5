import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import Cookies from 'universal-cookie';

import VideoGrid from '../components/VideoGrid';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: 99,
  },
  title: {
    flexGrow: 1,
    paddingLeft: '40px',
    padding: '8px',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: "84px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  mainStage: {
    maxWidth: "80%",
  },
  sidebar: {
    minHeight: "100%",
    maxWidth: "15%",
    minWidth: "15%",
  },
  sidebarTopItems: {
    display: "flex",
  },
  divider: {
    minHeight: "100%",
    maxWidth: "1%",
  },
  toolbar: theme.mixins.toolbar,
})


class AppMain extends React.Component {
  clearCookies = () => {
    const cookies = new Cookies();
    cookies.remove('brickTubeApp');
    window.location.reload();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              BrickTube
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Grid container direction="row" spacing={5}>
            <Grid item container className={classes.sidebar}>
              <Grid item container alignItems="center">
                <Grid item container 
                  spacing={2} 
                  direction="column" 
                  justifyContent="center" 
                  alignItems="center" 
                  className={classes.sidebarTopItems}
                >
                  <Grid item>
                    <Typography variant="h4">
                      Milkshak3s
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary">Enter URL</Button>
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
            </Grid>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item container className={classes.mainStage}>
              <VideoGrid />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}


export default withStyles(styles)(AppMain);