import { userConstants, userReportConstants, alertConstants } from '_constants';
import { post, get } from '_services/api.service';

export const userQuarantineActions = {
    store,
};

function store (payload) {
    return async (dispatch) => {
        try {
            const { data } = await post(`user-quarantine`, payload);
            await dispatch({
                type: userConstants.ADD_USER_QUARANTINE,
                payload: data.quarantine,
            })
            return data;
        } catch (err) {
            throw err;
        }
    };
}