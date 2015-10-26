import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {addNote, addLane} from './actionCreators';
import localState from 'redux-localstorage'
import DevTools from './DevTools';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  //localState(),
  DevTools.instrument()
)(createStore);
export default function configureStore() {
  const store = finalCreateStore(reducer);
  if (store.getState().lanes.length === 0) {
    store.dispatch(addLane());
    const laneId = store.getState().lanes[0].id;
    store.dispatch(addNote(laneId,'Learn Webpack'));
    store.dispatch(addNote(laneId,'Learn React'));
    store.dispatch(addNote(laneId,'Do laundry'));
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
