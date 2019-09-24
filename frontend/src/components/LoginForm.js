import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


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
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment> 
        <Container maxWidth="sm">
          <Paper className={classes.mainPaper}>
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
                <Button variant="contained" color="primary">
                  LOGIN
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(LoginForm);