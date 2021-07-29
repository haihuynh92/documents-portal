import { danhSachTienLuong } from "actions/sotienluong";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSachThongTinTienLuong from "components/SoTienLuong/DanhSach";
import * as pathNameTypes from 'constant/pathName';
import _ from 'lodash';
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const QuanLySoCoSo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const DSThongTinTL = useSelector((state) => state.soTienLuongReduder);
  const showMenu = useSelector((state) => state.menuReduder);

  let dataListGroupBy = null;
  if (DSThongTinTL.data && !!DSThongTinTL.data.length) {
    dataListGroupBy = _.groupBy(DSThongTinTL.data, 'ngaynhap');
  }

  let nameArr = '';
  if (history.location.pathname === pathNameTypes.SO_TIEN_TRINH) {
    nameArr = 'sotienluongtrinhs';
  }

  // const refreshSCS = () => {
  //   dispatch(danhSachThongTinSCS(nameArr));
  // }

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(danhSachTienLuong(nameArr));
  }, [dispatch, nameArr]);

  // const filterDate = (arrDate)  => {
  //   dispatch(filterThongTinSCS(arrDate, nameArr));
  // }

  return (
    <div className="wrapper-container">
      <SideBar classEle={`${showMenu ? 'full-sidebar' : ''}`} />

      <div className={`main-content ${showMenu ? 'full-content' : ''}`}>
        <Header />
        <div className="outer">
          <Container fluid>
            <DanhSachThongTinTienLuong
              nameArr={nameArr}
              DSThongTinTL={DSThongTinTL}
              DSTLGroupBy={dataListGroupBy}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default QuanLySoCoSo;
