import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import API from '../API';
import Cookies from 'universal-cookie';


const styles = theme => ({
  mainPaper: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#f5f5f5",
  },
  mainGrid: {
    flexGrow: 1,
  },
})


class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    const data = {"username": "admin", "password": "ilovebricks"};
    const { username } = data;
    const { password } = data;

    try {
      const cookies = new Cookies();
      let tokenResponse = API.post('/auth', {"username": username, "password": password}).then(data => cookies.set('brickTubeApp', data.data.token));
    } catch(e) {
      console.log("Error contacting auth endpoint", e)
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment> 
        <Container maxWidth="sm">
          <Paper className={classes.mainPaper}>
            <form onSubmit={this.handleSubmit}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid
                    container
                    item
                    direction="row"
                >
                  <TextField
                    id="username-input"
                    fullWidth
                    label="Username"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                    container
                    item
                    direction="row"
                >
                  <TextField
                    id="password-input"
                    fullWidth
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                    container
                    item
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                  <Button variant="contained" color="primary" type="submit">
                    LOGIN
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(LoginForm);