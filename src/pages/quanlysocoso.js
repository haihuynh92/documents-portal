import { danhSachTatCaMaHang } from "actions/mahang";
import { danhSachThongTinSCS, filterThongTinSCS } from "actions/socoso";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSachThongTinCS from "components/SoCoSo/DanhSach";
import { ROLE } from "constant/currentUser";
import * as pathNameTypes from 'constant/pathName';
import _ from 'lodash';
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const QuanLySoCoSo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const DSThongTinSCS = useSelector((state) => state.soCoSoReducer);
  const DSMaHang = useSelector((state) => state.homeReducer.dsmahang);
  const showMenu = useSelector((state) => state.menuReduder);
  let isTypeBook = '';

  let dataListGroupBy = null;
  if (DSThongTinSCS.data && !!DSThongTinSCS.data.length) {
    dataListGroupBy = _.groupBy(DSThongTinSCS.data, 'ngaynhap');
  }

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(danhSachTatCaMaHang());
  }, [dispatch]);

  let nameArr = '';
  if (history.location.pathname === pathNameTypes.SO_NGUYET) {
    nameArr = 'songuyets';
    isTypeBook = ROLE.SO_MAY;
  } else if (history.location.pathname === pathNameTypes.SO_QUYEN) {
    nameArr = 'soquyens';
    isTypeBook = ROLE.SO_MAY;
  } else if (history.location.pathname === pathNameTypes.SO_DIEM) {
    nameArr = 'sodiems';
    isTypeBook = ROLE.SO_MAY;
  } else if (history.location.pathname === pathNameTypes.SO_CHU_SANH) {
    nameArr = 'sochusanhs';
    isTypeBook = ROLE.SO_MAY;
  } else if (history.location.pathname === pathNameTypes.SO_CHI_PHUONG) {
    nameArr = 'sochiphuongs';
    isTypeBook = ROLE.SO_MAY;
  } else if (history.location.pathname === pathNameTypes.SO_CHI_DUYEN) {
    nameArr = 'sochiduyens';
    isTypeBook = ROLE.SO_MAY;
  } else if (history.location.pathname === pathNameTypes.SO_PHUONG_ANH) {
    nameArr = 'sophuonganhs';
    isTypeBook = ROLE.SO_MAY;
  } else if (history.location.pathname === pathNameTypes.SO_CHI_HA) {
    nameArr = 'sochihas';
    isTypeBook = ROLE.SO_MAY;
  } else if (history.location.pathname === pathNameTypes.SO_THUY_VINH) {
    nameArr = 'sothuyvinhs';
    isTypeBook = ROLE.SO_MAY;
  } else if (history.location.pathname === pathNameTypes.SO_THUY_KET_CHAU) {
    nameArr = 'sothuyketchaus';
    isTypeBook = ROLE.SO_KET;
  } else if (history.location.pathname === pathNameTypes.SO_CHI_TIM) {
    nameArr = 'sochitims';
    isTypeBook = ROLE.SO_MAY;
  }

  const refreshSCS = () => {
    dispatch(danhSachThongTinSCS(nameArr));
  }

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(danhSachThongTinSCS(nameArr));
  }, [dispatch, nameArr]);

  const filterDate = (arrDate)  => {
    dispatch(filterThongTinSCS(arrDate, nameArr));
  }

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
              filterDate={filterDate}
              refreshSCS={refreshSCS}
              isTypeBook={isTypeBook}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default QuanLySoCoSo;
