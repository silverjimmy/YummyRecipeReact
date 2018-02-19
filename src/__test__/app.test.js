
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import App from '../App'
import '../setupTests';

it('renders without crashing', () => {
    shallow(<App/>);
  });