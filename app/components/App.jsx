import uuid from 'node-uuid';
import React, {Component, PropTypes} from 'react';
import Notes from './Notes.jsx';
import { connect } from 'react-redux';
import {addNote, updateNote, deleteNote, editNote} from '../redux/actions';

class App extends Component {
  render() {
    const { dispatch, notes } = this.props;
    return (
      <div>
        <button className="add-note"
                onClick={() => dispatch(addNote())}>+
        </button>
        <Notes notes={notes}
               onUpdate={(id,task) => dispatch(updateNote(id,task))}
               onDelete={id => dispatch(deleteNote(id))}
               onEdit={id => dispatch(editNote(id))}/>
      </div>

    );
  }
}

App.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired
    }
  ))
};

function select(state) {
  return {
    notes: state.notes
  }
}
export default connect(select)(App);
