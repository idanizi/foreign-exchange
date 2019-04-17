import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './Main';

describe('Main', () => {

    it('should load', () => {
        const emp = {
            "_id": "idString12345",
            "username": "Idan@test.com",
            "displayName": "Idan",
            "status": "ON_VACATION"
        }
        const div = document.createElement('div');
        ReactDOM.render(<Main {...emp} employees={[]} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
})
