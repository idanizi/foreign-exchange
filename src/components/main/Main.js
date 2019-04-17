import React, { Component } from 'react';
import { EmployeesList } from '../';
import { Statuses } from '../../models'
import './Main.css';
import { connect } from 'react-redux';
import * as employeeActions from '../../redux/actions/employee-actions'

const UpdateStatus = (props) => (
    <div className="update-status">
        <h3>Update My Current Status:</h3>
        <select onChange={evt => props.statusChangedHandler(evt.target.value)} value={props.status}>
            {Object.entries(Statuses).map(([value, label], key) =>
                <option {...{ value, key }}>{label}</option>)}
        </select>
    </div>
)


class Main extends Component {

    render() {

        let { statusChangedHandler, user } = this.props;
        let { displayName, status, _id } = user;
        return (
            <div className="Main">
                <h1>Hello {displayName}, you are on {Statuses[status].toLowerCase().replace(/\s*on\s*/, '')} </h1>

                <UpdateStatus {...{ statusChangedHandler: status => statusChangedHandler({ status, _id }), status }} />
                <EmployeesList />
            </div>
        );
    }
}

const mapDispatch = {
    statusChangedHandler: employeeActions.updateEmployeeStatus,
}

export default connect(state => ({ user: state.user }), mapDispatch)(Main);