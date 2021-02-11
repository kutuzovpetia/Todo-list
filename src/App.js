import React, { useEffect } from "react";
import s from "./App.module.scss";
import HeaderNavMenu from "./components/header-nav-menu";
import "bootstrap/dist/css/bootstrap.min.css";
import Content from "./components/content";
import { connect } from "react-redux";
import ApiService from "./service-api";
import * as actions from './action';
import { Redirect } from 'react-router-dom'

function App(props) {

  useEffect(() => {
    const api = new ApiService();
    api.getAllList().then((res) => {
      props.setData(res.reverse());
    });
  });

  return (
    <div className={s.App}>
      <Redirect to="lists"/>
      <HeaderNavMenu />
      <Content></Content>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showCreateList: state.showCreateList,
  };
};

export default connect(mapStateToProps, actions)(App);
