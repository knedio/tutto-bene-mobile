import { authConstants } from '_constants';

const initialState = {
    loggedUser: {},
}

export default auth = ( state = initialState , {type, payload} ) => {
    switch ( type ) {
        case authConstants.SET_LOGGED_USER:
            return {
                ...state,
                loggedUser: payload
            };
        default:
            return state;
    }
}