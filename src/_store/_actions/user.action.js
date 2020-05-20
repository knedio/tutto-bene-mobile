import { userConstants, alertConstants } from '_constants';
import { post, get } from '_services/api.service';

export const userActions = {
    store,
    setUser,
    getUser,
    getAllUser,
    getBySerialNo,
};

function store (payload) {
    return async (dispatch) => {
        try {
            const { data } = await post(`user`, payload);
            dispatch({
                type: userConstants.STORE_USER,
                payload: data.user,
            })
            return data;
        } catch (err) {
            throw err;
        }
    };
}

function setUser (payload) {
    return async (dispatch) => {
        try {
            dispatch({
                type: userConstants.SET_USER,
                payload: payload,
            });
            return payload;
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
                type: userConstants.SET_USER,
                payload: data.user,
            });
            return data.user;
        } catch (err) {
            throw err;
        }
    };
}

function getAllUser (payload) {
    return async (dispatch) => {
        try {
            const { data } = await get(`user`, {});
            dispatch({
                type: userConstants.SET_USERS,
                payload: data.users,
            });
            return data.users;
        } catch (err) {
            throw err;
        }
    };
}

function getBySerialNo (payload) {
    return async (dispatch) => {
        try {
            const { data } = await get(`user/get-by-serial-no`, { serialNo: payload });
            dispatch({
                type: userConstants.SET_USER,
                payload: data.user,
            });
            return data.user;
        } catch (err) {
            throw err;
        }
    };
}