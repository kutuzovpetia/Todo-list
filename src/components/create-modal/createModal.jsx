import React, { useState } from "react";
import s from "./style.module.scss";
import { connect } from "react-redux";
import * as actions from "../../action";
import ApiService from '../../service-api';

const CreateModule = (props) => {

  const [title, setTitle] = useState('');

  const create = async (t) => {
    const api = new ApiService();
    const newList = await api.createNewList({title: t});
    return newList.todo;
  }
  
  return (
    <div className={s.modalWrapper}>
      <div className={s.modal}>
        <h4>Создать список</h4>
        <input
          type="text"
          placeholder="Имя списка"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className={s.controls}>
          <button
            className={`btn btn-warning`}
            onClick={() => {
              props.sCreateList();
            }}
          >
            отмена
          </button>
          <button
            className={`btn btn-success`}
            onClick={ async () => {
              if(!title){return}
              const obj = await create(title);
              props.createList({...obj, lists: []})
              setTitle('');
            }}
          >
            создать список
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps, actions)(CreateModule);
