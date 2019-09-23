import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import LoginForm from '../components/LoginForm';


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
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  modularPaper: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#f5f5f5",
  },
  toolbar: theme.mixins.toolbar,
})


class AppLogin extends React.Component {
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
          <div className={classes.toolbar} />
          <LoginForm username="chris" />
        </main>
      </div>
    );
  }
}


export default withStyles(styles)(AppLogin);