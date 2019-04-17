import React, { Component } from 'react';
import './Main.css';
import { connect } from 'react-redux';
import * as finUnitActions from "../../redux/actions/fin-unit-actions";
import { CSVLink } from "react-csv";

function LoadingSpinner(props) {
    const { columns } = props;
    return (
        <tr>
            <td colSpan={Object.keys(columns).length}>
                <svg className="spinner" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="18"></circle>
                </svg>
            </td>
        </tr>
    );
}

function CsvButton(props) {

    const { finUnits, isLoading } = props;

    if (isLoading) return null;

    return (
        <div>
            <CSVLink data={finUnits}>Download CSV</CSVLink>
        </div>
    );
}

class Main extends Component {

    componentDidMount() {
        this.props.getTableView();
    }

    render() {

        const { finUnits } = this.props;
        const columns = {
            name: 'Financial Unit Name',
            notionalValue: 'National Value',
            rate: 'Rate',
            currency: 'Currency',
            calcValue: 'Calculated Value (in USD)',
        };

        const isLoading = !finUnits || finUnits.length === 0;

        return (
            <div className="Main">
                <h1>Foreign Exchange</h1>
                <CsvButton {...{ finUnits, isLoading }} />
                <table>
                    <thead>
                        <tr>
                            {Object.values(columns).map((x, key) => <th {...{ key }}>{x}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ?
                                <LoadingSpinner {...{ columns }} /> :
                                finUnits.map(unit =>
                                    <tr key={unit.name}>
                                        {Object.keys(columns).map(column => <td key={column + unit.name}>{unit[column]}</td>)}
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(x => x, finUnitActions)(Main);