import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/actions';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import VideoList from './components/VideoList/VideoList';
import PreviewDialog from './components/PreviewDialog/PreviewDialog';
import SettingsDialog from './components/SettingsDialog/SettingsDialog';
import LoadingBar from 'react-redux-loading-bar';
import IconSearch from 'material-ui-icons/Search';
import FolderOpen from 'material-ui-icons/FolderOpen'
import { InputAdornment } from 'material-ui/Input';
import { shell } from 'electron';
import electronConfig from 'electron-config';
import Tooltip from 'material-ui/Tooltip';

const config = new electronConfig();

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
        showSettingsDialog: false,
        searchTerm: ''
    };

    openPreviewDialog = (videoInfo) => {
        this.setState({
            showSettingsDialog: false
        });
    }

    closeSettingsDialog = () => {
        this.setState({
            showSettingsDialog: false
        });
    }

    openSettingsDialog = () => {
        this.setState({
            showSettingsDialog: true
        });
    }

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    }

    openFileExplorer = () => {
        shell.openItem(config.get('downloadPath'));
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <PreviewDialog show={this.props.preview.showPreview} />
                <SettingsDialog show={this.state.showSettingsDialog} handleClose={this.closeSettingsDialog.bind(this)} />

                <Grid container spacing={8}>
                    <Grid xs={10} item>
                        <LoadingBar />
                        <TextField style={{ paddingLeft: '25px', width: '500px' }}
                            placeholder="Search YouTube"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleSearchChange}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    this.props.onSearch(this.state.searchTerm);
                                    ev.preventDefault();
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconSearch />
                                    </InputAdornment>
                                ),
                            }}
                            autoFocus
                        />
                    </Grid>
                    <Grid xs={2} style={{ textAlign: 'right' }} item>
                        <Tooltip id="tooltip-icon" title="Open download directory">
                            <IconButton>
                                <FolderOpen onClick={this.openFileExplorer.bind(this)} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip id="tooltip-icon" title="Settings">
                            <IconButton>
                                <SettingsIcon onClick={this.openSettingsDialog.bind(this)} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid container spacing={8}>
                    <VideoList videos={this.props.searchResults} openPreviewDialog={this.openPreviewDialog.bind(this)} />
                </Grid>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        searchResults: state.search.searchResults,
        preview: state.search.preview
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (searchTerm) => dispatch(actionCreators.searchYoutube(searchTerm)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
