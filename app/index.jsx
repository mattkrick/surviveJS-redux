import './main.css';
import 'babel-core/polyfill';
import React from 'react';
import App from './components/App.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {addNote, updateNote, deleteNote} from './redux/actions';
import configureStore from './redux/store';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import {render} from 'react-dom';

let store = configureStore();
const app = document.createElement('div');
document.body.appendChild(app);

render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
  </div>
  , app
);
