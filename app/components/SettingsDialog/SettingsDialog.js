import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FolderOpen from '@material-ui/icons/FolderOpen';
import fs from 'fs';
import electronApp from 'electron';
import {DialogActions, DialogContent, DialogTitle, IconButton, Slide} from '@material-ui/core';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SettingsDialog extends Component {

    state = {
      downloadPath: config.get('downloadPath'),
      error: null,
      errorText: null
    };

    saveDialogSettings = () => {

      try {
        if (fs.lstatSync(this.state.downloadPath).isDirectory()) {
          config.set('downloadPath', this.state.downloadPath);
          this.props.handleClose();
        }
      } catch (e) {
        this.setState({ error: true });
        console.error(`Invalid diretory : ${this.state.downloadPath}`);
      }


    };

    handleChange = (e) => {
      this.setState({ error: null });
      this.setState({ downloadPath: e.target.value });
    };

    openFolderSelectDialog = () => {

      electronApp.remote.dialog.showOpenDialog({ properties: ['openDirectory'] },
        (path) => {
          if (path == null) return;
          config.set('downloadPath', path[0]);
          this.setState({ downloadPath: path[0] });
        });
    }

    render() {

      return (
        <Dialog
          open={this.props.show}
          transition={Transition}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          autoscrollbodycontent="true"
          maxWidth='md'
          contentstyle={{ width: 400 }}
        >
          <DialogTitle >
                    Settings
          </DialogTitle>
          <DialogContent style={{ width: 400 }}>
            <TextField
              id="name"
              label="Save my videos here"
              value={this.state.downloadPath}
              onChange={this.handleChange}
              margin="normal"
              style={{ width: 300 }}
              error={this.state.error}
            />

                    
            <IconButton onClick={this.openFolderSelectDialog}>
              <FolderOpen  />
            </IconButton>
                    
            <Typography>
              <a href="https://github.com/vanzylv/youtube-downloader-electron">https://github.com/vanzylv/youtube-downloader-electron</a>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveDialogSettings} color="primary">
                        save
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
                        cancel
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
}

export default SettingsDialog;