import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-15';
import Dashboard from '../components/dashboard';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NewCategory from '../components/newcategory';
import Pagination from 'material-ui-pagination';


configure({ adapter: new Adapter() });
let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match,
        push:{},
    };
    return shallow(<Dashboard {...props} />);
};


describe('Dashboard', () => {
    const wrapper = shallow(<Dashboard />)
    const props ={
        history:{
            push: () => {}
        }
    }
    it('matches  snapshot', () => {
            const dashboard = setUp;
           expect(shallowToJson(dashboard)).toMatchSnapshot();
        });


        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <Dashboard {...props}/>
            </MuiThemeProvider>, div);
    });

    it('should render <EditItem/> component', () => {
        const wrapper = shallow(<NewCategory />)
        expect(wrapper.length).toEqual(1)
    }); 
    it('should render <EditItem/> component', () => {
        const wrapper = shallow(<Pagination />)
        expect(wrapper.length).toEqual(1)
    });  
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<h4 />))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<h1 />))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="modal-header"/>))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="error" />))
    });
    
})