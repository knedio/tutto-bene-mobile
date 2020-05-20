import { alertConstants } from '_constants';

export const alertActions = {
    setScreenLoading,
};

function setScreenLoading (payload) {
    return async (dispatch) => {
        try {
            dispatch({
                type: alertConstants.SET_SCREEN_LOADING,
                payload,
            });
            return payload;
        } catch (err) {
            throw err;
        }
    };
}