import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import VideoCard from './VideoCard';


const styles = theme => ({
  nothing: {
    padding: "0px",
  },
});


class VideoGrid extends React.Component {
  render() {
    const { classes } = this.props;

    const videoData = [
      {
        "title": "Bricks",
        "description": "Lorem ipsum",
        "username": "Milkshak3s",
        "imageloc": "https://i.ytimg.com/vi/5Umge0eM1Hw/maxresdefault.jpg",
        "videoloc": "",
      },
      {
        "title": "Bricks 2",
        "description": "Lorem ipsum",
        "username": "Timmy",
        "imageloc": "",
        "videoloc": "",
      },
      {
        "title": "Bricks 3: Return of Bricks",
        "description": "Lorem ipsum",
        "username": "Milkshak3s",
        "imageloc": "https://i.ytimg.com/vi/5Umge0eM1Hw/maxresdefault.jpg",
        "videoloc": "",
      },
      {
        "title": "Bricks 4: THE BIG BRICKS OF THE WEST",
        "description": "Lorem ipsum",
        "username": "Knif3",
        "imageloc": "https://i.ytimg.com/vi/5Umge0eM1Hw/maxresdefault.jpg",
        "videoloc": "",
      },
      {
        "title": "Most Bricks (tm)",
        "description": "Lorem ipsum",
        "username": "Milkshak3s",
        "imageloc": "https://i.ytimg.com/vi/5Umge0eM1Hw/maxresdefault.jpg",
        "videoloc": "",
      },
      {
        "title": "BRICK CITY",
        "description": "Lorem ipsum",
        "username": "Milkshak3s",
        "imageloc": "https://i.ytimg.com/vi/5Umge0eM1Hw/maxresdefault.jpg",
        "videoloc": "",
      },
    ]

    return (
      <React.Fragment>
        <Grid container justify="space-between" spacing={4}>
          {videoData.map((video, index) =>{
            console.log(video)
            const { username, title, description, imageloc } = video;
            
            return (
              <Grid item zeroMinWidth>
                <VideoCard
                  username={username}
                  image={imageloc}
                  title={title}
                  description={description}
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