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
        <Tooltip placement="rightBottom" title={CONFIG_SIDEBAR.DB[0]}>
          <Link to="/" className="link-dashboard">
            <i className="fa fa-tachometer mr-2"></i>
            <span className="sub-ttl">{CONFIG_SIDEBAR.DB[0]}</span>
          </Link>
        </Tooltip>
        <div className="inner">
          <Collapse accordion className="accordion-custom">
            <Panel header="Quản lý tổng hợp" key="1">
              <ul className="list-menu">
                <li className={`${history.location.pathname === pathNameTypes.DS_MA_HANG ? "active" : ""}`}>
                  <Tooltip placement="rightBottom" title={CONFIG_SIDEBAR.MH[0]}>
                    <Link to={pathNameTypes.DS_MA_HANG}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.MH[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.MH[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.DS_CO_SO_MAY ? "active" : ""}`}>
                  <Tooltip placement="rightBottom" title={CONFIG_SIDEBAR.CSM[0]}>
                    <Link to={pathNameTypes.DS_CO_SO_MAY}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.CSM[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.CSM[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CAT ? "active" : ""}`}>
                  <Tooltip placement="rightBottom" title={CONFIG_SIDEBAR.SC[0]}>
                    <Link to={pathNameTypes.SO_CAT}>
                      <i className="icon mr-2">{CONFIG_SIDEBAR.SC[1]}</i>
                      <span className="sub-ttl">{CONFIG_SIDEBAR.SC[0]}</span>
                    </Link>
                  </Tooltip>
                </li>
              </ul>
            </Panel>

            <Panel header="Quản lý sổ lương" key="2">
              <ul className="list-menu">
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_TRINH ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_TRINH} title="sổ tiền Trinh">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Trinh</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_DONG ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_DONG} title="sổ tiền Đông">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Đông</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_PHIEN ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_PHIEN} title="sổ tiền Phiên">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Phiên</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_SI ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_SI} title="sổ tiền Sĩ">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sĩ</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_HANH ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_HANH} title="sổ tiền Hạnh">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Hạnh</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_HOANG ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_HOANG} title="sổ tiền Hoàng">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Hoàng</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_NGUYET ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_NGUYET} title="sổ tiền Nguyệt">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Nguyệt</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_QUE ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_QUE} title="sổ tiền Quế">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Quế</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_KY ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_KY} title="sổ tiền Kỳ">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Kỳ</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_TIEN_DUONG ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_TIEN_DUONG} title="sổ tiền Dương">
                    <i className="fa fa-id-card mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Dương</span>
                  </Link>
                </li>
              </ul>
            </Panel>

            <Panel header="Quản lý sổ khách" key="3">
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
            </Panel>

            <Panel header="Quản lý sổ nội bộ" key="4">
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
            </Panel>

            <Panel header="Quản lý sổ cơ sở" key="5">
              <ul className="list-menu">
                <li className={`${history.location.pathname === pathNameTypes.SO_NGUYET ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_NGUYET} title="Sổ Nguyệt">
                    <i className="fa fa-sliders mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ Nguyệt</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_QUYEN ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_QUYEN} title="Sổ Quyên">
                    <i className="fa fa-life-ring mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ Quyên</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_DIEM ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_DIEM} title="Sổ Diễm">
                    <i className="fa fa-indent mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ Diễm</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHU_SANH ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_CHU_SANH} title="Sổ chú Sanh">
                    <i className="fa fa-dropbox mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ chú Sanh</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHI_PHUONG ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_CHI_PHUONG} title="Sổ chị Phượng">
                    <i className="fa fa-joomla mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ chị Phượng</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHI_DUYEN ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_CHI_DUYEN} title="Sổ chị Duyên">
                    <i className="fa fa-pagelines mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ chị Duyên</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_PHUONG_ANH ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_PHUONG_ANH} title="Sổ Phương Anh">
                    <i className="fa fa-database mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ Phương Anh</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHI_HA ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_CHI_HA} title="Sổ chị Hà">
                    <i className="fa fa-stumbleupon mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ chị Hà</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_THUY_VINH ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_THUY_VINH} title="Sổ Thủy Vịnh">
                    <i className="fa fa-wpforms mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ Thủy Vịnh</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_THUY_KET_CHAU ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_THUY_KET_CHAU} title="Sổ Thủy kết châu">
                    <i className="fa fa-object-group mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ Thủy kết châu</span>
                  </Link>
                </li>
                <li className={`${history.location.pathname === pathNameTypes.SO_CHI_TIM ? "active" : ""}`}>
                  <Link to={pathNameTypes.SO_CHI_TIM} title="Sổ chị Tím">
                    <i className="fa fa-server mr-2" aria-hidden="true"></i>
                    <span className="sub-ttl">Sổ chị Tím</span>
                  </Link>
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