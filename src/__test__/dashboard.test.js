import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import Dashboard from '../components/dashboard';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


configure({ adapter: new Adapter() });
let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match,
        push:{},
    };
    return shallow(<Dashboard {...props} />);
};


describe('Dashboard', () => {
    const props ={
        history:{
            push: () => {}
        }
    }
    it('matches  snapshot', () => {
            const dashboard = setUp;
           expect(shallowToJson(dashboard)).toMatchSnapshot();
        });


        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <Dashboard {...props}/>
            </MuiThemeProvider>, div);
    });
    
})