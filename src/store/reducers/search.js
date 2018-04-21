import * as actionTypes from '../actions/actions';

const initialState = {
    searchResults: [],
    videosCurrentlyDownloading: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SEARCH_YOUTUBE:{
            return {
                ...state,
                searchResults: action.payload
            };
        }
        case actionTypes.VIDEO_DOWNLOADING:{

            let currentDownloadingVideos = [...state.videosCurrentlyDownloading];
            currentDownloadingVideos.push(action.videoId);

            return {
                ...state,
                videosCurrentlyDownloading: currentDownloadingVideos
            };
        }
        case actionTypes.VIDEO_DOWNLOAD_COMPLETE:{

            let currentDownloadingVideos = [...state.videosCurrentlyDownloading];
            let index = currentDownloadingVideos.indexOf(action.videoId);
            currentDownloadingVideos.splice(index,1);
            
            return {
                ...state,
                videosCurrentlyDownloading: currentDownloadingVideos
            };
        }
        default:
            return state;
    }

}

export default reducer;
