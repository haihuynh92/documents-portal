import { danhSachTatCaMaHang } from "actions/mahang";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import SideBar from "components/common/SideBar/SideBar";
import DanhSach from "components/KhachSo1/DanhSach";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import { danhSachKhachSo1 } from "actions/khachso1";

const QuanLyKhachSo1 = () => {
  const dispatch = useDispatch();
  const DSKS1 = useSelector((state) => state.khachSo1Reduder);
  const DSMaHang = useSelector((state) => state.homeReducer.dsmahang);

  let dataListKS1 = null;
  if (!!DSKS1.data.length) {
    dataListKS1 = _.groupBy(DSKS1.data, 'ngaygiao');
  }

  
  // console.log('data', Object.keys(dataListKS1));
  // console.log('sort', );

  
  // const [dataSearch, seDataSearch] = useState({});
  // const [pagingState, setPagingState] = useState({
  //   page: 1,
  //   limit: 2
  // });
  // const handlePaging = (currPage) => {
  //   setPagingState({
  //     ...pagingState,
  //     page: currPage
  //   });
  // };

  useEffect(() => {
    dispatch(danhSachTatCaMaHang());
    dispatch(danhSachKhachSo1());
    // dispatch(danhSachTatCaCoSoMay());
  }, [dispatch]);
  
  // useEffect(() => {
  //   if (!dataSearch.ngaycat && !dataSearch.mahangId) {
  //     dispatch(danhSachSoCat(pagingState));
  //   }
  //   if (!!dataSearch.ngaycat || !!dataSearch.mahangId) {
  //     dispatch(timKiemSC(dataSearch, pagingState));
  //   }
  // }, [dispatch, pagingState, dataSearch]);
  
  // // search pagination
  // const onSearchSoCat = (data) => {
  //   seDataSearch(data);
  // }

  // useEffect(() => {
  //   dispatch(timKiemSC(dataSearch, {
  //     page: 1,
  //     limit: pagingState.limit
  //   }));
  // }, [dispatch, dataSearch, pagingState.limit]);

  return (
    <div className="wrapper-container">
      <SideBar />

      <div className="main-content">
        <Header />
        <div className="outer">
          <Container fluid>
            <DanhSach
              DSMaHang={DSMaHang}
              // DSCoSoMay={DSCoSoMay}
              DSKS1={DSKS1}
              DSKS1Custom={dataListKS1}
              // infoPag={DSSoCat.data.pagination}
              // handlePaging={handlePaging}
              // onSearchSC={onSearchSoCat}
            />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default QuanLyKhachSo1;
