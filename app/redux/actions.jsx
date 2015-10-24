/*
 * action types
 */

export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const IS_EDITING = 'IS_EDITING';


/*
 * action creators
 */

export function addNote(task = 'New item') {
  return {type: ADD_NOTE, task};
}

export function updateNote(id, task) {
  return (dispatch, getState) => {
    const { notes } = getState();
    let index = findNote(id, notes);
    if (index >= 0) {
      dispatch({type: UPDATE_NOTE, index, task});
    }
  };
}

export function deleteNote(id) {
  return (dispatch, getState) => {
    const { notes } = getState();
    let index = findNote(id, notes);
    if (index >= 0) {
      dispatch({type: DELETE_NOTE, index});
    }
  };
}

export function editNote(id) {
  return (dispatch, getState) => {
    const { notes } = getState();
    let index = findNote(id, notes);
    if (index >= 0) {
      let isEditing = !notes[index].isEditing;
      dispatch({type: IS_EDITING, index, isEditing});
    }
  };
}

function findNote(id, notes) {
  return notes.findIndex((note) => note.id === id);
}
