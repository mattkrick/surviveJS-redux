import React from 'react';
import Note from './Note.jsx';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.renderNote = this.renderNote.bind(this);
  }
  render() {
    const notes = this.props.notes;

    return <ul className="notes">{notes.map(this.renderNote)}</ul>;
  }
  renderNote(note) {
    return (
      <li className="note" key={`note${note.id}`}>
        <Note
          task={note.task}
          isEditing={note.isEditing}
          onUpdate={this.props.onUpdate.bind(null, note.id)}
          onEdit={this.props.onEdit.bind(null, note.id)}
          onDelete={this.props.onDelete.bind(null, note.id)}
          />
      </li>
    );
  }
}
