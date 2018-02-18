import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import Login from '../components/login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';


 configure({ adapter: new Adapter() });


describe('<Login />', () => {
        const wrapper = shallow( <Login /> );

    it('matches  snapshot', () => {
           expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

    it('renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(
                <MuiThemeProvider>
                <Login />
                </MuiThemeProvider>, div);
        });

        it('has a button classname', () => {
                // expect(wrapper.find(''))
                
        });

        it('renders five div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(5);        
        });
    
})