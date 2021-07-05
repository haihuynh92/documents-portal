import { CURRENT_USER } from 'constant/currentUser';
import React, { useEffect, useState } from 'react';
import SideBar from 'components/common/SideBar/SideBar';
import Header from 'components/common/Header/Header';
import Dashboard from 'components/Dashboard/Dashboard';
import Footer from 'components/common/Footer/Footer';

const HomePage = () => {
  let [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let getUser = localStorage.getItem(CURRENT_USER);
    setCurrentUser(getUser);
    if (getUser === null) {
      window.location.href = '/login';
      return;
    }
  }, [currentUser]);

  return !!currentUser && (
    <div className="wrapper-container">
      <SideBar />

      <div className="main-content">
        <Header/>
        <div className="outer">
          <Dashboard />
        </div>
        <Footer />
      </div>
      
    </div>
  );
}

export default HomePage;