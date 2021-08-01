import { Collapse, Tooltip } from 'antd';
import { CONFIG_SIDEBAR } from 'constant/currentUser';
import * as pathNameTypes from 'constant/pathName';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './SideBar.scss';

const { Panel } = Collapse;

const SideBar = (props) => {

  const history = useHistory();

  return (
    <div className={`side-bar-block ${props.classEle}`}>
      <h1 className="ttl-side-bar">
        <i className="fa fa-industry mr-3"></i>
        <span className="sub-ttl">XƯỞNG MAY</span>
      </h1>
      <div className="outer">
        <Tooltip placement="rightBottom" title={CONFIG_SIDEBAR.DASHBOARDB[0]}>
          <Link to="/" className="link-dashboard">
            <i className="fa fa-tachometer mr-2"></i>
            <span className="sub-ttl">{CONFIG_SIDEBAR.DASHBOARDB[0]}</span>
          </Link>
        </Tooltip>
        <div className="inner">
          <Collapse accordion className="accordion-custom">
            <Panel header="Quản lý tổng hợp" key="1">
              <ul className="list-menu">
                <li className={`${history.location.pathname === pathNameTypes.DS_MA_HANG ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.MA_HANG[0]}>
                    <Link to={pathNameTypes.DS_MA_HANG}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.MA_HANG[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.MA_HANG[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.DS_CO_SO_MAY ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.CO_SO_MAY[0]}>
                    <Link to={pathNameTypes.DS_CO_SO_MAY}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.CO_SO_MAY[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.CO_SO_MAY[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CAT ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_CAT[0]}>
                    <Link to={pathNameTypes.SO_CAT}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_CAT[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_CAT[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
              </ul>
            </Panel>

            <Panel header="Quản lý sổ lương" key="2">
              <ul className="list-menu">
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_TRINH ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_TRINH[0]}>
                    <Link to={pathNameTypes.SO_LUONG_TRINH}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_TRINH[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_TRINH[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_DONG ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_DONG[0]}>
                    <Link to={pathNameTypes.SO_LUONG_DONG}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_DONG[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_DONG[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_PHIEN ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_PHIEN[0]}>
                    <Link to={pathNameTypes.SO_LUONG_PHIEN}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_PHIEN[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_PHIEN[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_SI ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_SI[0]}>
                    <Link to={pathNameTypes.SO_LUONG_SI}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_SI[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_SI[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_HANH ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_HANH[0]}>
                    <Link to={pathNameTypes.SO_LUONG_HANH}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_HANH[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_HANH[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_HOANG ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_HOANG[0]}>
                    <Link to={pathNameTypes.SO_LUONG_HOANG}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_HOANG[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_HOANG[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_NGUYET ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_NGUYET[0]}>
                    <Link to={pathNameTypes.SO_LUONG_NGUYET}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_NGUYET[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_NGUYET[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_QUE ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_QUE[0]}>
                    <Link to={pathNameTypes.SO_LUONG_QUE}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_QUE[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_QUE[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_KY ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_KY[0]}>
                    <Link to={pathNameTypes.SO_LUONG_KY}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_KY[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_KY[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LUONG_DUONG ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LUONG_DUONG[0]}>
                    <Link to={pathNameTypes.SO_LUONG_DUONG}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LUONG_DUONG[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LUONG_DUONG[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
              </ul>
            </Panel>

            <Panel header="Quản lý sổ khách" key="3">
              <ul className="list-menu">
                <li className={`${history.location.pathname === pathNameTypes.SO_HANG_THUY ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_HANG_THUY[0]}>
                    <Link to={pathNameTypes.SO_HANG_THUY}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_HANG_THUY[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_HANG_THUY[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_HANG ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_HANG[0]}>
                    <Link to={pathNameTypes.SO_HANG}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_HANG[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_HANG[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LINH ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LINH[0]}>
                    <Link to={pathNameTypes.SO_LINH}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LINH[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LINH[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_THAO ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_THAO[0]}>
                    <Link to={pathNameTypes.SO_THAO}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_THAO[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_THAO[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_LINHBAVAN ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_LINHBAVAN[0]}>
                    <Link to={pathNameTypes.SO_LINHBAVAN}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_LINHBAVAN[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_LINHBAVAN[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_KIM ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_KIM[0]}>
                    <Link to={pathNameTypes.SO_KIM}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_KIM[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_KIM[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
              </ul>
            </Panel>

            <Panel header="Quản lý sổ nội bộ" key="4">
              <ul className="list-menu">
                <li className={`${history.location.pathname === pathNameTypes.SO_NGHI ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_NGHI[0]}>
                    <Link to={pathNameTypes.SO_NGHI}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_NGHI[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_NGHI[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_UT ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_UT[0]}>
                    <Link to={pathNameTypes.SO_UT}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_UT[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_UT[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_NGOC ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_NGOC[0]}>
                    <Link to={pathNameTypes.SO_NGOC}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_NGOC[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_NGOC[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
              </ul>
            </Panel>

            <Panel header="Quản lý sổ cơ sở" key="5">
              <ul className="list-menu">
                <li className={`${history.location.pathname === pathNameTypes.SO_NGUYET ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_NGUYET[0]}>
                    <Link to={pathNameTypes.SO_NGUYET}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_NGUYET[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_NGUYET[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_QUYEN ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_QUYEN[0]}>
                    <Link to={pathNameTypes.SO_QUYEN}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_QUYEN[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_QUYEN[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_DIEM ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_DIEM[0]}>
                    <Link to={pathNameTypes.SO_DIEM}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_DIEM[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_DIEM[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHU_SANH ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_CHU_SANH[0]}>
                    <Link to={pathNameTypes.SO_CHU_SANH}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_CHU_SANH[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_CHU_SANH[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHI_PHUONG ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_CHI_PHUONG[0]}>
                    <Link to={pathNameTypes.SO_CHI_PHUONG}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_CHI_PHUONG[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_CHI_PHUONG[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHI_DUYEN ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_CHI_DUYEN[0]}>
                    <Link to={pathNameTypes.SO_CHI_DUYEN}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_CHI_DUYEN[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_CHI_DUYEN[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_PHUONG_ANH ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_PHUONG_ANH[0]}>
                    <Link to={pathNameTypes.SO_PHUONG_ANH}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_PHUONG_ANH[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_PHUONG_ANH[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHI_HA ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_CHI_HA[0]}>
                    <Link to={pathNameTypes.SO_CHI_HA}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_CHI_HA[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_CHI_HA[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_THUY_VINH ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_THUY_VINH[0]}>
                    <Link to={pathNameTypes.SO_THUY_VINH}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_THUY_VINH[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_THUY_VINH[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_THUY_KET_CHAU ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_THUY_KET_CHAU[0]}>
                    <Link to={pathNameTypes.SO_THUY_KET_CHAU}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_THUY_KET_CHAU[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_THUY_KET_CHAU[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHI_TIM ? "active" : ""}`}>
                  <Tooltip placement="rightTop" title={CONFIG_SIDEBAR.SO_CHI_TIM[0]}>
                    <Link to={pathNameTypes.SO_CHI_TIM}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SO_CHI_TIM[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SO_CHI_TIM[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
              </ul>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default SideBar;