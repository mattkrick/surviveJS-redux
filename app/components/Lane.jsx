import React, {Component} from 'react';
import Notes from './Notes.jsx';
//import {addNote, updateNote, deleteNote, editNote} from '../redux/actions';
import Editable from './Editable';

export default class Lane extends Component {
  render() {
    const {lane, notes, actions} = this.props;
    const {addNote, editLane, updateLane, deleteLane} = actions;
    return (
      <div className="lane">
        <div className="lane-header">
          <Editable item={lane}
                    editItem={editLane}
                    updateItem={updateLane}
                    deleteItem={deleteLane}/>
          <div className="lane-add-note">
            <button onClick={() =>addNote(lane.id)}>+</button>
          </div>
        </div>
        <Notes notes={notes} actions={actions} laneId={lane.id}/>
      </div>
    );
  }

}
