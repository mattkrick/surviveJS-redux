import uuid from 'node-uuid';
import { combineReducers } from 'redux';
import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, IS_EDITING_NOTE, ADD_LANE,
  MOVE_NOTE, UPDATE_LANE, DELETE_LANE, IS_EDITING_LANE} from './actions';
import update from 'react/lib/update';

function notes(state = [], action = null) {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, {
        id: uuid.v4(),
        text: action.text,
        isEditing: false,
        laneId: action.laneId
      }];
    case UPDATE_NOTE:
      return state.map(note =>
          note.id === action.id ?
            Object.assign({}, note, { text: action.text }) : note
      );
    case DELETE_NOTE:
      return state.filter(note =>note.id !== action.id);
    case IS_EDITING_NOTE:
      return state.map(note =>
          note.id === action.id ?
            Object.assign({}, note, { isEditing: action.isEditing}) : note
      );
    case MOVE_NOTE:
      const currentIndex = state.findIndex((note) => note.id === action.noteId);
      const movedNote = update(state[currentIndex], {laneId: {$set: action.laneId}});
      const newIndex = action.putAfterId ?state.findIndex((note) => note.id === action.putAfterId) : 0;
      return update(state, {
        $splice: [
          [currentIndex, 1],
          [newIndex, 0, movedNote]
        ]
      });
    default:
      return state;
  }
}

function lanes(state = [], action = null) {
  switch (action.type) {
    case ADD_LANE:
      return [...state, {
        id: uuid.v4(),
        text: 'New lane',
        isEditing: false
      }];
    case UPDATE_LANE:
      return state.map(item =>
          item.id === action.id ?
            Object.assign({}, item, { text: action.text }) : item
      );
    case DELETE_LANE:
      return state.filter(item =>item.id !== action.id);
    case IS_EDITING_LANE:
      return state.map(item =>
          item.id === action.id ?
            Object.assign({}, item, { isEditing: action.isEditing}) : item
      );
    default:
      return state;
  }
}

const kanbanApp = combineReducers({
  notes,
  lanes
});

export default kanbanApp
