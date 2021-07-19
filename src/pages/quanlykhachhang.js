import { danhSachThongTin } from "actions/khachhang";
import { danhSachTatCaMaHang } from "actions/mahang";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSach from "components/KhachHang/DanhSach";
import * as pathNameTypes from 'constant/pathName';
import _ from 'lodash';
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const QuanLyKhachHang = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const DSKH = useSelector((state) => state.khachHangReduder);
  const DSMaHang = useSelector((state) => state.homeReducer.dsmahang);
  const showMenu = useSelector((state) => state.menuReduder);

  let dataListGroupBy = null;
  if (DSKH.data && !!DSKH.data.length) {
    dataListGroupBy = _.groupBy(DSKH.data, 'ngaynhap');
  }

  useEffect(() => {
    dispatch(danhSachTatCaMaHang());
  }, [dispatch]);

  let nameArr = '';
  if (history.location.pathname === pathNameTypes.SO_HANG_THUY) {
    nameArr = 'sohangthuys';
  } else if (history.location.pathname === pathNameTypes.SO_HANG) {
    nameArr = 'sohangs';
  } else if (history.location.pathname === pathNameTypes.SO_LINH) {
    nameArr = 'solinhs';
  } else if (history.location.pathname === pathNameTypes.SO_THAO) {
    nameArr = 'sothaos';
  } else if (history.location.pathname === pathNameTypes.SO_LINHBAVAN) {
    nameArr = 'solinhbavans';
  } else if (history.location.pathname === pathNameTypes.SO_KIM) {
    nameArr = 'sokims';
  }

  useEffect(() => {
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
              nameArr={nameArr}
              DSMaHang={DSMaHang}
              DSKH={DSKH}
              DSKHGroupBy={dataListGroupBy}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default QuanLyKhachHang;
