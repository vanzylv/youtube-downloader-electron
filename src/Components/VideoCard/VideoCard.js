import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import DownloadIcon from 'material-ui-icons/FileDownload';
import PlayIcon from 'material-ui-icons/PlayArrow';
import { formatDate, trunc, lower } from '../../Utils/Utils';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import PreviewDialog from '../PreviewDialog/PreviewDialog';


const styles = theme => ({
  card: {
    maxWidth: 320,
  },
  cardHeader: {
    height: 80,
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  descriptionBlock: {
    height: 100
  },
  cardHeaderText: {
    color: 'white'
  },
  media: {
    height: 180,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

});

class VideoCard extends React.Component {
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            classes={{
              title: classes.cardHeaderText,
              subheader: classes.cardHeaderText
            }}
            className={classes.cardHeader}
            title={lower(trunc(45, this.props.videoInfo.snippet.title))}
            subheader={formatDate(new Date(this.props.videoInfo.snippet.publishedAt))}
          />
          <CardMedia
            className={classes.media}
            image={this.props.videoInfo.snippet.thumbnails.high.url}
            
          >
          <Button onClick={() => this.props.openPreviewDialog(this.props.videoInfo)} size="small" className={classes.button} variant="flat" 
                style={{top:140,left:255,color:'white',backgroundColor:'red', opacity:0.5}}
                
                >
                <PlayIcon className={classes.rightIcon} />
            </Button>
          </CardMedia>
          <CardContent className={classes.descriptionBlock}>
            <Typography component="p">
            {trunc(170,this.props.videoInfo.snippet.description)}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} >
          
            <Button size="small" className={classes.button} variant="flat" color="primary">
              download
              <DownloadIcon className={classes.rightIcon} />
            </Button>
            
          </CardActions>
         </Card>
      </div>
    );
  }
}

VideoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoCard);