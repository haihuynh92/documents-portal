import { danhSachCoSoMay } from 'actions/cosomay';
import Footer from 'components/common/Footer/Footer';
import Header from 'components/common/Header/Header';
import SideBar from 'components/common/SideBar/SideBar';
import DanhSach from 'components/CoSoMay/DanhSach';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const CoSoMay = () => {
  const dispatch = useDispatch();
  const DSCoSoMay = useSelector(state => state.coSoMayReducer);
  const showMenu = useSelector((state) => state.menuReduder);

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(danhSachCoSoMay());
  }, [dispatch]);

  return (
    <div className="wrapper-container">
      <SideBar classEle={`${showMenu ? 'full-sidebar' : ''}`} />

      <div className={`main-content ${showMenu ? 'full-content' : ''}`}>
        <Header />
        <div className="outer">
          <Container fluid>
            <DanhSach DSCSM={DSCoSoMay.data} />
          </Container>
        </div>
        <Footer />
      </div>
      
    </div>
  );
};

export default CoSoMay;