import React, { Component } from 'react';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography'

const electronApp = window.require('electron').remote;
const electronConfig = window.require('electron-config');
const config = new electronConfig();

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SettingsDialog extends Component {

    state = {
      downloadPath : config.get('downloadPath') || electronApp.app.getPath('videos')
    };

    saveDialogSettings = () => {
        config.set('downloadPath', this.state.downloadPath);
        this.props.handleClose();
    };

    handleChange = (e) => {
        this.setState({downloadPath : e.target.value});

    };

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
                        fullWidth
                    />
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