import uuid from 'node-uuid';
import { combineReducers } from 'redux';
import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, IS_EDITING} from './actions';

function notes(state = [], action) {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, {
        id: uuid.v4(),
        task: action.task,
        isEditing: false
      }];
    case UPDATE_NOTE:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          task: action.task
        }),
        ...state.slice(action.index + 1)
      ];
    case DELETE_NOTE:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    case IS_EDITING:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          isEditing: action.isEditing
        }),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}

function lanes(state = [], action) {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, {
        id: uuid.v4(),
        notes: action.notes
      }];
    default:
      return state;
  }
}

const kanbanApp = combineReducers({
  notes,
  lanes
});

export default kanbanApp
