import { userConstants, alertConstants } from '_constants';
import { post, get } from '_services/api.service';

export const userPositiveActions = {
    store,
};

function store (payload) {
    return async (dispatch) => {
        try {
            const { data } = await post(`user-positive`, payload);
            await dispatch({
                type: userConstants.ADD_USER_POSITIVE,
                payload: data.positive,
            })
            return data;
        } catch (err) {
            throw err;
        }
    };
}