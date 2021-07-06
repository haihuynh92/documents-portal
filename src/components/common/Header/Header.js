import React from 'react';
import './Header.scss';
import { Button, OverlayTrigger, Popover, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CURRENT_USER } from 'constant/currentUser';

const Header = (props) => {
  let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
  const { firstName, lastName, email } = currentUser;
  const fslice = firstName.slice(0, 1).toUpperCase();
  const lslice = lastName.slice(0, 1).toLowerCase();
  
  return (
    <header>
      <Container fluid className="inner d-flex-between">
        <Button variant="default" className="btn-menu">
          <i className="fa fa-bars"></i>
        </Button>
        <p className="ttl-help">Tôi giúp gì cho bạn đây! {currentUser.firstName}</p>
        <div className="avatar">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            rootClose={true}
            overlay={
              <Popover id="popover-profile" className="info-user">
                <Popover.Title as="h3">Thông tin của bạn</Popover.Title>
                <Popover.Content>
                  <ul>
                    <li>
                      <p>
                        <i className="fa fa-user" aria-hidden="true"></i>
                        {firstName} {lastName}
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        {email}
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        HCM City, Việt Nam
                      </p>
                    </li>
                    <li className="logout">
                      <Link to="/login">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </Popover.Content>
              </Popover>
            }
          >
            <Button variant="default" className="btn-user">{fslice}{lslice}</Button>
          </OverlayTrigger>
        </div>
      </Container>
    </header>
  );
};

export default Header;