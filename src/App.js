import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/actions';

import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import VideoList from './Components/VideoList/VideoList';
import PreviewDialog from './Components/PreviewDialog/PreviewDialog';
import SettingsDialog from './Components/SettingsDialog/SettingsDialog';
import Snackbar from 'material-ui/Snackbar';
import LoadingBar from 'react-redux-loading-bar';

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
        showSettingsDialog: false,
        searchTerm: ''
    };

    openPreviewDialog = (videoInfo) => {
        this.setState({
            showPreviewDialog: true,
            previewVideoInfo: videoInfo,
            showSettingsDialog: false
        });
    }

    closePreviewDialog = () => {
        this.setState({
            showPreviewDialog: false,
            previewVideoInfo: null,
            showSettingsDialog: false
        });

    }

    closeSettingsDialog = () => {
        this.setState({
            showPreviewDialog: false,
            previewVideoInfo: null,
            showSettingsDialog: false
        });
    }

    openSettingsDialog = () => {
        this.setState({
            showPreviewDialog: false,
            previewVideoInfo: null,
            showSettingsDialog: true
        });
    }

    handleSearchChange = (e) => {
        this.setState({searchTerm: e.target.value});
    }

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <PreviewDialog show={this.state.showPreviewDialog} handleClose={this.closePreviewDialog.bind(this)}
                               videoInfo={this.state.previewVideoInfo}/>
                <SettingsDialog show={this.state.showSettingsDialog} handleClose={this.closeSettingsDialog.bind(this)}/>

                <Grid container spacing={8}>
                    <Grid xs={10} item>
                        <LoadingBar/>
                        <TextField style={{paddingLeft: '25px', width: '500px'}}
                                   placeholder="Search YouTube"
                                   className={classes.textField}
                                   margin="normal"
                                   onChange={this.handleSearchChange}
                                   onKeyPress={(ev) => {
                                       console.log(`Pressed keyCode ${ev.key}`);
                                       if (ev.key === 'Enter') {
                                           this.props.onSearch(this.state.searchTerm);
                                           ev.preventDefault();
                                       }
                                   }}
                        />
                    </Grid>

                    <Grid xs={2} style={{textAlign: 'right'}} item>
                        <IconButton>
                            <SettingsIcon onClick={this.openSettingsDialog.bind(this)}/>
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid container spacing={8}>
                    <VideoList videos={this.props.searchResults} openPreviewDialog={this.openPreviewDialog.bind(this)}/>
                </Grid>

                {/*<Snackbar*/}
                    {/*anchorOrigin={{*/}
                        {/*vertical: 'bottom',*/}
                        {/*horizontal: 'left'*/}
                    {/*}}*/}
                    {/*open={true}*/}
                    {/*autoHideDuration={6000}*/}
                    {/*message="Download started"*/}
                {/*/>*/}
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        searchResults: state.search.searchResults
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (searchTerm) => dispatch(actionCreators.searchYoutube(searchTerm)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
