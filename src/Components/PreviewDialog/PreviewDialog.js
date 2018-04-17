import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import YouTube from 'react-youtube';
import Grid from 'material-ui/Grid';




function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PreviewDialog extends React.Component {

    render() {

        let videoPreview = null;

        return (

            <Dialog
                open={this.props.show}
                transition={Transition}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                autoscrollbodycontent="true"
                maxWidth='md'
                
            >

                <DialogTitle >
                    {this.props.videoInfo ? this.props.videoInfo.snippet.title : ''}
                </DialogTitle>
                <DialogContent>
                    <Grid  container spacing={8}>
                        <Grid style={{textAlign:'center'}} xs={12} item>

                            <YouTube
                                opts={{autoplay:0}}
                                videoId={this.props.videoInfo ? this.props.videoInfo.id.videoId : ''}                  // defaults -> null
                            />

                        </Grid>
                        <Grid xs={12} item>
                            <DialogContentText>
                                
                                    {this.props.videoInfo ? this.props.videoInfo.snippet.description : ''}
                                
                            </DialogContentText>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        close
                    </Button>
                    <Button onClick={this.props.handleClose} color="primary">
                        download
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}

export default PreviewDialog;