import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import DownloadIcon from 'material-ui-icons/FileDownload';
import PlayIcon from 'material-ui-icons/PlayArrow';
import { formatDate, trunc, lower } from '../../Utils/Utils';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import styles from './VideoCardStyles';
import { CircularProgress } from 'material-ui/Progress';

class VideoCard extends React.Component {

  render() {
    const { classes } = this.props;

    let downloadButton;

    if (this.props.videosCurrentlyDownloading.indexOf(this.props.videoInfo.id) !== -1) {
      downloadButton =
       
      <CircularProgress
          size={25}
          thickness={7}
          color="secondary"
          variant="indeterminate"
          value={100}
        />

    } else {
      downloadButton =
        <Button onClick={() => this.props.downloadVideo(this.props.videoInfo)} size="small" className={classes.button} variant="flat" color="primary">
          download
          <DownloadIcon className={classes.rightIcon} />
        </Button>;
    }

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            classes={{
              title: classes.cardHeaderText,
              subheader: classes.cardHeaderText
            }}
            className={classes.cardHeader}
            title={lower(trunc(45, this.props.videoInfo.title))}
            subheader={formatDate(new Date(this.props.videoInfo.publishedAt))}
          />
          <CardMedia
            className={classes.media}
            image={this.props.videoInfo.thumbnails.high.url}
          >
            <Button onClick={() => this.props.openPreviewDialog(this.props.videoInfo)} size="small" className={classes.button} variant="flat"
              style={{ top: 140, left: 284, color: 'white',borderColor:'white', backgroundColor: 'red', opacity: 0.9 }}>
              <PlayIcon className={classes.rightIcon} />
            </Button>
          </CardMedia>
          <CardContent className={classes.descriptionBlock}>
            <Typography component="p">
              {trunc(170, this.props.videoInfo.description)}
            </Typography>
          </CardContent>
          <CardActions stye={{backgroundColor:'red', height:20}} className={classes.actions} >
            {downloadButton}
          </CardActions>
        </Card>
      </div>
    );
  }
}

VideoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = dispatch => {
  return {
    downloadVideo: (videoId) => dispatch(actionCreators.downloadVideo(videoId)),
  }
};

const mapStateToProps = state => {
  return {
    videosCurrentlyDownloading: state.search.videosCurrentlyDownloading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VideoCard));

