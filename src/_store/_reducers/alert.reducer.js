import { alertConstants } from '_constants';

const initialState = {
    errorApiMessages: [],
    screenLoading: false
}

export default alert = ( state = initialState , {type, payload} ) => {
    switch ( type ) {
        case alertConstants.SET_ERROR_API_MESSAGE:
            return {
                ...state,
                errorApiMessages: payload
            };
        case alertConstants.SET_SCREEN_LOADING:
            return {
                ...state,
                screenLoading: payload
            };
        default:
            return state;
    }
}