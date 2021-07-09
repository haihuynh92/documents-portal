import { danhSachTatCaCoSoMay } from "actions/cosomay";
import { danhSachTatCaMaHang } from "actions/mahang";
import "antd/dist/antd.css";
import Footer from 'components/common/Footer/Footer';
import Header from 'components/common/Header/Header';
import SideBar from 'components/common/SideBar/SideBar';
import Dashboard from 'components/Dashboard/Dashboard';
import { CURRENT_USER } from 'constant/currentUser';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  let [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let getUser = localStorage.getItem(CURRENT_USER);
    setCurrentUser(getUser);
    if (getUser === null) {
      window.location.href = '/login';
      return;
    }
  }, [dispatch, currentUser]);

  useMemo(() => {
    dispatch(danhSachTatCaMaHang());
    dispatch(danhSachTatCaCoSoMay());
  }, [dispatch]);

  return !!currentUser && (
    <div className="wrapper-container">
      <SideBar />

      <div className="main-content">
        <Header/>
        <div className="outer">
          <Dashboard />
        </div>
        <Footer />
      </div>
      
    </div>
  );
}

export default HomePage;