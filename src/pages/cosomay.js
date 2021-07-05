import Footer from 'components/common/Footer/Footer';
import Header from 'components/common/Header/Header';
import SideBar from 'components/common/SideBar/SideBar';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import DanhSach from 'components/CoSoMay/DanhSach';
import { useDispatch, useSelector } from 'react-redux';
import { DanhSachCoSoMay } from 'actions/cosomay';

const CoSoMay = () => {

  const dispatch = useDispatch();
  const DSCoSoMay = useSelector(state => state.coSoMayReducer);

  useEffect(() => {
    
    dispatch(DanhSachCoSoMay());

  }, [dispatch]);



  return (
    <div className="wrapper-container">
      <SideBar />

      <div className="main-content">
        <Header/>
        <div className="outer">
          <Container fluid>
            <DanhSach listCSM={DSCoSoMay} />
          </Container>
        </div>
        <Footer />
      </div>
      
    </div>
  );
};

export default CoSoMay;