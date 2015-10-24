import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderTask = this.renderTask.bind(this);
  }

  render() {
    const {isEditing} = this.props;
    return (
      <div>
        {isEditing ? this.renderEdit() : this.renderTask()}
      </div>
    );
  }

  renderEdit() {
    return <input type="text"
                  autoFocus={true}
                  defaultValue={this.props.task}
                  onBlur={this.finishEdit}
                  onKeyPress={this.checkEnter}/>;
  }

  renderTask() {

    const {onDelete, onEdit, task} = this.props;
    return (
      <div onClick={() => onEdit()}>
        <span className="task">{task}</span>
        {onDelete ? this.renderDelete() : null }
      </div>
    );
  }

  renderDelete() {
    return <button className="delete" onClick={this.props.onDelete}>x</button>;
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    let {onUpdate, onEdit} = this.props;
    onUpdate(e.target.value);
    onEdit();
  }
}
