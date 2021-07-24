import { danhSachTatCaCoSoMay } from "actions/cosomay";
import { danhSachTatCaMaHang } from "actions/mahang";
import { danhSachSoCat, timKiemSC } from "actions/socat";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSach from "components/SoCat/DanhSach";
import { LIMIT_ITEM } from "constant/currentUser";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const SoCat = () => {
  const dispatch = useDispatch();
  const DSSoCat = useSelector((state) => state.soCatReduder);
  const DSMaHang = useSelector((state) => state.homeReducer.dsmahang);
  const DSCoSoMay = useSelector((state) => state.homeReducer.dscosomay);
  const showMenu = useSelector((state) => state.menuReduder);
  
  const [pagingState, setPagingState] = useState({
    page: 1,
    limit: LIMIT_ITEM
  });
  const handlePaging = (currPage) => {
    setPagingState({
      ...pagingState,
      page: currPage
    });
  };

  const [dataSearch, seDataSearch] = useState({});

  useEffect(() => {
    dispatch(danhSachTatCaMaHang());
    dispatch(danhSachTatCaCoSoMay());
  }, [dispatch]);

  useEffect(() => {
    if ((dataSearch.ngaycat && !!dataSearch.ngaycat.length) || !!dataSearch.mahangId || !!dataSearch.cosomayId) {
      dispatch(timKiemSC(dataSearch, pagingState));
    }
    if (dataSearch.ngaycat === null && !dataSearch.mahangId && !dataSearch.cosomayId) {
      dispatch(danhSachSoCat(pagingState));
    }
  }, [dispatch, pagingState, dataSearch]);
  
  // search pagination
  const onSearchSoCat = (data) => {
    seDataSearch(data);
  }

  return (
    <div className="wrapper-container">
      <SideBar classEle={`${showMenu ? 'full-sidebar' : ''}`} />

      <div className={`main-content ${showMenu ? 'full-content' : ''}`}>
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
