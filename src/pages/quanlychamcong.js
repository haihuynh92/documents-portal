import { danhSachChamCong, filterChamCong } from "actions/sochamcong";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSachThongTinTienLuong from "components/SoChamCong/DanhSach";
import * as pathNameTypes from 'constant/pathName';
import _ from 'lodash';
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const QuanLyChamCong = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const DSChamCong = useSelector((state) => state.soChamCongReduder);
  const showMenu = useSelector((state) => state.menuReduder);

  let dataListGroupBy = null;
  if (DSChamCong.data && !!DSChamCong.data.length) {
    dataListGroupBy = _.groupBy(DSChamCong.data, 'ngaynhap');
  }

  let nameArr = '';
  if (history.location.pathname === pathNameTypes.SO_TIEN_TRINH) {
    nameArr = 'sotienluongtrinhs';
  } else if (history.location.pathname === pathNameTypes.SO_TIEN_DONG) {
    nameArr = 'sotienluongdongs';
  } else if (history.location.pathname === pathNameTypes.SO_TIEN_PHIEN) {
    nameArr = 'sotienluongphiens';
  } else if (history.location.pathname === pathNameTypes.SO_TIEN_SI) {
    nameArr = 'sotienluongsis';
  } else if (history.location.pathname === pathNameTypes.SO_TIEN_HANH) {
    nameArr = 'sotienluonghanhs';
  } else if (history.location.pathname === pathNameTypes.SO_TIEN_HOANG) {
    nameArr = 'sotienluonghoangs';
  } else if (history.location.pathname === pathNameTypes.SO_TIEN_NGUYET) {
    nameArr = 'sotienluongnguyets';
  } else if (history.location.pathname === pathNameTypes.SO_TIEN_QUE) {
    nameArr = 'sotienluongques';
  } else if (history.location.pathname === pathNameTypes.SO_TIEN_KY) {
    nameArr = 'sotienluongkys';
  } else if (history.location.pathname === pathNameTypes.SO_TIEN_DUONG) {
    nameArr = 'sotienluongduongs';
  }

  const refreshSTL = () => {
    dispatch(danhSachChamCong(nameArr));
  }

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(danhSachChamCong(nameArr));
  }, [dispatch, nameArr]);

  const filterDate = (arrDate)  => {
    dispatch(filterChamCong(arrDate, nameArr));
  }

  return (
    <div className="wrapper-container">
      <SideBar classEle={`${showMenu ? 'full-sidebar' : ''}`} />

      <div className={`main-content ${showMenu ? 'full-content' : ''}`}>
        <Header />
        <div className="outer">
          <Container fluid>
            <DanhSachThongTinTienLuong
              nameArr={nameArr}
              DSChamCong={DSChamCong}
              DSTLGroupBy={dataListGroupBy}
              refreshSTL={refreshSTL}
              filterDate={filterDate}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default QuanLyChamCong;
