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

        it('should render <div> without throwing an error', () => {
                expect(wrapper.exists(<section className="tiles"/>))
            });

        it('renders five div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(5);        
        });

        it('should render <form> without throwing an error', () => {
                expect(wrapper.exists(<form/>)).toBe(true)
            });

            it('renders button elements', () => {
                expect(wrapper.find("button")).toHaveLength(0);        
            });

            it('renders the correct form fields', () => {
                expect(wrapper.find('username').length).toBe(0);
                expect(wrapper.find('password').length).toBe(0);
                expect(wrapper.find('#login').length).toBe(0);
            });
            it('renders a form element', () => {
                expect(wrapper.find('form').length).toBe(1);
            });

            it('should render <div> without throwing an error', () => {
                expect(wrapper.exists(<section className="tiles"/>))
            });
            it('should render <div> without throwing an error', () => {
                expect(wrapper.exists(<h4 />))
            });
            it('should render <div> without throwing an error', () => {
                expect(wrapper.exists(<div className="modal-header"/>))
            });
            it('should render <div> without throwing an error', () => {
                expect(wrapper.exists(<div className="error" />))
            });
})