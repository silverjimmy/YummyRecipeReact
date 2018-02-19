import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow, mount } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import NewRecipe from '../components/newRecipe';
import LocalStorageMock from '../setupTests';
import toJson from 'enzyme-to-json';
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
    const props = {
        history: {
            push: () => {}
        },
        location:{
            search: {}
        }  
    }
    const wrapper = shallow(<NewRecipe />)
    const preventDefault = jest.fn();
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
    it('render the inputs', () =>{
        expect(wrapper.find('name').length).toEqual(0);
        expect(wrapper.find('form').length).toEqual(1);
        expect(wrapper.find('input').length).toEqual(0)
    });

    it('renders the the add recipe form and submit data', () =>{
        wrapper.setState({title:'Awesome recipe', category:'General', steps:'one and two', ingredients:"one and two", status:"public"});
        wrapper.find("#recipe-form").simulate('submit', {preventDefault});
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    
})