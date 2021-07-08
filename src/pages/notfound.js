import SideBar from 'components/common/SideBar/SideBar';
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';
import React from 'react';
import { Container } from 'react-bootstrap';

const notfound = () => {
  return (
    <div>
      <SideBar />

      <div className="main-content">
        <Header />
        <div className="outer">
          <Container fluid>
            <div className="not-found-page">
              <div className="inner">
                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                <p>Không tìm thấy đường dẫn!</p>
                <p>404 - Not Found</p>
              </div>
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default notfound;