import { userConstants, userReportConstants, alertConstants } from '_constants';
import { post, get } from '_services/api.service';

export const userReportActions = {
    store,
    getUser,
};

function store (payload) {
    return async (dispatch) => {
        try {
            const { data } = await post(`user-report`, payload);
            await dispatch({
                type: userConstants.ADD_USER_REPORT,
                payload: data.report,
            })
            return data;
        } catch (err) {
            throw err;
        }
    };
}

function getUser (payload) {
    return async (dispatch) => {
        try {
            const { data } = await get(`user/${payload}`, {});
            dispatch({
                type: userConstants.GET_USER_REPORT,
                payload: data.user,
            });
            return data.user;
        } catch (err) {
            throw err;
        }
    };
}