import * as types from '../actions/actions-types';

export default function employeeReducer(employees = [], action) {
    switch (action.type) {
        case types.CREATE_EMPLOYEE:
            return [...employees, action.employee];

        case types.UPDATE_EMPLOYEE_STATUS:
            let index = employees.findIndex(x => x._id === action._id);
            return [
                ...employees.slice(0, index),
                { ...employees[index], status: action.status },
                ...employees.slice(index + 1)
            ];

        case types.LOAD_ALL_EMPLOYEES:
            return action.employees;

        default:
            return employees;


    }
}