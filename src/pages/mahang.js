import { danhSachMaHang } from "actions/mahang";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSach from "components/MaHang/DanhSach";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Mahang = () => {
  const dispatch = useDispatch();
  const DSMahang = useSelector((state) => state.maHangReducer);
  const [pagingState, setPagingState] = useState({
    page: 1,
    limit: 2
  });

  const handlePaging = (currPage) => {
    setPagingState({
      ...pagingState,
      page: currPage
    });
  };

  useEffect(() => {
    dispatch(danhSachMaHang(pagingState));
  }, [dispatch, pagingState]);

  const onSearchMaHang = (formSearchValue) => {
    console.log(formSearchValue);
  }

  return (
    <div className="wrapper-container">
      <SideBar />

      <div className="main-content">
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
