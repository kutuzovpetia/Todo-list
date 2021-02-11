import React from "react";
import s from "./style.module.scss";
import { connect } from "react-redux";
import * as actions from "../../action";
import CardBoot from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'


const Card = (props) => {
  
  // Функция показывает список
  const showList = () => {
    if(props.onSearch){props.showSearch()} // Закрываем поиск если открыт
    props.showList(); // Показываем список
    props.setObjId(props.id); // 
  }

  return (
    <CardBoot 
    bg={'dark'} 
    text={'white'}  
    className={s.card} 
    onClick={()=>{showList()}}
    >
      <div className='d-flex justify-content-between align-items-center mr-3'>
      <CardBoot.Header>{props.title}</CardBoot.Header>
      <span>{new Date().toLocaleDateString()}</span>
      </div>
      
      <CardBoot.Body className={s.listGroup}>
        
        <ListGroup>
        {
          
          props.list.slice(0, 5).map((item)=>{
            let color = null;
            switch (item.priority) {
              case 'Нет':
                color = null;
                break;
              case 'Низкий':
                  color = s.itemBlue;
                break;
              case 'Средний':
                  color = s.itemOrang;
                break;
              case 'Высокий':
                  color = s.itemRed;
                break;
              default:
                break;
            }
            return <ListGroup.Item  key={item.id} variant="info" className={color}>
              <div className='d-flex justify-content-between m-0'>
                <p className={item.done ? s.titleChecked : s.title}>{item.title}</p>
                <p>{item.date}</p>
              </div>
            </ListGroup.Item>
          })
        }
        
       </ListGroup>
      
      </CardBoot.Body>
    </CardBoot>
  );
};

const mapStateToProps = (state) => {
  return {
    logining: state.accountLogin,
    data: state.data,
    onList: state.onList,
    onSearch: state.onSearch,
  };
};

export default connect(mapStateToProps, actions)(Card);
