import { userConstants } from '_constants';

const initialState = {
    user: {},
    users: [],
}

export default user = ( state = initialState , {type, payload} ) => {
    switch ( type ) {
        case userConstants.SET_USER:
            return {
                ...state,
                user: payload
            };
        case userConstants.SET_USERS:
            return {
                ...state,
                users: payload
            };
        case userConstants.ADD_USER_REPORT:
            return {
                ...state,
                user: {
                    ...state.user,
                    reports: [
                        ...state.user.reports,
                        payload
                    ]
                }
            };
        case userConstants.ADD_USER_QUARANTINE:
            return {
                ...state,
                user: {
                    ...state.user,
                    quarantine: payload
                }
            };
        case userConstants.ADD_USER_POSITIVE:
            return {
                ...state,
                user: {
                    ...state.user,
                    positive: payload
                }
            };
        case userConstants.GET_USER:
            return user;
        default:
            return state;
    }
}