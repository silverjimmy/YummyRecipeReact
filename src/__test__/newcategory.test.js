import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow, mount } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import NewCategory from '../components/newcategory';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'material-ui';



let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<NewCategory {...props} />);
};


describe('CreateRecipe', () => {
    const wrapper = shallow(<NewCategory />)

    it('matches  snapshot', () => {
            const createRecipe = setUp;
           expect(shallowToJson(createRecipe)).toMatchSnapshot();
        });

    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <NewCategory />
            </MuiThemeProvider>, div);
    });

    it('should render without throwing an error', () => {
        expect(wrapper.find("div")).toHaveLength(4)
    })
    it('render the inputs', () =>{
        expect(wrapper.find('name').length).toEqual(0);
        expect(wrapper.find('form').length).toEqual(1);
        expect(wrapper.find('TextField').length).toEqual(2);

    });
    it('renders a form element', () => {
        expect(wrapper.find('form').length).toBe(1);
    });
    
})