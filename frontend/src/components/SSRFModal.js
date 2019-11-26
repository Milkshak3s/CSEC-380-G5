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



class SSRFModal extends React.Component
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
        ssrf: '',
        open: false,
        sending: false
      }
      this.onChange = this.onChange.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.onKeyPress.bind(this);
    }

    handleSubmit = event => {
      const { ssrf } = this.state;

      var bodyFormData = new FormData();
      bodyFormData.set('ssrf', ssrf)

      this.setState({sending: true})
      API.post('/ssrf', bodyFormData).then(data => {
        var ssrf_result = data.data.result
        // console.log(data.data); // works
        console.log(ssrf_result);
        alert("SSRF Result: " + ssrf_result);
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
                Send Web Request
              </Button>
            </div>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Send Web Request to host</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter a host to send a web request
                </DialogContentText>
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="ssrf"
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
                  Send Web Request
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
  }


export default withStyles(styles)(SSRFModal);
