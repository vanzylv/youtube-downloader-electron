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

const electronApp = window.require('electron').remote.app;



function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SettingsDialog extends Component {

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
                        value={electronApp.getPath('videos')}
                        margin="normal"
                        fullWidth
                    />
                    <Typography>
                        <a href="https://github.com/vanzylv/youtube-dl-gui-v2">https://github.com/vanzylv/youtube-dl-gui-v2</a>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
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