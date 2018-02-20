import React from 'react';
import ReactDOM from 'react-dom';
import { render, configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-15';
import RecipeView from '../components/itemsview';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EditRecipe from '../components/editRecipe';
import DeleteItem from '../components/deleteitem';

configure({ adapter: new Adapter() });

const match = {
    params: '1',
};

const setUp = () => {
    const props = {
        match,
    };
    return shallow(<RecipeView {...props} />);
};

describe('recipeDisplay', () => {
    const props = {
        match,
    };
    it('matches  snapshot', () => {
        const recipeDisplay = setUp;
        expect(shallowToJson(recipeDisplay)).toMatchSnapshot();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider>
                <RecipeView {...props} />
            </MuiThemeProvider>,
            div,
        );
    });
});

describe('<Items /> component contains child componenets', () => {
    it('should render <Additem/> component', () => {
        const wrapper = shallow(<EditRecipe />);
        expect(wrapper.length).toEqual(1);
    });
    it('should render <EditItem/> component', () => {
        const wrapper = shallow(<DeleteItem />);
        expect(wrapper.length).toEqual(1);
    });
});
