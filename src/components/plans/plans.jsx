import React, {useState} from 'react';
import s from './style.module.scss';
import { connect } from "react-redux";
import * as actions from '../../action.js';

const Plans = (props) =>{

    
   //Функция возвращает масив спланированых обьектов
   const plansArr = (data) =>{
    let d = [];
    const plans = data.map((item)=>{
        item.lists.map((it)=>{
           if(it.date){
               d.push(it);
           }
        })
    })
    return d;
   }


   return(
       
       <div className={s.wrapper}>
           {
             plansArr(props.data).map((item)=>{
                  return(
                    <div key={item.id} className={`${s.item}`}>
                        <h5>{item.title}</h5>
                        <h5>{item.date}</h5>
                    </div>
                  )
              })
          }
       </div>
   )
}

const mapStateToProps = (state) => {
    return {
      data: state.data,
    };
  };
  
export default connect(mapStateToProps, actions)(Plans);