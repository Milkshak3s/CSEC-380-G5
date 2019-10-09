import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';

import API from '../API';


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
    this.state = {
      username: '',
      password: '',
      bad_login: false,
      good_login: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    try {
      const cookies = new Cookies();
      const { username, password } = this.state;
      API.post('/auth', {"username": username, "password": password}).then(data => {
        const auth_token = data.data.token;
        const error_message = data.data.error;

        if (typeof error_message != "undefined") {
          if (error_message === "Invalid login") {
            this.setState({ bad_login: true })
          }
          console.log("Login error: ", error_message)
        }
        else if (typeof auth_token == "undefined") {
          console.log("Undefined token: ", auth_token)
        }
        else {
          console.log("Successful login w/ token: ", auth_token)
          cookies.set('brickTubeApp', auth_token);
          this.setState({bad_login: false, good_login: true})
        }
      }).then(data => {
        if(this.state.good_login === true) {
          window.location.reload();
        }
      });
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
            {this.state.bad_login ? <Chip label="Incorrect Login" color="secondary" className={classes.loginChip} /> : null}
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
                    name="username"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange}
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
                    name="password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange}
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