import * as types from '../actions/actions-types';
import employeeApi from '../../api/employee-api';

export function connectUser() {
    return { type: types.CONNECT };
}

export function changeUserName(username) {
    return { type: types.USERNAME, username };
}

export function updateUser(user) {
    return { type: types.UPDATE_USER, user };
}

export function loadOneEmployee(params) {
    return function (dispatch, getState) {
        return employeeApi.findOne(params)
            .then(employee => {
                dispatch({ type: types.LOAD_USER_FROM_EMPLOYEE_DETAILS, user: employee })
                const state = getState();
                if (!state.user.connected)
                    dispatch(connectUser());
            })
            .catch(error => {
                throw error;
            });
    }
}