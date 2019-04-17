import * as types from '../actions/actions-types';

export default function userReducer(user = {}, action) {
    switch (action.type) {
        case types.CONNECT:
            const { username } = user;
            if (username && username.length > 0)
                return { ...user, connected: true };
            else
                return user;

        case types.UPDATE_USER:
            return { ...user, ...action.user };

        case types.USERNAME:
            return { ...user, username: action.username };

        case types.LOAD_USER_FROM_EMPLOYEE_DETAILS:
            return { ...user, ...action.user };

        default:
            return user;
    }
}