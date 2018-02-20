import React from 'react';
import ReactDOM from 'react-dom';
import { render, configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-15';
import Menu from '../components/menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

configure({ adapter: new Adapter() });

describe('<Menu />', () => {
    it('matches  snapshot', () => {
        const header = shallow(<Menu />);
        expect(shallowToJson(header)).toMatchSnapshot();
    });

    it('should render <div> without throwing an error', () => {
        const header = shallow(<Menu />);
        expect(header.exists(<div className="inner" />));
    });
});
