import { baseUrl, handleError, handleResponse } from "./api-utils";
import axios from 'axios';
// import ApiMock from "./mock/api-mock";


function getAllPositions() {
    const route = '/positions';
    const url = baseUrl + route;

    return axios.get(url)
        .then(handleResponse)
        .catch(handleError);
}

function getAllFinUnits() {
    const route = '/positions';
    const url = baseUrl + route;

    return axios.get(url)
        .then(handleResponse)
        .catch(handleError);
}

function joinView(finUnits, positions) {
    
}

class FinUnitsApi {

    getView = async () => {
        try {
            return joinView(await getAllFinUnits(), await getAllPositions());
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }

}

export default new FinUnitsApi();