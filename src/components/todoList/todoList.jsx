import React, {useState} from "react";
import s from "./style.module.scss";
import { Plus } from "react-bootstrap-icons";
import * as actions from "../../action";
import { connect } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from '../accordion-item';
import ApiService from "../../service-api";


const TodoList = (props) => {

  const [text, setText] = useState('');

  return (
    <div className={`${s.wrapper}`}>

      <div className={s.content}>

      <div className={s.input + ' d-flex'}>
          <button 
            className="btn btn-success" 
            onClick={async ()=>{
              if(!text){return}
              const api = new ApiService();
              const res = await api.addTask(props.obj.id, {title: text, note: '', date: '', priority: 'Нет'});
              if(await res){
                props.addItemToList(props.obj.id, {id: res.id, title: text, note: '', date: '', priority: 'Нет'}) 
                setText('');
              }
            }}>
            <Plus />
          </button>
          <input type="text" className='w-100' value={text} onChange={(e)=>{setText(e.target.value)}}/>
        </div>





        <Accordion className={s.Accordion}>
          {
            props.obj.lists.map((item)=>{
                return <AccordionItem 
                key={item.id} 
                id={item.id} 
                title={item.title} 
                objCard={props.obj} 
                getDeleteId={props.getDeleteId}
                priority={item.priority}
                note={item.note}
                date={item.date}
                done={item.done}
                />
            })
          }
        </Accordion>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps, actions)(TodoList);
