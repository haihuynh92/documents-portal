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
        <h2 className="ttl-article">Quản lý</h2>
        <ul className="list-menu">
          <li className={`${history.location.pathname === "/cosomay" ? "active" : ""}`}>
            <Link to="/cosomay">
              <i className="fa fa-book mr-2"></i>
              Cơ sở may
            </Link>
          </li>
          <li>
            <Link to="/cutbook">
              <i className="fa fa-book mr-2"></i>
              Sổ cắt
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;