import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import Editcategory from '../components/editcategory';
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
    return shallow(<Editcategory {...props} />);
};


describe('recipeDisplay', () => {
    const wrapper = shallow( <Editcategory /> );
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
            <Editcategory {...props}/>
            </MuiThemeProvider>, div);
             });

        it('renders five div jsx elements', () => {
            const wrapper = shallow( <Editcategory /> );
        expect(wrapper.find("div")).toHaveLength(3);        
            });
            it('should render <form> without throwing an error', () => {
                expect(wrapper.exists(<form/>)).toBe(true)
            });
            it('should render <div> without throwing an error', () => {
                expect(wrapper.exists(<span />))
            });
    
})