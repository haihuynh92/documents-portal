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
            <li className={`${history.location.pathname === "/danhsachmahang" ? "active" : ""}`}>
              <Link to="/danhsachmahang" title="Mã hàng">
                <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Mã hàng</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === "/danhsachcosomay" ? "active" : ""}`}>
              <Link to="/danhsachcosomay" title="Cơ sở may">
                <i className="fa fa-address-book mr-2"></i>
                <span className="sub-ttl">Cơ sở may</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === "/socat" ? "active" : ""}`}>
              <Link to="/socat" title="Sổ cắt">
                <i className="fa fa-book mr-2"></i>
                <span className="sub-ttl">Sổ cắt</span>
              </Link>
            </li>
          </ul>
          <h2 className="ttl-article">Quản lý sổ khách</h2>
          <ul className="list-menu">
            <li className={`${history.location.pathname === "/quanlykhach/sohangthuy" ? "active" : ""}`}>
              <Link to="/quanlykhach/sohangthuy" title="Sổ Hằng Thùy">
                <i className="fa fa-newspaper-o mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Hằng Thùy</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === "/quanlykhach/sohang" ? "active" : ""}`}>
              <Link to="/quanlykhach/sohang" title="Sổ Hằng">
                <i className="fa fa-window-restore mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Hằng</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === "/quanlykhach/solinh" ? "active" : ""}`}>
              <Link to="/quanlykhach/solinh" title="Sổ Linh">
                <i className="fa fa-briefcase mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Linh</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === "/quanlykhach/sothao" ? "active" : ""}`}>
              <Link to="/quanlykhach/sothao" title="Sổ Thảo">
                <i className="fa fa-building-o mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Thảo</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === "/quanlykhach/solinhbavan" ? "active" : ""}`}>
              <Link to="/quanlykhach/solinhbavan" title="Sổ Linh Ba Vân">
                <i className="fa fa-cubes mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Linh Ba Vân</span>
              </Link>
            </li>
            <li className={`${history.location.pathname === "/quanlykhach/sokim" ? "active" : ""}`}>
              <Link to="/quanlykhach/sokim" title="Sổ Kim">
                <i className="fa fa-file-text-o mr-2" aria-hidden="true"></i>
                <span className="sub-ttl">Sổ Kim</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;