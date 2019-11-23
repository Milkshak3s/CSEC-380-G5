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



class PingModal extends React.Component
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
        cmd: '',
        open: false,
        sending: false
      }
      this.onChange = this.onChange.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.onKeyPress.bind(this);
    }

    handleSubmit = event => {
      const { cmd } = this.state;

      var bodyFormData = new FormData();
      bodyFormData.set('cmd', cmd)

      this.setState({sending: true})
      API.post('/cmdinjection', bodyFormData).then(data => {
        var ping_result = data.data.result
        // console.log(data.data); // works
        console.log(ping_result);
        alert("Ping result: " + ping_result);
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
                Ping host
              </Button>
            </div>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Ping host</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter a host to ping
                </DialogContentText>
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="cmd"
                    label="Host"
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
                  Ping the host
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
  }


export default withStyles(styles)(PingModal);
