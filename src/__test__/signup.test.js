import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import SignUp from '../components/signup';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';


configure({ adapter: new Adapter() });

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<SignUp {...props} />);
};

describe('<SignUp />', () => {
    it('matches  snapshot', () => {
            const register = setUp;
           expect(shallowToJson(register)).toMatchSnapshot();
        });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider>
        <SignUp />
        </MuiThemeProvider>, div);
    });
})
