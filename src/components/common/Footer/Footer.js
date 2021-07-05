import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <Container className="inner d-flex-between " fluid>
        <p>Bản quyền © 2021.</p>
        <p>Thiết kế bởi <span className="author">Hải Huỳnh</span></p>
      </Container>
    </footer>
  );
};

export default Footer;