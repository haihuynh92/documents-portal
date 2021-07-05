import React from 'react';
import './Dashboard.scss'
import { Row, Col, Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <Container fluid>
        <Row className="sumary-block">
          <Col className="bgd col-cut-book" md="3">
            <div className="inner">
              <p>
                <span className="ttl">Tổng cơ sở</span>
                <span className="number">9.832 người</span>
              </p>
            </div>
          </Col>
          <Col className="bgd bgd-2" md="3">
            <div className="inner">
              <p>
                <span className="ttl">Số lượng cắt</span>
                <span className="number">9.832 cái</span>
              </p>
            </div>
          </Col>
          <Col className="bgd bgd-3" md="3">
            <div className="inner">
              <p>
                <span className="ttl">Coming soon</span>
                <span className="number">???</span>
              </p>
            </div>
          </Col>
          <Col className="bgd bgd-4" md="3">
            <div className="inner">
              <p>
                <span className="ttl">Coming soon</span>
                <span className="number">???</span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;