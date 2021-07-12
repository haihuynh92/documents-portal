import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './SideBar.scss';

const SideBar = () => {

  const history = useHistory();

  return (
    <div className="side-bar-block">
      <h1 className="ttl-side-bar">
        <i className="fa fa-industry mr-3"></i>
        XƯỞNG MAY
      </h1>
      <Link to="/" className="link-dashboard">
        <i className="fa fa-tachometer mr-2"></i>
        Dashboard
      </Link>
      <div className="inner">
        <h2 className="ttl-article">Quản lý hàng</h2>
        <ul className="list-menu">
          <li className={`${history.location.pathname === "/danhsachmahang" ? "active" : ""}`}>
            <Link to="/danhsachmahang">
              <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
              Mã hàng
            </Link>
          </li>
          <li className={`${history.location.pathname === "/danhsachcosomay" ? "active" : ""}`}>
            <Link to="/danhsachcosomay">
              <i className="fa fa-address-book mr-2"></i>
              Cơ sở may
            </Link>
          </li>
          <li className={`${history.location.pathname === "/socat" ? "active" : ""}`}>
            <Link to="/socat">
              <i className="fa fa-book mr-2"></i>
              Sổ cắt
            </Link>
          </li>
        </ul>
        <h2 className="ttl-article">Quản lý khách</h2>
        <ul className="list-menu">
          <li className={`${history.location.pathname === "/quanlykhachso1" ? "active" : ""}`}>
            <Link to="/quanlykhachso1">
              <i className="fa fa-newspaper-o mr-2" aria-hidden="true"></i>
              Sổ hàng Thùy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;