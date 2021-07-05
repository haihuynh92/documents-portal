import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from 'components/common/Loading/Loading';
import 'font-awesome/css/font-awesome.min.css';
import CoSoMay from 'pages/cosomay';
import HomePage from 'pages/index';
import LoginPage from 'pages/login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>

        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" exact component={HomePage} />
          <Route path="/cosomay" component={CoSoMay} />
        </Switch>
        
      </BrowserRouter>

      <Loading />
      <ToastContainer />

    </div>

  );
}

export default App;
