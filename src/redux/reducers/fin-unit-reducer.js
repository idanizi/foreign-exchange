import * as types from '../actions/actions-types';

export default function finUnitReducer(finUnits = [], action) {
    switch (action.type) {
        case types.LOAD_VIEW_TABLE:
            return action.finUnits;
        default:
            return finUnits;
    }
}