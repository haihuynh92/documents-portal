import { yupResolver } from '@hookform/resolvers/yup';
import { CURRENT_USER } from 'constant/currentUser';
import * as pathNameTypes from 'constant/pathName';
import { find } from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "styles/common.scss";
import * as yup from 'yup';

const LoginPage = () => {
  let validationSchema = yup.object().shape({
    email: yup.string()
      .required()
      .email('Email không hợp lệ'),
    password: yup.string().required()
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema)
  });
  const [valDefault, setValDefault] = useState({
    email: '',
    password: ''
  });

  const listUser = useSelector(state => {
    return state.loginReducer;
  });

  
  const submitFormUser = (data) => {
    const validUser = find(listUser, { 'email': data.email, 'password': data.password });
    
    if (validUser?.email && validUser?.password) {
      localStorage.setItem(CURRENT_USER, JSON.stringify(validUser));
      window.location.href = pathNameTypes.HOMEPAGE;
      return;
    } else {
      toast.error('Bạn không được phép vào!', {
        autoClose: 2000,
        closeButton: false
      });
    }
  }

  const handleChange = (e) => {
    setValDefault({
      ...valDefault,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    localStorage.clear();
  }, []);
  
  return (
    <div className="login-page">
      <div className="bgd-login"></div>
      <div className="inner">
        <i className="fa fa-user-circle-o icon-user" aria-hidden="true"></i>
        <h1 className="ttl-login text-center">Quản lý sổ sách</h1>
        <Form className="form-login" onSubmit={handleSubmit(submitFormUser)}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              autoComplete="off"
              autoFocus
              ref={register}
              onChange={handleChange}
              className={`${errors.email ? 'invalid' : ''}`}
            />
            {errors.email?.type === 'email' && <p className="error-msg font-bold"><i className="fa fa-exclamation mr-1" aria-hidden="true"></i>{errors.email.message}</p>}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autoComplete="off"
              ref={register}
              onChange={handleChange}
              className={`${errors.password ? 'invalid' : ''}`}
            />
          </Form.Group>
          <Button type="submit">
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
