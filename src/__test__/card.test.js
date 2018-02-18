
import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import YummyRecipeCard from '../components/card/YummyRecipeCard';
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
    return shallow(<YummyRecipeCard {...props} />);
};

describe('ViewRecipe', () => {
    it('matches  snapshot', () => {
            const viewRecipe = setUp;
           expect(shallowToJson(viewRecipe)).toMatchSnapshot();
        });    
})
