import { combineReducers } from "redux";
import employees from './employee-reducer';
import user from './user-reducer';

const rootReducer = combineReducers({
    employees,
    user,
})

export default rootReducer;