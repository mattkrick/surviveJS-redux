import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {
  hover(inTargetProps, monitor) {
    const targetLaneId = inTargetProps.laneId;
    const {id:sourceId, laneId:sourceLaneId, onMove} = monitor.getItem();
    if (inTargetProps.notes.length > 0 || targetLaneId === sourceLaneId ) return;
    onMove(sourceId, null, targetLaneId);
  }
};
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

export default class Notes extends React.Component {
  render() {
    const {notes,connectDropTarget} = this.props;
    return connectDropTarget(<ul className="notes">{notes.map(this.renderNote.bind(this))}</ul>);
  }

  renderNote(note, index) {
    const {editNote, updateNote, deleteNote, moveNote} = this.props.actions;
    return (
      <Note className="note" note={note} key={`note${note.id}`} onMove={moveNote} index={index}>
        <Editable item={note}
                  editItem={editNote}
                  updateItem={updateNote}
                  deleteItem={deleteNote}/>
      </Note>
    );
  }
}
