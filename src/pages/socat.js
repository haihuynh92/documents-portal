import { danhSachTatCaCoSoMay } from "actions/cosomay";
import { danhSachTatCaMaHang } from "actions/mahang";
import { danhSachSoCat } from "actions/socat";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSach from "components/SoCat/DanhSach";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Socat = () => {
  const dispatch = useDispatch();
  const DSSoCat = useSelector((state) => state.soCatReduder);
  const DSMaHang = useSelector((state) => state.homeReducer.dsmahang);
  const DSCoSoMay = useSelector((state) => state.homeReducer.dscosomay);
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
    dispatch(danhSachSoCat(pagingState));
  }, [dispatch, pagingState]);

  useMemo(() => {
    dispatch(danhSachTatCaMaHang());
    dispatch(danhSachTatCaCoSoMay());
  }, [dispatch]);

  // const onSearchMaHang = (keySearch) => {
  //   dispatch(timKiemTH(keySearch, {
  //     page: 1,
  //     limit: DSMahang.data.pagination?._limit
  //   }));
  // }

  return (
    <div className="wrapper-container">
      <SideBar />

      <div className="main-content">
        <Header />
        <div className="outer">
          <Container fluid>
            <DanhSach
              DSMaHang={DSMaHang}
              DSCoSoMay={DSCoSoMay}
              DSSC={DSSoCat.data}
              infoPag={DSSoCat.data.pagination}
              handlePaging={handlePaging}
              // onSearchMH={onSearchMaHang}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Socat;
