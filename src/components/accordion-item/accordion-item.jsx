import React, { useState } from "react";
import s from "./style.module.scss";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import * as actions from '../../action';
import {connect} from 'react-redux';
import ApiService from '../../service-api';
import {CheckSquareFill} from 'react-bootstrap-icons';

const AccordionItem = (props) => {

  const api = new ApiService();
  // const [date, setDate] = useState(props.date);
 
  const deleteTask  = (idCArd,idItem) => {
    api.deleteTask(idCArd, idItem);// Удаляем с базы
    props.deleteItemFromList(idItem, idCArd); // Удаляем из store
  }

 

  let color = null;
    switch (props.priority) {
        case 'Низкий': color = s.priorityBlue;
            break;
        case 'Средний': color = s.priorityOrange;
            break;
        case 'Высокий': color = s.priorityRed;
            break;
        default:
            break;
    }

  return (
    <div className={s.wrapper}>
      <Card key={props.id} className={'mb-2 w-100'}>
      <Accordion.Toggle as={Card.Header} eventKey={props.id} className={color}>
        <div className={`${props.done ? s.titleChecked : s.title} d-flex justify-content-between`}>
          {props.title}
          <div>
            <span className='mr-3'>{props.date}</span>
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.id}>
        <Card.Body className="d-flex justify-content-between flex-wrap">
          <div className={'w-100'}>
            <h5>Заметки</h5>
            <textarea cols="25" rows="7" 
            defaultValue={props.note} 
            onChange={(e)=>{ 
              api.task(props.objCard.id, props.id, {note: e.target.value});
              props.addNote(props.id, props.objCard.id, e.target.value);
            }}
            />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
          </div>
          <div>
            <h5>Дата выполнения</h5>
            <button onClick={()=>{api.date(props.objCard.id, props.id,{date: 'Сегодня'}); props.addDate(props.id, props.objCard.id, 'Сегодня')}} className={`btn btn-dark mr-1 ${s.inputDate}`}>Сегодня</button>
            <button onClick={()=>{api.date(props.objCard.id, props.id,{date: 'Завтра'}); props.addDate(props.id, props.objCard.id, 'Завтра')}} className={`btn btn-dark mr-1 ${s.inputDate}`}>Завтра</button>
            <input type="date" name="" id="" onChange={(e) => { api.date(props.objCard.id, props.id,{date: e.target.value}); props.addDate(props.id, props.objCard.id, e.target.value)}} className={`${s.inputDate} btn btn-info`} />
            <h5 className='mt-2'>Приоритет</h5>
            <DropdownButton id="dropdown-item-button" title={props.priority} className={s.dropDown}>
              <Dropdown.Item as="button" onClick={()=>{api.priority(props.objCard.id , props.id ,{priority: 'Нет'}); props.addPriority(props.id, props.objCard.id, 'Нет')}}>Нет</Dropdown.Item>
              <Dropdown.Item as="button" onClick={()=>{api.priority(props.objCard.id , props.id ,{priority: 'Низкий'}); props.addPriority(props.id, props.objCard.id, 'Низкий')}}>Низкий</Dropdown.Item>
              <Dropdown.Item as="button" onClick={()=>{api.priority(props.objCard.id , props.id ,{priority: 'Средний'}); props.addPriority(props.id, props.objCard.id, 'Средний')}}>Средний</Dropdown.Item>
              <Dropdown.Item as="button" onClick={()=>{api.priority(props.objCard.id , props.id ,{priority: 'Высокий'}); props.addPriority(props.id, props.objCard.id, 'Высокий')}}>Высокий</Dropdown.Item>
            </DropdownButton>

            <button 
              className={`${s.btnDelete} btn btn-danger`} 
              onClick={()=>{ deleteTask(props.objCard.id, props.id);}}>Удалить
            </button>
            
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    <button 
      className={s.doneBtn} onClick={()=>{
        const api = new ApiService();
        api.done(props.objCard.id, props.id, {done: !props.done})
        props.doneCheck(props.objCard.id, props.id, !props.done)
      }}>

      <CheckSquareFill className={props.done ? s.checked : s.check}
      /></button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data
  };
  
};

export default connect(mapStateToProps, actions)(AccordionItem);
