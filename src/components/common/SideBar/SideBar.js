import * as pathNameTypes from 'constant/pathName';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './SideBar.scss';

const SideBar = (props) => {

  const history = useHistory();

  return (
    <div className={`side-bar-block ${props.classEle}`}>
      <h1 className="ttl-side-bar">
        <i className="fa fa-industry mr-3"></i>
        <span className="sub-ttl">XƯỞNG MAY</span>
      </h1>
      <div className="outer">
        <Link to="/" className="link-dashboard" title="Dashboard">
          <i className="fa fa-tachometer mr-2"></i>
          <span className="sub-ttl">Dashboard</span>
        </Link>
        <div className="inner">
          <h2 className="ttl-article">Quản lý hàng</h2>
          <ul className="list-menu">
            <li className={`${history.location.pathname === pathNameTypes.DS_MA_HANG ? "active" : ""}`}>
              <Link to={pathNameTypes.DS_MA_HANG} title="Mã hàng">
                <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Mã hàng</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === pathNameTypes.DS_CO_SO_MAY ? "active" : ""}`}>
              <Link to={pathNameTypes.DS_CO_SO_MAY} title="Cơ sở may">
                <i className="fa fa-address-book mr-2"></i>
                <span className="sub-ttl">Cơ sở may</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === pathNameTypes.SO_CAT ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_CAT} title="Sổ cắt">
                <i className="fa fa-book mr-2"></i>
                <span className="sub-ttl">Sổ cắt</span>
              </Link>
            </li>
          </ul>
          <h2 className="ttl-article">Quản lý sổ khách</h2>
          <ul className="list-menu">
            <li className={`${history.location.pathname === pathNameTypes.SO_HANG_THUY ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_HANG_THUY} title="Sổ Hằng Thùy">
                <i className="fa fa-newspaper-o mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Hằng Thùy</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === pathNameTypes.SO_HANG ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_HANG} title="Sổ Hằng">
                <i className="fa fa-window-restore mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Hằng</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === pathNameTypes.SO_LINH ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_LINH} title="Sổ Linh">
                <i className="fa fa-briefcase mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Linh</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === pathNameTypes.SO_THAO ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_THAO} title="Sổ Thảo">
                <i className="fa fa-building-o mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Thảo</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === pathNameTypes.SO_LINHBAVAN ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_LINHBAVAN} title="Sổ Linh Ba Vân">
                <i className="fa fa-cubes mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Linh Ba Vân</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === pathNameTypes.SO_KIM ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_KIM} title="Sổ Kim">
                <i className="fa fa-file-text-o mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Kim</span>
              </Link>
            </li>
          </ul>
          <h2 className="ttl-article">Quản lý sổ nội bộ</h2>
          <ul className="list-menu">
            <li className={`${history.location.pathname === pathNameTypes.SO_NGHI ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_NGHI} title="Sổ Nghị Em">
                <i className="fa fa-trello mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Nghị Em</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === pathNameTypes.SO_UT ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_UT} title="Sổ Út Minh">
                <i className="fa fa-modx mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Út Minh</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === pathNameTypes.SO_NGOC ? "active" : ""}`}>
              <Link to={pathNameTypes.SO_NGOC} title="Sổ Bác Ngọc">
                <i className="fa fa-leanpub mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Bác Ngọc</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;