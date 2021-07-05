import { yupResolver } from '@hookform/resolvers/yup';
import Empty from 'components/common/Empty/Empty';
import React, { useState } from 'react';
import { Button, Form, Modal, Table, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import * as yup from 'yup';

const DanhSach = (props) => {

  const { listCSM } = props;
  const [valDefault, setValDefault] = useState({
    macs: ''
  });

  const [isShow, setIsShow] = useState(false);

  const handleClose = () => setIsShow(false);
  const handleShow = () => setIsShow(true);

  let validationSchema = yup.object().shape({
    macs: yup.string().required('Mã cơ sở là bắt buột!')
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema)
  });

  const handleChange = (e) => {
    setValDefault({
      ...valDefault,
      [e.target.name]: e.target.value
    });
  }
  console.log('errors', errors);
  const luuCoSo = (data) => {

  }

  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">Danh sách cơ sở may</p>
        <Button variant="success" className="btn-add" onClick={handleShow}>
          <i className="fa fa-plus mr-2" aria-hidden="true"></i>
          Thêm
        </Button>
        <Modal
          show={isShow}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm cơ sở may</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(luuCoSo)}>
              <Row>
                <Col sm="6">
                  <Form.Group controlId="macs">
                    <Form.Label>Mã Cơ Sở <span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="macs"
                      autoComplete="off"
                      autoFocus
                      ref={register}
                      onChange={handleChange}
                      className={`${errors.macs ? 'invalid' : ''}`}
                    />
                    {errors.macs?.type === 'required' && <p className="error-msg font-bold">{errors.macs.message}</p>}
                  </Form.Group>
                </Col>
              </Row>

              <div className="group-control text-right">
                <Button variant="secondary" size="sm" onClick={handleClose}>
                  Hủy
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2">Lưu</Button>
              </div>
            </Form>        
          </Modal.Body>
        </Modal>
      </div>
      <div className="body-heading">
        {listCSM.length ?
          <Table striped bordered hover responsive variant="dark" className="custom-table">
            <thead>
              <tr>
                <th className="th-stt text-center">STT</th>
                <th>Mã</th>
                <th>Tên cơ sở</th>
                <th>Địa chỉ</th>
                <th>SĐT</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td>01</td>
                <td>Mãi</td>
                <td>An Giang</td>
                <td>0343371517</td>
                <td className="text-center">
                  <Button variant="default" className="button-control reset-button mr-4 btn-edit"><i className="fa fa-pencil" aria-hidden="true"></i></Button>
                  <Button variant="default" className="button-control reset-button btn-delete"><i className="fa fa-trash" aria-hidden="true"></i></Button>
                </td>
              </tr>
            </tbody>
          </Table> : <Empty />
        }
      </div>
    </div>
  );
};

export default DanhSach;