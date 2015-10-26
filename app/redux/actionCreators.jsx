import * as types from './actions';
/*
 * action creators
 */

export function addNote(laneId, text = 'New item') {
  return {type: types.ADD_NOTE, laneId, text};
}

export function updateNote(id, text) {
  return {type: types.UPDATE_NOTE, id, text};
}

export function deleteNote(id) {
  return {type: types.DELETE_NOTE, id};
}

export function editNote(id, isEditing) {
  return {type: types.IS_EDITING_NOTE, id, isEditing}
}

export function moveNote(noteId, putAfterId, laneId) {
  return {type: types.MOVE_NOTE, noteId, putAfterId, laneId};
}

export function addLane() {
  return {type: types.ADD_LANE};
}

export function updateLane(id, text) {
  return {type: types.UPDATE_LANE, id, text};
}

export function deleteLane(id) {
  return {type: types.DELETE_LANE, id};
}

export function editLane(id, isEditing) {
  return {type: types.IS_EDITING_LANE, id, isEditing}
}

