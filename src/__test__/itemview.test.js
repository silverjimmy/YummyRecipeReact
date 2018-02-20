import React from 'react';
import ReactDOM from 'react-dom';
import { render, configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-15';
import RecipeView from '../components/itemsview';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

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

    it('should render <div> without throwing an error', () => {
        const wrapper = shallow(<RecipeView />);
        expect(wrapper.exists(<Table />));
    });
});
