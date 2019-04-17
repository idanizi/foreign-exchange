import * as types from "./actions-types";
import finUnitsApi from "../../api/fin-units-api";

export function getTableView() {
    return function (dispatch) {
        return finUnitsApi.getTableView()
            .then(finUnits => {
                dispatch({type: types.LOAD_VIEW_TABLE, finUnits});
            })
            .catch(error => console.log(error));
    }
}