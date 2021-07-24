import { danhSachTatCaMaHang } from "actions/mahang";
import { danhSachThongTinSCS } from "actions/socoso";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSachThongTinCS from "components/SoCoSo/DanhSach";
import * as pathNameTypes from 'constant/pathName';
import _ from 'lodash';
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const QuanLySoCoSo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // let currentUser = localStorage.getItem(CURRENT_USER);
  const DSThongTinSCS = useSelector((state) => state.soCoSoReducer);
  const DSMaHang = useSelector((state) => state.homeReducer.dsmahang);
  const showMenu = useSelector((state) => state.menuReduder);
  // let isTypeBook = '';
  

  let dataListGroupBy = null;
  if (DSThongTinSCS.data && !!DSThongTinSCS.data.length) {
    dataListGroupBy = _.groupBy(DSThongTinSCS.data, 'ngaynhap');
  }

  useEffect(() => {
    dispatch(danhSachTatCaMaHang());
  }, [dispatch]);

  let nameArr = '';
  if (history.location.pathname === pathNameTypes.SO_NGUYET) {
    nameArr = 'songuyets';
  } else if (history.location.pathname === pathNameTypes.SO_QUYEN) {
    nameArr = 'soquyens';
  } else if (history.location.pathname === pathNameTypes.SO_DIEM) {
    nameArr = 'sodiems';
  } else if (history.location.pathname === pathNameTypes.SO_CHU_SANH) {
    nameArr = 'sochusanhs';
  } else if (history.location.pathname === pathNameTypes.SO_CHI_PHUONG) {
    nameArr = 'sochiphuongs';
  } else if (history.location.pathname === pathNameTypes.SO_CHI_DUYEN) {
    nameArr = 'sochiduyens';
  } else if (history.location.pathname === pathNameTypes.SO_PHUONG_ANH) {
    nameArr = 'sophuonganhs';
  } else if (history.location.pathname === pathNameTypes.SO_CHI_HA) {
    nameArr = 'sochihas';
  } else if (history.location.pathname === pathNameTypes.SO_THUY_VINH) {
    nameArr = 'sothuyvinhs';
  } else if (history.location.pathname === pathNameTypes.SO_THUY_KET_CHAU) {
    nameArr = 'sothuyketchaus';
  } else if (history.location.pathname === pathNameTypes.SO_CHI_TIM) {
    nameArr = 'sochitims';
  }

  useEffect(() => {
    dispatch(danhSachThongTinSCS(nameArr));
  }, [dispatch, nameArr]);
  
  return (
    <div className="wrapper-container">
      <SideBar classEle={`${showMenu ? 'full-sidebar' : ''}`} />

      <div className={`main-content ${showMenu ? 'full-content' : ''}`}>
        <Header />
        <div className="outer">
          <Container fluid>
            <DanhSachThongTinCS
              nameArr={nameArr}
              DSMaHang={DSMaHang}
              DSThongTinSCS={DSThongTinSCS}
              DSSCSGroupBy={dataListGroupBy}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default QuanLySoCoSo;
