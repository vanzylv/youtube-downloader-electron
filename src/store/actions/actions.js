export const SEARCH_YOUTUBE = 'SEARCH_YOUTUBE';

export const searchResults = (searchTerm) => {
    return {
        type: SEARCH_YOUTUBE,
        searchTerm: searchTerm
    }
}

export const searchYoutube = ( res ) => {
    return dispatch => {

            dispatch(searchResults(res));

    }
};