import React, { Component } from 'react';
import './App.css';
import { Main, Guest } from "../components";
import { connect } from "react-redux";

class App extends Component {

  render() {

    const { connected } = this.props.user;

    return (
      <div className="App">
        {
          connected ?
            <Main /> :
            <Guest />
        }
      </div>
    );
  }
}

export default connect(x => x)(App);
