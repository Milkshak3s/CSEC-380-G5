import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import VideoPlayer from 'react-simple-video-player';


const styles = theme => ({
  videoContainer: {
    maxHeight: "500px",
    padding: "80px",
  },
});


class VideoPlay extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.videoContainer } >
        <VideoPlayer
          height={500}
          poster={ this.props.screenshot }
          url={ this.props.video_link }
        />
      </Paper>
    )
  }
}


export default withStyles(styles)(VideoPlay);