import { baseUrl, handleError, handleResponse } from "./api-utils";
import axios from 'axios';

function getAllPositions() {
    const route = '/positions';
    const url = baseUrl + route;

    return axios.get(url)
        .then(handleResponse)
        .catch(handleError);
}

function getAllRawFinUnits() {
    const route = '/finunits';
    const url = baseUrl + route;

    return axios.get(url)
        .then(handleResponse)
        .catch(handleError);
}

function getConvert(_from, to, amount, decimal_places) {
    const url = 'https://sonar.trading/api/v1/convert'
        + `?from=${_from}&to=${to}&amount=${amount}&decimal_places=${decimal_places}`;

    return axios.get(url)
        .then(handleResponse)
        .catch(handleError);
}

async function joinView() {
    try {
        const rawFinUnits = await getAllRawFinUnits();
        const positions = await getAllPositions();
        const results = [];
        const to = 'USD';
        const decimal_places = 4;

        for (let unit of rawFinUnits) {
            const { data: { currency: { ccy, nationalValue } } } = positions.find(x => x.fuOriginId = unit.id);

            if (ccy === undefined || nationalValue === undefined)
                throw new Error('position not found for id ' + unit.id);

            const convert = await getConvert(ccy, to, 1, decimal_places);

            const { to: { rate } } = convert;

            if (rate === undefined)
                throw new Error('rate not found for id ' + unit.id);

            const calcValue = rate * nationalValue;

            results.push({name: unit.name, nationalValue, rate, currency: ccy, calcValue});
        }

        return results;

    } catch (error) {
        console.log(error)
        return [];
    }
}

class FinUnitsApi {

    getTableView = joinView;

}

export default new FinUnitsApi();