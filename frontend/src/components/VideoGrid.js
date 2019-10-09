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

    return (
      <React.Fragment>
        <Grid container justify="space-between" spacing={4}>
          <Grid item>
            <VideoCard
              username="Milkshak3s"
              image="https://i.ytimg.com/vi/5Umge0eM1Hw/maxresdefault.jpg"
              title="Bricks 2"
              description="Lorem ipsum this is a description for a single card. Witness me! Witness me! but really, how long can this be before there's a problem? Who knows. That's not our problem anymore."
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(VideoGrid);