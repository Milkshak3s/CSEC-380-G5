import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { CardMedia } from '@material-ui/core';


const styles = theme => ({
  card: {
    maxWidth: 345,
    minWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardActions: {
    flexDirection: "row-reverse",
  },
});


class VideoCard extends React.Component {
  render() {
    const { classes } = this.props;
    const { username, title, description, image } = this.props; 

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardHeader
            titleTypographyProps={{"noWrap": true}}
            avatar={
              <Avatar aria-label={username} className={classes.avatar}>
                {username.charAt(0)}
              </Avatar>
            }
            title={title}
            subheader={username}
          />
          <CardMedia
            className={classes.media}
            image={image}
            title={title}
          />
          <CardContent>
            <Typography noWrap variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
    )
  }
}


export default withStyles(styles)(VideoCard);