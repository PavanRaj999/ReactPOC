import React, { Component } from 'react';
import List from './ListComp';
import { connect } from "react-redux";
import AddButton from "./AddButton";
import {DragDropContext} from "react-beautiful-dnd";
import {sort} from "../actions";


class App extends Component {

  onDragEnd = result => {
  const {destination,source, draggabledId} = result;

  if(!destination ){
    return;
  }

  this.props.dispatch(
    sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggabledId
    )
  )
 
  };

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div >
        <h2> Sample Application </h2>
        <div style={styeles.listsContainer}>
          {lists.map(list => (
          <List 
            listID={list.id} 
            title={list.title} 
            key={list.id} 
            cards={list.cards} 
          />
          ))}
          <AddButton list />
        </div>
      </div>
      </DragDropContext>
    );
  }
}
const styeles = {
  listsContainer: {
    display: "flex",
    flexDriection: "row"
  }
};
const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
