import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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
            <Typography variant="h6" align="center">
              BIG LOGIN CARD
            </Typography>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(LoginForm);