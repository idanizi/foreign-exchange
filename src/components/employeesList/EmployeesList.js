import React, { Component } from "react";
import { Statuses } from '../../models';
import './EmployeesList.css';
import { connect } from "react-redux";
import * as employeeActions from "../../redux/actions/employee-actions";

class EmployeesList extends Component {

    componentDidMount = () => {
        this.props.loadAllEmployees();
    }

    state = {
        query: '',
        filter: '',
    }

    handleQueryChanged(evt) {
        let query = evt.target.value.toLowerCase();
        // todo: send to search api with timer timeout of 500ms to avoid back-end overflow

        this.setState({ query });
    }

    handleFilterChanged(evt) {
        let filter = evt.target.value;

        this.setState({ filter });
    }

    handleClearFilters() {
        // todo: add refs and clear input-txt and filter drop-down
        this.setState({ filter: '', query: '' })
    }

    render() {

        const { query, filter } = this.state;

        const { employees } = this.props;

        const filterEmployee = (emp) => {
            return (
                emp.displayName.toLowerCase().indexOf(query) > -1 &&
                    filter.length === 0 ? true : emp.status === filter
            );

        };

        return (
            <div className="EmployeesList">
                <hr />

                <h3>List of Employees:</h3>

                <div className='input-group'>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        onChange={evt => this.handleQueryChanged(evt)}
                    />

                    <select onChange={evt => this.handleFilterChanged(evt)}>
                        <option value='' defaultValue>Filter By Status...</option>
                        {Object.entries(Statuses).map(([value, label], key) =>
                            <option {...{ value, key }}>{label}</option>)}
                    </select>

                    {/* 
                    // optional optional:
                    <button onClick={this.handleClearFilters.bind(this)}>Clear</button> 
                    */}
                </div>

                <div>
                    <table>
                        <tbody>
                            {employees.filter(filterEmployee).map((emp, key) => (
                                <tr {...{ key }}>
                                    <td>
                                        {`${emp.displayName} (${Statuses[emp.status]})`}
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ employees: state.employees }),
    { ...employeeActions }
)(EmployeesList);