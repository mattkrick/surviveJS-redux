import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { devTools, persistState } from 'redux-devtools';
import {addNote} from './actions';
import localState from 'redux-localstorage'

export default function configureStore() {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    // Provides support for DevTools:
    devTools(),
    localState(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);

  const store = finalCreateStore(reducer);
  if (store.getState().notes.length === 0) {
    store.dispatch(addNote('Learn Webpack'));
    store.dispatch(addNote('Learn React'));
    store.dispatch(addNote('Do laundry'));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
