import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';    
import { withStyles } from '@material-ui/styles';
import API from '../API';

const styles = theme => ({
  nothing: {
    color: "black",
  }, 
  CreateMemberButton: {
    display: 'flex',
    flex: 1,
    marginLeft: 'auto',
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
})



class UsersDevModal extends React.Component
{

    handleOpen = () => {
      this.setState({open: true});

    };

    handleClose = () => {
      this.setState({open: false});

    };
    onChange=(e)=> {
      this.setState({ [e.target.id]: e.target.value});
    }

    constructor(props) {
      super(props);
      this.state = {
        sqli: '',
        open: false,
        sending: false
      }
      this.onChange = this.onChange.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.onKeyPress.bind(this);
    }

    handleSubmit = event => {
      const { sqli } = this.state;

      var bodyFormData = new FormData();
      bodyFormData.set('sqli', sqli)

      this.setState({sending: true})
      API.post('/sqlinjection', bodyFormData).then(data => {
        var users_result = data.data.result
        console.log(users_result);
        alert("Users result: " + users_result);
        this.setState({open: false});
        window.location.reload(); 
        this.setState({sending: false})
      });
    }

    onKeyPress = event => {
      if (event.key === "Enter") {
        if(this.state.name !== "" && this.state.email !== "" && this.state.phone !== "" && this.state.role !== "" && this.state.team !== "") {
          this.handleSubmit();
        }
      }
    }


    render() {
         
        //const { classes } = this.props;
      
        return (
          <div>
            <div style={this.state.CreateMemberButton}>
              <Button variant="outlined" color="primary" onClick={this.handleOpen}>
                Search users (devs only!)
              </Button>
            </div>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Search user (developer test version)</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter a username to query (debug msgs enabled)
                </DialogContentText>
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="sqli"
                    label="Username"
                    type="text"
                    onChange={this.onChange}
                    fullWidth
                    
                />
                
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                  Search users
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
  }


export default withStyles(styles)(UsersDevModal);
