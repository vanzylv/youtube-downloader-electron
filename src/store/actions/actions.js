import search from 'youtube-search';
import {showLoading, hideLoading} from 'react-redux-loading-bar'

const electronApp = window.require('electron').remote;
const fs = electronApp.require('fs');
const ytdl = require('ytdl-core');


var opts = {
    maxResults: 50,
    key: 'AIzaSyBQ2ByTiY1JRYJYjl-yUPdPEFDw4J3bUbE',
    type: 'video'
};


export const SEARCH_YOUTUBE = 'SEARCH_YOUTUBE';
export const DOWNLOAD_VIDEO_COMPLETE = 'DOWNLOAD_VIDEO_COMPLETE';
export const DOWNLOAD_VIDEO_START = 'DOWNLOAD_VIDEO_START';


export const searchResults = (results) => {
    return {
        type: SEARCH_YOUTUBE,
        payload: results
    }
}

export const searchYoutube = (searchTerm) => {
    return dispatch => {
        dispatch(showLoading())
        search(searchTerm, opts).then(results => {
            dispatch(hideLoading())
            dispatch(searchResults(results));
        }).catch(err => {
            if (err) return console.log(err, '<<<');
        });
    }
};

export const downloadVideo = (videoInfo) => {
    return dispatch => {

        dispatch(showLoading())

        let video = ytdl(videoInfo.link);
        video.pipe(fs.createWriteStream(electronApp.app.getPath('videos') + '/' + videoInfo.title + '.mp4'));

        video.on('error', (error) => {
            console.log(error);
        });

        video.on('end', () => {
            dispatch(hideLoading())
        });
    }
};