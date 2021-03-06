import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';

import MainSidebar from '../components/MainSidebar';
import VideoPlay from '../components/VideoPlay';
import API from '../API';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: 99,
  },
  title: {
    flexGrow: 1,
    paddingLeft: '40px',
    padding: '8px',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: "84px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  mainStage: {
    maxWidth: "80%",
  },
  sidebar: {
    maxHeight: "100%",
    minHeight: "700px",
    maxWidth: "15%",
    minWidth: "15%",
  },
  divider: {
    minHeight: "100%",
    maxWidth: "1%",
  },
  toolbar: theme.mixins.toolbar,
})


class AppPlay extends React.Component {
  constructor() {
    super();

    this.state = { video: {} }
  }

  componentDidMount() {
    const { videoID } = this.props.match.params
    console.log(videoID)

    API.get(`/videos/${videoID}`)
      .then(res => {
        const video = res.data;
        console.log(video);
        this.setState({ video });
      })
  };

  render() {
    const { classes } = this.props;
    const cookies = new Cookies();
    const username = cookies.get('brickTubeAppUser');

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              BrickTube
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Grid container direction="row" spacing={5}>
            <Grid item container className={classes.sidebar}>
              <MainSidebar username={username} />
            </Grid>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item container className={classes.mainStage}>
              <VideoPlay
                screenshot={ this.state.video.thumbnail_link }
                video_link={ this.state.video.video_link }
              />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}


export default withStyles(styles)(AppPlay);