import { danhSachTatCaMaHang } from "actions/mahang";
import "antd/dist/antd.css";
import Footer from 'components/common/Footer/Footer';
import Header from 'components/common/Header/Header';
import SideBar from 'components/common/SideBar/SideBar';
import Dashboard from 'components/Dashboard/Dashboard';
import { CURRENT_USER } from 'constant/currentUser';
import * as pathNameTypes from 'constant/pathName';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  let [currentUser, setCurrentUser] = useState(null);
  const showMenu = useSelector((state) => state.menuReduder);
  const dsmahang = useSelector((state) => state.homeReducer).dsmahang;
  let getUser = localStorage.getItem(CURRENT_USER);
  
  useEffect(() => {
    window.scrollTo(0,0);
    setCurrentUser(getUser);
    if (getUser === null) {
      window.location.href = pathNameTypes.LOGIN;
      return;
    }
  }, [getUser]);

  useEffect(() => {
    dispatch(danhSachTatCaMaHang());
  }, [dispatch]);

  return !!currentUser && (
    <div className="wrapper-container">
      <SideBar classEle={`${showMenu ? 'full-sidebar' : ''}`} />

      <div className={`main-content ${showMenu ? 'full-content' : ''}`}>
        <Header />
        <div className="outer">
          <Dashboard currentUser={currentUser} dsmahang={dsmahang} />
        </div>
        <Footer />
      </div>
      
    </div>
  );
}

export default HomePage;