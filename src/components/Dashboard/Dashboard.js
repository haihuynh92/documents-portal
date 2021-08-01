import { danhSachTatCaTrongNam, danhSachTatCaTrongThang } from "actions/kiemtraloinhuan";
import LoiNhuanHangNam from "components/LoiNhuanHangNam/LoiNhuanHangNam";
import LoiNhuanHangThang from 'components/LoiNhuanHangThang/LoiNhuanHangThang';
import { CONFIG_MONEY, ROLE } from 'constant/currentUser';
import _ from 'lodash';
import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = (props) => {
  const { dsmahang, currentUser } = props;
  const dispatch = useDispatch();
  const loiNhuan = useSelector((state) => state.kiemTraLoiNhuanReduder);
  const { dataInMonth, dataInYear } = loiNhuan;

  // ==============================lợi nhuận hàng tháng
  let objSumMonth = {
    sumSLGiaoInMonth: 0,
    sumLN1InMonth: 0,
    sumLN2InMonth: 0,
    sumSLFailInMonth: 0,
    sumMoneyFailInMonth: 0
  }

  if (!!dataInMonth.length) {
    for(let i = 0; i < dataInMonth.length; i++) {
      let detailMH = _.filter(dsmahang, (x) => {return x.id === dataInMonth[i].mahangId});
      if(dataInMonth[i]['thongtin'] === 'giaohang') {
        objSumMonth.sumSLGiaoInMonth += +dataInMonth[i].slgiao;
        objSumMonth.sumLN1InMonth += CONFIG_MONEY.default * dataInMonth[i].slgiao;
        objSumMonth.sumLN2InMonth += (detailMH[0].giagiao - detailMH[0].gianhap - CONFIG_MONEY.default) * dataInMonth[i].slgiao;
      }
      if(dataInMonth[i]['thongtin'] === 'hangloi') {
        objSumMonth.sumSLFailInMonth += +dataInMonth[i].slhu;
        objSumMonth.sumMoneyFailInMonth += +dataInMonth[i].slhu * detailMH[0].giagiao;
      }
    }
  }

  const getDSInMonth = (value) => {
    dispatch(danhSachTatCaTrongThang(value));
  }

  // ====================================lợi nhuận hàng năm
  let objSumYear = {
    sumSLGiaoInYear: 0,
    sumLN1InYear: 0,
    sumLN2InYear: 0,
    sumSLFailInYear: 0,
    sumMoneyFailInYear: 0
  }

  if (!!dataInYear.length) {
    for(let i = 0; i < dataInYear.length; i++) {
      let detailMH = _.filter(dsmahang, (x) => {return x.id === dataInYear[i].mahangId});
      if(dataInYear[i]['thongtin'] === 'giaohang') {
        objSumYear.sumSLGiaoInYear += +dataInYear[i].slgiao;
        objSumYear.sumLN1InYear += CONFIG_MONEY.default * dataInYear[i].slgiao;
        objSumYear.sumLN2InYear += (detailMH[0].giagiao - detailMH[0].gianhap - CONFIG_MONEY.default) * dataInYear[i].slgiao;
      }
      if(dataInYear[i]['thongtin'] === 'hangloi') {
        objSumYear.sumSLFailInYear += +dataInYear[i].slhu;
        objSumYear.sumMoneyFailInYear += +dataInYear[i].slhu * detailMH[0].giagiao;
      }
    }
  }

  const getDSInYear = (value) => {
    dispatch(danhSachTatCaTrongNam(value));
  }

  return (
    <div className="dashboard-content">
      <Container fluid>
        <Row className="sumary-block">
          <Col className="bgd col-cut-book" sm="2">
            <div className="inner">
              <p>
                <span className="ttl">Tổng cơ sở</span>
                <span className="number">9.832 người</span>
              </p>
              <Link to="/danhsachcosomay" className="link-detail" title="Chi tiết">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </Col>
          <Col className="bgd bgd-2" sm="2">
            <div className="inner">
              <p>
                <span className="ttl">{`Số lượng cắt`}</span>
                <span className="number">9.832 cái</span>
              </p>
              <Link to="/socat" className="link-detail" title="Chi tiết">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </Col>
          <Col className="bgd bgd-3" sm="2">
            <div className="inner">
              <p>
                <span className="ttl">Coming soon</span>
                <span className="number">???</span>
              </p>
              <Link to="/" className="link-detail" title="Chi tiết">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </Col>
          <Col className="bgd bgd-4" sm="2">
            <div className="inner">
              <p>
                <span className="ttl">Coming soon</span>
                <span className="number">???</span>
              </p>
              <Link to="/" className="link-detail" title="Chi tiết">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </Col>
          <Col className="bgd bgd-4" sm="2">
            <div className="inner">
              <p>
                <span className="ttl">Coming soon</span>
                <span className="number">???</span>
              </p>
              <Link to="/" className="link-detail" title="Chi tiết">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </Col>
          <Col className="bgd bgd-4" sm="2">
            <div className="inner">
              <p>
                <span className="ttl">Coming soon</span>
                <span className="number">???</span>
              </p>
              <Link to="/" className="link-detail" title="Chi tiết">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </Col>
        </Row>

        {JSON.parse(currentUser)?.role === ROLE.ADMIN &&
          <Row>
            <Col sm="6">
              <section className="show-info-money">
                <h2 className="title">
                  <i className="fa fa-calendar-check-o mr-2" aria-hidden="true"></i>
                  Kiểm tra lợi nhuận hàng tháng
                </h2>
                <div className="inner">
                  <LoiNhuanHangThang
                    dsInMonth={dataInMonth}
                    getDSInMonth={getDSInMonth}
                    objSumMonth={objSumMonth}
                  />
                </div>
              </section>
            </Col>

            <Col sm="6">
              <section className="show-info-money">
                <h2 className="title">
                  <i className="fa fa-clipboard mr-2" aria-hidden="true"></i>
                  Kiểm tra lợi nhuận hàng năm
                </h2>
                <div className="inner">
                  <LoiNhuanHangNam
                    dsInYear={dataInYear}
                    getDSInYear={getDSInYear}
                    objSumYear={objSumYear}
                  />
                </div>
              </section>
            </Col>
          </Row>
        }
      </Container>
    </div>
  );
};

export default Dashboard;