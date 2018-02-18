import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow, mount } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import NewRecipe from '../components/newRecipe';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<NewRecipe {...props} />);
};


describe('CreateRecipe', () => {
    const wrapper = shallow(<NewRecipe />)

    it('matches  snapshot', () => {
            const createRecipe = setUp;
           expect(shallowToJson(createRecipe)).toMatchSnapshot();
        });

    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <NewRecipe />
            </MuiThemeProvider>, div);
    });

    it('should render without throwing an error', () => {
        expect(wrapper.find("div")).toHaveLength(5)
    })
    
})