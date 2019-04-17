import * as types from '../actions/actions-types';
import employeeApi from "../../api/employee-api";

export function createEmployee(employee) {
    return function (dispatch) {
        return employeeApi.create(employee)
            .then(employee => {
                dispatch({ type: types.CREATE_EMPLOYEE, employee });
            }).catch(error => {
                throw error;
            });
    }
}

export function updateEmployeeStatus({ status, _id }) {
    return function (dispatch, getState) {
        const { user } = getState();
        return employeeApi.updateOne(_id, { ...user, status })
            .then(({ status, _id }) => {
                dispatch({ type: types.UPDATE_EMPLOYEE_STATUS, status, _id });
                dispatch({ type: types.UPDATE_USER, user: { ...user, status } })
            })
            .catch(error => {
                throw error;
            });
    }
}

export function loadAllEmployees() {
    return function (dispatch) {
        return employeeApi.find({})
            .then(employees => {
                dispatch({ type: types.LOAD_ALL_EMPLOYEES, employees });
            })
            .catch(error => {
                throw error;
            });
    }
}

