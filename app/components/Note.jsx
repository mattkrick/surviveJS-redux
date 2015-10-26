import React, {Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';
import { findDOMNode } from 'react-dom';

const noteSource = {
  beginDrag(props) {
    return {
      id: props.note.id,
      index: props.index,
      laneId: props.note.laneId,
      onMove: props.onMove
    };
  }
};

const noteTarget = {
  hover(inTargetProps, monitor, component) {
    const targetProps = {
      id: inTargetProps.note.id,
      index: inTargetProps.index,
      laneId: inTargetProps.note.laneId
    };
    const sourceProps = monitor.getItem();
    if (sourceProps.id === targetProps.id) return;
    if (sourceProps.laneId === targetProps.laneId) {
      //make dragging a little nicer
      const targetBoundingRect = findDOMNode(component).getBoundingClientRect();
      const targetMiddleY = targetBoundingRect.top + targetBoundingRect.height / 2;
      const clientOffsetY = monitor.getClientOffset().y;
      if (sourceProps.index < targetProps.index && clientOffsetY < targetMiddleY) {
        return;
      }
      if (sourceProps.index > targetProps.index && clientOffsetY > targetMiddleY) {
        return;
      }
    }
    sourceProps.onMove(sourceProps.id, targetProps.id, targetProps.laneId);
    //monitor.getItem().index = targetProps.index; //mutates state
  }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()

}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default
class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging, ...props} = this.props;
    return connectDropTarget(connectDragSource(
      <li style={{
          opacity: isDragging ? 0 : 1
        }} {...props}>{props.children}</li>
    ));
  }
}
