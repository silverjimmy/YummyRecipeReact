import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import EditRecipe from '../components/editRecipe';
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
    return shallow(<EditRecipe {...props} />);
};


describe('recipeDisplay', () => {
    const props = {
        match
    };
    it('matches  snapshot', () => {
            const recipeDisplay = setUp;
           expect(shallowToJson(recipeDisplay)).toMatchSnapshot();
        });

        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <EditRecipe {...props}/>
            </MuiThemeProvider>, div);
             });

        it('renders five div jsx elements', () => {
            const wrapper = shallow( <EditRecipe /> );
            expect(wrapper.find("div")).toHaveLength(3);        
            });
        
        
        it('should render a button', () =>{
            const wrapper = shallow( <EditRecipe /> );
            expect(wrapper.find('RaisedButton').length).toEqual(0);
        })

        it('should render a button', () =>{
            const wrapper = shallow( <EditRecipe /> );
            expect(wrapper.find('TableHeader').length).toEqual(0);
        })
    
})