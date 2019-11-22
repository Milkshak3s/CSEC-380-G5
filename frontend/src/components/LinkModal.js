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
import Cookies from 'universal-cookie';


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



class LinkModal extends React.Component
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
        title: '',
        description: '',
        link: '',
        open: false,
        sending: false
      }
      this.onChange = this.onChange.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.onKeyPress.bind(this);
    }

    handleSubmit = event => {
      const { title, description, link } = this.state;
      const cookies = new Cookies();
      const auth_token = cookies.get('brickTubeApp');

      var bodyFormData = new FormData();
      bodyFormData.set('title', title)
      bodyFormData.set('description', description)
      bodyFormData.set('video_link', link)
      bodyFormData.set('token', auth_token);

      this.setState({sending: true})
      API.post('/videos/upload', bodyFormData).then(data => {
        console.log(data.data);
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
                Enter URL
              </Button>
            </div>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter video information.
                </DialogContentText>
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    onChange={this.onChange}
                    fullWidth
                    
                />
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  onChange={this.onChange}
                  fullWidth
                />

                <TextField
                    margin = "dense"
                    id = "link"
                    label = "Video Link"
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
                  Add Video
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
  }


export default withStyles(styles)(LinkModal);