import { danhSachThongTin } from "actions/khachhang";
import { danhSachTatCaMaHang } from "actions/mahang";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSach from "components/KhachHang/DanhSach";
import { CURRENT_USER, ROLE } from "constant/currentUser";
import * as pathNameTypes from 'constant/pathName';
import _ from 'lodash';
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const QuanLyKhachHang = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem(CURRENT_USER);
  const DSKH = useSelector((state) => state.khachHangReduder);
  const DSMaHang = useSelector((state) => state.homeReducer.dsmahang);
  const showMenu = useSelector((state) => state.menuReduder);
  let isTypeBook = '';
  

  let dataListGroupBy = null;
  if (DSKH.data && !!DSKH.data.length) {
    dataListGroupBy = _.groupBy(DSKH.data, 'ngaynhap');
  }

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(danhSachTatCaMaHang());
  }, [dispatch]);

  let nameArr = '';
  if (history.location.pathname === pathNameTypes.SO_HANG_THUY) {
    nameArr = 'sohangthuys';
    isTypeBook = ROLE.SO_KHACH;
  } else if (history.location.pathname === pathNameTypes.SO_HANG) {
    nameArr = 'sohangs';
    isTypeBook = ROLE.SO_KHACH;
  } else if (history.location.pathname === pathNameTypes.SO_LINH) {
    nameArr = 'solinhs';
    isTypeBook = ROLE.SO_KHACH;
  } else if (history.location.pathname === pathNameTypes.SO_THAO) {
    nameArr = 'sothaos';
    isTypeBook = ROLE.SO_KHACH;
  } else if (history.location.pathname === pathNameTypes.SO_LINHBAVAN) {
    nameArr = 'solinhbavans';
    isTypeBook = ROLE.SO_KHACH;
  } else if (history.location.pathname === pathNameTypes.SO_KIM) {
    nameArr = 'sokims';
    isTypeBook = ROLE.SO_KHACH;
  } else if (history.location.pathname === pathNameTypes.SO_NGHI) {
    nameArr = 'songhis';
    isTypeBook = ROLE.NOI_BO;
  } else if (history.location.pathname === pathNameTypes.SO_UT) {
    nameArr = 'souts';
    isTypeBook = ROLE.NOI_BO;
  } else if (history.location.pathname === pathNameTypes.SO_NGOC) {
    nameArr = 'songocs';
    isTypeBook = ROLE.NOI_BO;
  }

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(danhSachThongTin(nameArr));
  }, [dispatch, nameArr]);
  
  return (
    <div className="wrapper-container">
      <SideBar classEle={`${showMenu ? 'full-sidebar' : ''}`} />

      <div className={`main-content ${showMenu ? 'full-content' : ''}`}>
        <Header />
        <div className="outer">
          <Container fluid>
            <DanhSach
              currentUser={currentUser}
              nameArr={nameArr}
              DSMaHang={DSMaHang}
              DSKH={DSKH}
              DSKHGroupBy={dataListGroupBy}
              isTypeBook={isTypeBook}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default QuanLyKhachHang;
