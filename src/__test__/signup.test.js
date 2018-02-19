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
import toJson from 'enzyme-to-json';


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
    const event={
        target:{
            value:{}
        },
        preventDefault: () => {

        },
        push: (event) =>{

        }
    }
    const preventDefault = jest.fn();
    const wrapper = shallow( <SignUp /> );
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

    it('renders the correct form fields', () => {
        expect(wrapper.find('username').length).toBe(0);
        expect(wrapper.find('password').length).toBe(0);
        expect(wrapper.find('#login').length).toBe(0);
    });
    
    it('renders a form element', () => {
        expect(wrapper.find('form').length).toBe(1);
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
    it('input should respond to change event and change the state', () => {
        wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'admin' } });
        expect(wrapper.state('password')).toEqual('admin')
    });
    it('renders login form and submits data', () =>{
        wrapper.find("#signup_form").simulate('submit', {preventDefault(){}});
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('render the two inputs', () =>{
        expect(wrapper.find("#password")).toHaveLength(1);
        expect(wrapper.find("#username")).toHaveLength(1);
        expect(wrapper.find("#email")).toHaveLength(1);
        wrapper.find("#password").simulate('change', {target: {value: 'admin'}});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('make sure the email is valid', () =>{
      wrapper.find("#email").simulate('change', {target: {value: 'geofrocker@gmail.com'}});
      expect(toJson(wrapper)).toMatchSnapshot();
  })
  it('fetch list', () => {
    const wrapper = shallow(<SignUp />); 
    wrapper.instance().handleSubmit(event)
});
    it('input should respond to change event and change the state', () => {
        wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'admin' } });
        expect(wrapper.state('password')).toEqual('admin')
    });
    it('renders login form and submits data', () =>{
        wrapper.find("#signup_form").simulate('submit', {preventDefault(){}});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

})
