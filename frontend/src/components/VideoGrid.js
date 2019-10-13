import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import API from '../API';
import VideoCard from './VideoCard';


const styles = theme => ({
  nothing: {
    padding: "0px",
  },
});


class VideoGrid extends React.Component {
  constructor() {
    super();

    this.state = { videos: [] }
  }

  componentDidMount() {
    API.get(`/videos`)
      .then(res => {
        const videos = res.data;
        this.setState({ videos });
      })
  };

  render() {
    console.log('videos post', this.state.videos)

    return (
      <React.Fragment>
        <Grid container justify="space-between" spacing={4}>
          {this.state.videos.map((video, index) => {
            console.log(video)
            const { username, title, description, thumbnail_link } = video;
      
            return (
              <Grid item zeroMinWidth key={title + index}>
                <VideoCard
                  username={username}
                  image={thumbnail_link}
                  title={title}
                  description={description}
                  key={title + index + '1'}
                />
              </Grid>
            )
          })}
        </Grid>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(VideoGrid);