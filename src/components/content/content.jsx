import React, { useState } from "react";
import s from "./style.module.scss";
import { connect } from "react-redux";
import * as actions from "../../action.js";
import Card from "../card";
import ItemList from "../list-item";
import CreateModule from "../create-modal";
import TodoList from "../todoList";
import { Route } from "react-router-dom";
import Plans from "../plans";

const Content = (props) => {

  const [objId, setObjId] = useState(null); // полученый ID обьекта

  const deleteItem = (id) => {
    // Удаляет елемент из списка
    objId.list = objId.lists.filter((item) => item.id !== id);
  };

  const elements = props.data.map((item) => {
    if (!props.display) {
      return (
        <Card setObjId={setObjId} key={item.id} id={item.id} title={item.title} list={item.lists} ></Card>
      );
    } else {
      return ( <ItemList key={item.id} id={item.id} title={item.title}></ItemList>
      );
    }
  });

  return (
    <div className={props.display ? s.contentWrapperList : s.contentWrapperBlock}>
     
     <Route path={'/lists'}>
        {props.onList ? (
        <TodoList obj={props.data.find((item) => item.id === objId)} getDeleteId={deleteItem}/>
      ) : elements}
     </Route>

     <Route path={'/plans'}>
          <Plans/>
     </Route>

    {props.showCreateList ? <CreateModule/> : null}

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    display: state.display,
    showCreateList: state.showCreateList,
    onList: state.onList,
  };
};

export default connect(mapStateToProps, actions)(Content);
