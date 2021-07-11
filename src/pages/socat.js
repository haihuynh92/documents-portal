import { danhSachTatCaCoSoMay } from "actions/cosomay";
import { danhSachTatCaMaHang } from "actions/mahang";
import { danhSachSoCat, timKiemSC } from "actions/socat";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSach from "components/SoCat/DanhSach";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const SoCat = () => {
  const dispatch = useDispatch();
  const DSSoCat = useSelector((state) => state.soCatReduder);
  const DSMaHang = useSelector((state) => state.homeReducer.dsmahang);
  const DSCoSoMay = useSelector((state) => state.homeReducer.dscosomay);
  
  const [dataSearch, seDataSearch] = useState({});
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
    dispatch(danhSachTatCaMaHang());
    dispatch(danhSachTatCaCoSoMay());
  }, [dispatch]);
  
  useEffect(() => {
    if (!dataSearch.ngaycat && !dataSearch.mahangId) {
      dispatch(danhSachSoCat(pagingState));
    }
    if (!!dataSearch.ngaycat || !!dataSearch.mahangId) {
      dispatch(timKiemSC(dataSearch, pagingState));
    }
  }, [dispatch, pagingState, dataSearch]);
  
  // search pagination
  const onSearchSoCat = (data) => {
    seDataSearch(data);
  }

  useEffect(() => {
    dispatch(timKiemSC(dataSearch, {
      page: 1,
      limit: pagingState.limit
    }));
  }, [dispatch, dataSearch, pagingState.limit]);

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
              onSearchSC={onSearchSoCat}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SoCat;
