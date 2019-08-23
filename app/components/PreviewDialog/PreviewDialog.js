import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import YouTube from 'react-youtube';
import Grid from '@material-ui/core/Grid';
import {DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@material-ui/core';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PreviewDialog extends React.Component {

    youtubePlayer = null;

    handleDownloadAndClose = (videoInfo) => {
      this.props.downloadVideo(videoInfo);
      this.props.closePreviewDialog();
    }

    render() {
      if (this.props.videoInfo == null) return null;

      return (
        <Dialog style={{minHeight:500}}
          open={this.props.show}
          transition={Transition}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          autoscrollbodycontent="true"
          maxWidth='md'
              
        >
          <DialogTitle >
            {this.props.videoInfo.title}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={8}>
              <Grid style={{ textAlign: 'center' }} xs={12} item>
                <YouTube videoId={this.props.videoInfo.id}/>
              </Grid>
              <Grid xs={12} item>
                <DialogContentText>
                  {this.props.videoInfo.description}
                </DialogContentText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.closePreviewDialog()} color="primary">
                        close
            </Button>
            <Button onClick={() => this.handleDownloadAndClose(this.props.videoInfo)} color="primary">
                        download
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadVideo: (videoId) => dispatch(actionCreators.downloadVideo(videoId)),
    closePreviewDialog: () => dispatch(actionCreators.closePreviewDialog())
  };
};

const mapStateToProps = state => {
  return {
    videoInfo: state.search.preview.previewVideoInfo
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewDialog);
