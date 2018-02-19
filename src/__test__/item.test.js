import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import Items from '../components/items';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RecipeView from '../components/itemsview';
import NewRecipe from '../components/newRecipe';
import DeleteCategory from '../components/deleteCategory';
import Editcategory from "../components/editcategory";


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
        match,
        location:{state:{title:'mockTitle'}},
        params:{id:1}
    };
    it('matches  snapshot', () => {
            const recipeDisplay = setUp;
           expect(shallowToJson(recipeDisplay)).toMatchSnapshot();
        });

        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <Items {...props}/>
            </MuiThemeProvider>, div);
             });

        it('renders five div jsx elements', () => {
            const wrapper = shallow( <Items {...props} /> );
            expect(wrapper.find("div")).toHaveLength(3);        
            });

        it('should render a button', () =>{
            const wrapper = shallow( <Items {...props} /> );
            expect(wrapper.find('RaisedButton').length).toEqual(3);
        })
    
})

describe('<Items /> component contains child componenets', () => {
    
    it('should render <Additem/> component', () => {
        const wrapper = shallow(<NewRecipe />)
        expect(wrapper.length).toEqual(1)
    });
    it('should render <EditItem/> component', () => {
        const wrapper = shallow(<RecipeView />)
        expect(wrapper.length).toEqual(1)
    });
    it('should render <EditItem/> component', () => {
        const wrapper = shallow(<DeleteCategory />)
        expect(wrapper.length).toEqual(1)
    });
    it('should render <EditItem/> component', () => {
        const wrapper = shallow(<Editcategory />)
        expect(wrapper.length).toEqual(1)
    });    
});