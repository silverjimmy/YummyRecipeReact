import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import injectTapEventPlugin from 'react-tap-event-plugin';

// enabling
injectTapEventPlugin();

configure({ adapter: new Adapter() });



class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
  global.localStorage = new LocalStorageMock;