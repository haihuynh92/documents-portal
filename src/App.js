import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from 'components/common/Loading/Loading';
import 'font-awesome/css/font-awesome.min.css';
import DSCoSoMay from 'pages/cosomay';
import HomePage from 'pages/index';
import LoginPage from 'pages/login';
import DSMaHang from 'pages/mahang';
import NotFoundPage from 'pages/notfound';
import SoCat from 'pages/socat';
import QuanLyKhachHang from 'pages/quanlykhachhang';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BackTop } from 'antd';

function App() {
  return (
    <div>
      <BrowserRouter>

        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" exact component={HomePage} />
          <Route path="/danhsachmahang" component={DSMaHang} />
          <Route path="/danhsachcosomay" component={DSCoSoMay} />
          <Route path="/socat" component={SoCat} />
          <Route path="/quanlykhach/sohangthuy" component={QuanLyKhachHang} />
          <Route path="/quanlykhach/sohang" component={QuanLyKhachHang} />
          <Route path="/quanlykhach/solinh" component={QuanLyKhachHang} />
          <Route path="/quanlykhach/sothao" component={QuanLyKhachHang} />
          <Route path="/quanlykhach/solinhbavan" component={QuanLyKhachHang} />
          <Route path="/quanlykhach/sokim" component={QuanLyKhachHang} />
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
