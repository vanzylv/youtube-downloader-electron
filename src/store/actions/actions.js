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
export const VIDEO_DOWNLOADING = 'VIDEO_DOWNLOADING';
export const VIDEO_DOWNLOAD_COMPLETE = 'VIDEO_DOWNLOAD_COMPLETE';

export const videoDownloading = (videoId) => {
    return {
        type: VIDEO_DOWNLOADING,
        videoId: videoId
    }
}

export const videoDownloadComplete = (videoId) => {
    return {
        type: VIDEO_DOWNLOAD_COMPLETE,
        videoId: videoId
    }
}

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
            console.log('search results',results);
            dispatch(searchResults(results));
        }).catch(err => {
            if (err) return console.log(err, '<<<');
        });
    }
};

export const downloadVideo = (videoInfo) => {
    return dispatch => {


        dispatch(videoDownloadComplete(videoInfo.id));

        //dispatch(showLoading())

        //let video = ytdl(videoInfo.link);
        //video.pipe(fs.createWriteStream(electronApp.app.getPath('videos') + '/' + videoInfo.title + '.mp4'));

        // video.on('error', (error) => {
        //     console.log(error);
        // });

        // video.on('end', () => {
        //     //dispatch(hideLoading())
        // });
    }
};