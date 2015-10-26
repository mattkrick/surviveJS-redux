import React, {Component} from 'react';
import { Provider } from 'react-redux';
import App from '../components/App';
import DevTools from './DevTools';
import configureStore from './store';

let store = configureStore();
export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
