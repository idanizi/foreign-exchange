import { combineReducers } from "redux";
import finUnits from "./fin-unit-reducer";

const rootReducer = combineReducers({
    finUnits,
})

export default rootReducer;