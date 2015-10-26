import React, {Component} from 'react';

export default class Editable extends Component {
  constructor(props) {
    super(props);
    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    const {isEditing} = this.props.item;
    return (
      <div>
        {isEditing ? this.renderEdit() : this.renderItem()}
      </div>
    );
  }

  renderEdit() {
    const {text} = this.props.item;
    return <input type="text"
                  autoFocus={true}
                  defaultValue={text}
                  onBlur={this.finishEdit}
                  onKeyPress={this.checkEnter}/>;
  }

  renderItem() {
    const {editItem, deleteItem, item} = this.props;
    const {id, text} = item;
    return (
      <div onClick={() => editItem(id,true)}>
        <span className="text">{text}</span>
        <button className="delete" onClick={() => deleteItem(id)}>x</button>
      </div>
    );
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    const {updateItem, editItem, item} = this.props;
    const {id} = item;
    updateItem(id, e.target.value);
    editItem(id, false);
  }
}
