import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import InfoOutline from 'material-ui-icons/InfoOutline';
import VideoList from './Components/VideoList/VideoList';
import PreviewDialog from './Components/PreviewDialog/PreviewDialog';
import SettingsDialog from './Components/SettingsDialog/SettingsDialog';
import VideoIcon from 'material-ui-icons/OndemandVideo';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: theme.palette.primary.light
  }
});

class App extends Component {

  state = {
    showPreviewDialog: false,
    previewVideoInfo: null,
    showSettingsDialog: false
  };

  openPreviewDialog = (videoInfo) => {
    console.log('Preview Dialog Open', videoInfo)

    this.setState({
      showPreviewDialog: true,
      previewVideoInfo: videoInfo,
      showSettingsDialog: false
    });
  }

  closePreviewDialog = () => {

    console.log('Close preview dialog')
    this.setState({
      showPreviewDialog: false,
      previewVideoInfo: null,
      showSettingsDialog: false
    });

  }

  closeSettingsDialog = () => {
    console.log('Close settings dialog')
    this.setState({
      showPreviewDialog: false,
      previewVideoInfo: null,
      showSettingsDialog: false
    });
  }

  openSettingsDialog = () => {
    console.log('Open settings dialog')
    this.setState({
      showPreviewDialog: false,
      previewVideoInfo: null,
      showSettingsDialog: true
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PreviewDialog show={this.state.showPreviewDialog} handleClose={this.closePreviewDialog.bind(this)} videoInfo={this.state.previewVideoInfo} />
        <SettingsDialog show={this.state.showSettingsDialog} handleClose={this.closeSettingsDialog.bind(this)} />

        <Grid container spacing={8}>
          <Grid xs={10} item>
            <TextField style={{ paddingLeft: '25px', width: '500px' }}
              placeholder="Search YouTube"
              className={classes.textField}
              margin="normal"
            />
          </Grid>


          <Grid xs={2} style={{ textAlign: 'right' }} item>
            <IconButton >
              <SettingsIcon onClick={this.openSettingsDialog.bind(this)} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={8}>

          <VideoList openPreviewDialog={this.openPreviewDialog.bind(this)} />
        </Grid>



        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={true}
          autoHideDuration={6000}
          message="Download started"
        />

      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);