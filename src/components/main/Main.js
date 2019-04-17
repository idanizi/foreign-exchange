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
        <div className="download-csv-btn">
            <CSVLink data={finUnits}>Download CSV</CSVLink>
        </div>
    );
}

function AggregationTable(props) {
    const { finUnits, isLoading, columns } = props;

    if (isLoading) return null;

    /**
     * @param {[]} data 
     */
    const aggregate = data => {
        const result = [];
        for (let name of new Set(data.map(x => x.name))) {
            const row = data.filter(x => x.name === name).reduce((acc, unit) => ({
                ...unit,
                notionalValue: acc.notionalValue + unit.notionalValue,
                calcValue: acc.calcValue + unit.calcValue,
            }));

            result.push(row);
        }

        return result;
    }

    let selectedColumns = columns;
    delete selectedColumns.rate;
    delete selectedColumns.currency;

    return (
        <React.Fragment>
            <hr />
            <h2>Aggregation</h2>
            <table>
                <TableHead columns={selectedColumns} />
                <tbody>
                    {aggregate(finUnits).map((unit, i) =>
                        <tr key={`${unit.name}${i}`}>
                            {Object.keys(columns).map((column, j) =>
                                <td key={`${column}${unit.name}${i}${j}`}>{unit[column]}</td>)}
                        </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    );
}

function TableHead(props) {

    const { columns } = props;

    return (
        <thead>
            <tr>
                {Object.values(columns).map((x, key) => <th {...{ key }}>{x}</th>)}
            </tr>
        </thead>
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
                    <TableHead {...{ columns }} />
                    <tbody>
                        {
                            isLoading ?
                                <LoadingSpinner {...{ columns }} /> :
                                finUnits.map((unit, i) =>
                                    <tr key={`${unit.name}${i}`}>
                                        {Object.keys(columns).map((column, j) =>
                                            <td key={`${column}${unit.name}${i}${j}`}>{unit[column]}</td>)}
                                    </tr>
                                )
                        }
                    </tbody>
                </table>

                <AggregationTable {...{ finUnits, isLoading, columns }} />

            </div>
        );
    }
}

export default connect(x => x, finUnitActions)(Main);