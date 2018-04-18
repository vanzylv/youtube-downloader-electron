import * as actionTypes from '../actions/actions';

const initialState = {
    searchResults: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SEARCH_YOUTUBE:
            return state;
        default:
            return state;
    }

}

export default reducer;
