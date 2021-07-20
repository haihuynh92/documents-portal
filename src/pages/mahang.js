import { danhSachMaHang, timKiemTH } from "actions/mahang";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSach from "components/MaHang/DanhSach";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Mahang = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.menuReduder);
  const DSMahang = useSelector((state) => state.maHangReducer);
  const [pagingState, setPagingState] = useState({
    page: 1,
    limit: 2
  });
  const [keySearch, seKeySearch] = useState('');
  const handlePaging = (currPage) => {
    setPagingState({
      ...pagingState,
      page: currPage
    });
  };

  useEffect(() => {
    if (!keySearch) {
      dispatch(danhSachMaHang(pagingState));
    } else {
      dispatch(timKiemTH(keySearch, pagingState));
    }
  }, [dispatch, pagingState, keySearch]);

  const onSearchMaHang = (value) => {
    seKeySearch(value);
  }
  useEffect(() => {
    if (!!keySearch) {
      dispatch(timKiemTH(keySearch, {
        page: 1,
        limit: pagingState.limit
      }));
    }
  }, [dispatch, keySearch, pagingState.limit]);

  return (
    <div className="wrapper-container">
      <SideBar classEle={`${showMenu ? 'full-sidebar' : ''}`} />

      <div className={`main-content ${showMenu ? 'full-content' : ''}`}>
        <Header />
        <div className="outer">
          <Container fluid>
            <DanhSach
              DSMH={DSMahang.data}
              infoPag={DSMahang.data.pagination}
              handlePaging={handlePaging}
              onSearchMH={onSearchMaHang}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Mahang;
