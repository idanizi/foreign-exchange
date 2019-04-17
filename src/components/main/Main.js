import React, { Component } from 'react';
import './Main.css';
import { connect } from 'react-redux';
import * as finUnitActions from "../../redux/actions/fin-unit-actions";

class Main extends Component {

    componentDidMount() {
        this.props.getTableView();
    }

    render() {

        let { finUnits } = this.props;
        const columns = {
            name: 'Financial Unit Name',
            notionalValue: 'National Value',
            rate: 'Rate',
            currency: 'Currency',
            calcValue: 'Calculated Value (in USD)',
        };

        return (
            <div className="Main">
                <h1>Foreign Exchange</h1>
                <table>
                    <thead>
                        <tr>
                            {Object.values(columns).map((x, key) => <th {...{ key }}>{x}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {finUnits.map(unit =>
                            <tr key={unit.name}>
                                {Object.keys(columns).map(column => <td key={column + unit.name}>{unit[column]}</td>)}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(x => x, finUnitActions)(Main);