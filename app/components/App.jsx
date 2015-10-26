import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as actionCreators from '../redux/actionCreators';
import Lanes from './Lanes.jsx';

@DragDropContext(HTML5Backend)
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes: {
    actions: PropTypes.object.isRequired,
    notes: PropTypes.array.isRequired,
    lanes: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        <button className="add-lane"
                onClick={this.props.actions.addLane}>+
        </button>
        <Lanes {...this.props}/>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes,
    lanes: state.lanes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}
