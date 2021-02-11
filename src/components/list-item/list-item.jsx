import React from "react";
import s from "./style.module.scss";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import {TrashFill} from "react-bootstrap-icons"
import { connect } from 'react-redux';
import * as actions from '../../action';
import ApiService from '../../service-api';

const ItemList = (props) => {

 
  const deleteItem = async () => {
    const api = new ApiService();
    const res = await api.deleteById(props.id);
    return await res;
  }

  return (
    <Jumbotron  className={s.Jumbotron}>
      <Container className={'d-flex justify-content-between align-items-center'}>
        <h4>{props.title}</h4>
        <button 
        className='btn btn-danger' 
        onClick={async () => {
          const res = await deleteItem();
            if(await res){
              const api = new ApiService();
              api.getAllList().then((res) => {
              props.setData(res.reverse());
              });
            }
          }
        }
        ><TrashFill/></button>
      </Container>
    </Jumbotron>
  );
};

const mapStateToProps = (state) => {
    return {
      logining: state.accountLogin,
    };
};
  
export default connect(mapStateToProps, actions)(ItemList);
