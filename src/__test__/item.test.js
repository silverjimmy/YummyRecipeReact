import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import Items from '../components/items';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


configure({ adapter: new Adapter() });

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<Items {...props} />);
};


describe('recipeDisplay', () => {
    const props = {
        match
    };
    it('matches  snapshot', () => {
            const recipeDisplay = setUp;
           expect(shallowToJson(recipeDisplay)).toMatchSnapshot();
        });

    //     it('renders without crashing', () => {
    //         const div = document.createElement('div');
    //         ReactDOM.render(
    //         <MuiThemeProvider>
    //         <RecipeView {...props}/>
    //         </MuiThemeProvider>, div);
    // });
    
})