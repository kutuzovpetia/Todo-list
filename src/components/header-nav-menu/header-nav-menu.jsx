import React from "react";
import s from "./style.module.scss";
import { ListTask, Check2, Search, List, Grid } from "react-bootstrap-icons";
import {connect} from 'react-redux';
import * as actions from '../../action';
import { NavLink, Route, Redirect } from 'react-router-dom';
import ApiService from '../../service-api';

const HeaderNavMenu = (props) => {
 
  const api = new ApiService();

  // Функция возвращает количество запланированых событий
  const plan = () =>{
    let count = 0;
    props.data.map((item)=>{
        item.lists.map((item)=>{
            if(item.date){
              count++;
            }
        })
    })
    return count;
  }

  // Функция поиска по спискам
  const searchLists = (e) =>{
    if(!e.target.value){
      api.getAllList().then((res) => {
        props.setData(res.reverse());
      });
    }
    const newData = props.data.filter((item)=>{
      return item.title.toLowerCase().search(e.target.value.toLowerCase())!== -1;
    }) 
    props.setData(newData)
  }

  return (
    <nav className={s.wrapper}>
     {
       props.onList ? <button className={'btn btn-warning'} onClick={()=>{props.showList()}}>Назад</button> 
       : 
       <button 
      className={`btn btn-primary ${s.btnCreateList}`}
      onClick={()=>{props.sCreateList()}}
      >Создать список</button>
     }

      <div className={s.centerControls}>
        <NavLink to={'lists'} className={"btn btn-secondary"}>{`Списки ${props.data.length}`}</NavLink>
        <NavLink to={'plans'} className={"btn btn-secondary"}>{`Запланировано ${plan()}`}</NavLink>
        <NavLink to={'/'} className={"btn btn-secondary"}>{`Сегодня ${0}`}</NavLink>
      </div>

      <div className={s.rightControls}>
        
        {
          !props.onList ? 
          <button className={"btn btn-secondary"} onClick={()=>{props.setDisplay()}}>

          { !props.display ? <ListTask /> : <Grid/> }
          </button> 
         :
          <button disabled={true} className={"btn btn-secondary"}>
          { !props.display ? <ListTask /> : <Grid/> }
          </button>
        }

        <button className={"btn btn-secondary"}>
          <Check2 />
        </button>

        {
          !props.onList ? 
          <button 
          className={"btn btn-secondary"}
          onClick={()=>{ 
            props.showSearch();
            if(props.onSearch){
              api.getAllList().then((res) => {
                props.setData(res.reverse());
              });
            }
          }}>
            <Search />
          </button>
          :
          <button 
          disabled={true}
          className={"btn btn-secondary"}>
            <Search />
          </button>
        }
       
        <input type="text" 
        className={`${props.onSearch ? s.onSearch : s.offSearch} form-control`} 
        placeholder={"Найти"}
        onChange={(e)=>{searchLists(e)}}
        />
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    display: state.display,
    onList: state.onList,
    onSearch: state.onSearch
  };
};

export default connect(mapStateToProps, actions)(HeaderNavMenu);
