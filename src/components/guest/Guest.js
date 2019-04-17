import React, { Component } from "react";
import { connect } from 'react-redux';
import './Guest.css';
import * as userActions from "../../redux/actions/user-actions";

class Guest extends Component {

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.loginHandler();
    }

    render() {
        const { usernameChangedHandler } = this.props;

        return (
            <div className="container">
                <h1>Welcome to MyWorkStatus</h1>
                <div className="input-group">
                    <form onSubmit={evt => this.handleSubmit(evt)}>
                        <input type="text"
                            className="input-txt"
                            placeholder="My Username..."
                            onChange={(evt) => usernameChangedHandler(evt.target.value)} />

                        <button type="submit" className="login-btn">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatch = (dispatch, ownProps) => ({
    usernameChangedHandler: (username) => dispatch(userActions.changeUserName(username)),
    loginHandler: () => dispatch(userActions.loadOneEmployee({username: ownProps.username}))
})

export default connect(x => x, mapDispatch)(Guest);