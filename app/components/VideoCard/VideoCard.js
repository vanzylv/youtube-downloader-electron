import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import PlayIcon from '@material-ui/icons/PlayArrow';
import { formatDate, trunc, lower } from '../../utils/utils';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import styles from './VideoCardStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {CardActions, CardContent, CardHeader, CardMedia} from '@material-ui/core';

class VideoCard extends React.Component {

  render() {
    const { classes } = this.props;

    let downloadButton, downloadProgress;

    let videoDownloadProgressItem = this.props.videoDownloadProgress.find(x => x.videoId == this.props.videoInfo.id);

    if (videoDownloadProgressItem != null && videoDownloadProgressItem.percentage != 100) {

      downloadProgress = <div style={{ flexGrow: 1 }}>
        <LinearProgress color="secondary" variant="determinate" value={parseInt(videoDownloadProgressItem.percentage)} />
      </div>;

      downloadButton =
        <Button size="small" disabled className={classes.button} variant="flat" color="primary">
          {videoDownloadProgressItem.percentage} %
        </Button>;

    } else if (this.props.videosCurrentlyDownloading.indexOf(this.props.videoInfo.id) !== -1) {

      downloadProgress = <div style={{ flexGrow: 1 }}><LinearProgress color="secondary" variant="indeterminate" value={100} /></div>;

      downloadButton =
        <Button size="small" disabled className={classes.button} variant="flat" color="primary">
          initializing...
        </Button>;

    } else if (this.props.videosDownloaded.indexOf(this.props.videoInfo.id) !== -1) {
      downloadButton =
        <Button size="small" disabled className={classes.button} variant="flat" color="primary">
          downloaded&nbsp;
        </Button>;

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
            <Button onClick={() => this.props.previewVideo(this.props.videoInfo)} size="small" className={classes.button} variant="flat"
              style={{ top: 140, left: 284, color: 'white', borderColor: 'white', backgroundColor: 'red', opacity: 0.9 }}>
              <PlayIcon className={classes.rightIcon} />
            </Button>
          </CardMedia>
          <CardContent className={classes.descriptionBlock}>
            <Typography component="p">
              {trunc(170, this.props.videoInfo.description)}
            </Typography>
          </CardContent>
          <CardActions stye={{ backgroundColor: 'red', height: 20 }} className={classes.actions} >
            {downloadButton}
            {downloadProgress}
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
    previewVideo: (videoInfo) => dispatch(actionCreators.previewVideo(videoInfo))
  };
};

const mapStateToProps = state => {
  return {
    videosCurrentlyDownloading: state.search.videosCurrentlyDownloading,
    videosDownloaded: state.search.videosDownloaded,
    videoDownloadProgress: state.search.videoDownloadProgress
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VideoCard));

