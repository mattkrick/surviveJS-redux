import React, {Component} from 'react';
import Lane from './Lane.jsx';

export default class Lanes extends Component {
  render() {
    let {lanes} = this.props;
    return <div className="lanes">{lanes.map(this.renderLane.bind(this))}</div>;
  }

  renderLane(lane) {
    const {notes: allNotes, actions} = this.props;
    const notes = allNotes.filter(note => note.laneId === lane.id);
    return <Lane key={`lane${lane.id}`} lane={lane} notes={notes} actions={actions}/>;
  }
}
