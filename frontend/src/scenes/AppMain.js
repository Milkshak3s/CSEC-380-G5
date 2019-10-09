import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
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
  modularPaper: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#f5f5f5",
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
          <Button onClick={this.clearCookies}>Clear cookie</Button>
          <VideoGrid />
        </main>
      </div>
    );
  }
}


export default withStyles(styles)(AppMain);