import { BackTop } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from 'components/common/Loading/Loading';
import * as pathNameTypes from 'constant/pathName';
import 'font-awesome/css/font-awesome.min.css';
import DSCoSoMay from 'pages/cosomay';
import HomePage from 'pages/index';
import LoginPage from 'pages/login';
import DSMaHang from 'pages/mahang';
import NotFoundPage from 'pages/notfound';
import QuanLyKhachHang from 'pages/quanlykhachhang';
import QuanLySoCoSo from 'pages/quanlysocoso';
import SoCat from 'pages/socat';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>

        <Switch>
          <Route path={pathNameTypes.LOGIN} component={LoginPage} />
          <Route path={pathNameTypes.HOMEPAGE} exact component={HomePage} />
          <Route path={pathNameTypes.DS_MA_HANG} component={DSMaHang} />
          <Route path={pathNameTypes.DS_CO_SO_MAY} component={DSCoSoMay} />
          <Route path={pathNameTypes.SO_CAT} component={SoCat} />
          <Route path={pathNameTypes.SO_HANG_THUY} component={QuanLyKhachHang} />
          <Route path={pathNameTypes.SO_HANG} component={QuanLyKhachHang} />
          <Route path={pathNameTypes.SO_LINH} component={QuanLyKhachHang} />
          <Route path={pathNameTypes.SO_THAO} component={QuanLyKhachHang} />
          <Route path={pathNameTypes.SO_LINHBAVAN} component={QuanLyKhachHang} />
          <Route path={pathNameTypes.SO_KIM} component={QuanLyKhachHang} />
          <Route path={pathNameTypes.SO_NGHI} component={QuanLyKhachHang} />
          <Route path={pathNameTypes.SO_UT} component={QuanLyKhachHang} />
          <Route path={pathNameTypes.SO_NGOC} component={QuanLyKhachHang} />
          <Route path={pathNameTypes.SO_NGUYET} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_QUYEN} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_DIEM} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_CHU_SANH} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_CHI_PHUONG} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_CHI_DUYEN} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_PHUONG_ANH} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_CHI_HA} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_THUY_VINH} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_THUY_KET_CHAU} component={QuanLySoCoSo} />
          <Route path={pathNameTypes.SO_CHI_TIM} component={QuanLySoCoSo} />
          <Route component={NotFoundPage} />
        </Switch>
        
      </BrowserRouter>

      <BackTop visibilityHeight={100} />
      <Loading />
      <ToastContainer />

    </div>

  );
}

export default App;
