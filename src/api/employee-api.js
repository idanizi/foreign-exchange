import { baseUrl, handleError, handleResponse } from "./api-utils";
import axios from 'axios';
// import ApiMock from "./mock/api-mock";

const route = '/employees'; // todo: should be '/employee' when i have server & db
const url = baseUrl + route;

class EmployeeApi {

    create = data => axios.post(url, data)
        .then(handleResponse)
        .catch(handleError);

    find = params => axios.get(url, { params })
        .then(handleResponse)
        .catch(handleError);

    findOne = params => axios.get(url, { params })
        .then(handleResponse)
        .then(res => res && res[0])
        .catch(handleError);

    updateOne = (_id, data) => axios.put(url + '/' + _id, data)
        .then(handleResponse)
        .catch(handleError);
}

export default new EmployeeApi();