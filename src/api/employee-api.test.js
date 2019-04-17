import EmployeeApi from "./employee-api";
import mockAxios from 'jest-mock-axios';

describe('Employee API', () => {

    afterEach(() => {
        mockAxios.reset();
    })

    it.only('should return idan on search', () => {
        const handlerError = jest.fn();
        const handlerResponse = jest.fn();
        const data = { username: 'idan' };

        const act = EmployeeApi.find(data)
            .then(handlerResponse)
            .catch(handlerError)

        const response = { data: { username: 'idan', id: '123' } };
        mockAxios.mockResponse(response);

        expect(mockAxios.get).toHaveBeenCalled();
        expect(handlerResponse).toHaveBeenCalled();
        expect(handlerResponse).toHaveReturnedWith(response.data)

        return expect(act).resolves.toHaveProperty('id', '123');
    })

    xit('should find one', async () => {
        expect(await EmployeeApi.findOne({ username: 'idan' })).not.toBeNull();
    })

    xit('should find one of many by id', async () => {
        const _id = "idString12345";
        const act = await EmployeeApi.find({ _id });
        expect(act).toHaveLength(1);
        expect(act[0]).toHaveProperty('_id', _id);
    })

    xit('should find one by id', async () => {
        const _id = "idString12345";
        const act = await EmployeeApi.findOne({ _id });
        expect(act).toHaveProperty('_id', _id);
    })

    xit('should update one', async () => {
        const _id = "idString12345";

        const data = {
            status: "WORKING",
        }

        await EmployeeApi.updateOne(_id, data);
        const act = await EmployeeApi.findOne({ _id })

        expect(act).toHaveProperty('status', data.status);
    })

    xit('should find all 3', async () => {
        const act = await EmployeeAPI.find({});
        expect(act).toHaveLength(3);
    })

    xit('should create one', async () => {
        const emp = {
            _id: 'idString12345568',
            username: 'newEmp@test.com',
            displayName: 'newEmp',
            status: 'BUSINESS_TRIP'
        }

        await EmployeeAPI.create(emp);
        const act = await EmployeeAPI.findOne(emp);

        expect(act).toBe(emp);
    })

    xit('should create one w/o id and generate it', async () => {
        const emp = {
            username: 'newEmp2@test.com',
            displayName: 'newEmp2',
            status: 'BUSINESS_TRIP'
        }

        await EmployeeAPI.create(emp);
        const act = await EmployeeAPI.findOne(emp);

        Object.keys(emp).forEach(key => expect(act).toHaveProperty(key, emp[key]));
        expect(act).toHaveProperty('_id');
    })


});