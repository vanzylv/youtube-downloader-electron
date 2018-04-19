import * as actionTypes from '../actions/actions';

const initialState = {
    searchResults: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SEARCH_YOUTUBE:
            return {
                ...state,
                searchResults : action.payload
            };
        default:
            return state;
    }

}

export default reducer;
