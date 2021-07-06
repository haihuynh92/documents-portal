import { yupResolver } from '@hookform/resolvers/yup';
import { capNhatCS, themCS, XoaCS } from 'actions/cosomay';
import Empty from 'components/common/Empty/Empty';
import CSItem from 'components/CoSoMay/CSItem';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import './csm.scss';

const DanhSach = (props) => {

  const { listCSM } = props;
  const dispatch = useDispatch();
  const [valDefault, setValDefault] = useState({
    id: '',
    macs: '',
    tencs: '',
    diachi: '',
    sdt: '',
    ghichu: ''
  });

  const [isShow, setIsShow] = useState(false);

  const handleClose = () => {
    setIsShow(false);
    setValDefault({
      id: '',
      macs: '',
      tencs: '',
      diachi: '',
      sdt: '',
      ghichu: ''
    });
  };
  const handleShow = () => setIsShow(true);

  let validationSchema = yup.object().shape({
    macs: yup.string().required('Mã bắt buộc!'),
    tencs: yup.string().required('Tên bắt buộc!')
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema)
  });

  // input change
  const handleChange = (e) => {
    setValDefault({
      ...valDefault,
      [e.target.name]: e.target.value
    });
  }

  // save and update
  const luuCoSo = (data) => {
    if (!!valDefault?.id) {
      data.id = valDefault.id;
      dispatch(capNhatCS(data));
    } else {
      dispatch(themCS(data));
    }
    handleClose();
  }

  // get detail
  const onGetDetailCSM = (detail) => {
    setValDefault({
      id: detail.id,
      macs: detail.macs.trim(),
      tencs: detail.tencs.trim(),
      diachi: detail.diachi.trim(),
      sdt: detail.sdt.trim(),
      ghichu: detail.ghichu.trim()
    });
    handleShow();
  }

  // show list
  const showDSCSM = (list) => {
    var result = null;

    result = list.map((item, index) => {
      return (
        <CSItem
          key={index}
          index={index}
          item={item}
          confirmDeleteCSM={confirmDeleteCSM}
          getDetailCSM={onGetDetailCSM}
        />
      );
    });

    return result;
  }

  // delete
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState({});
  const handleCloseDelete = () => setIsShowDelete(false);
  const handleShowDelete = () => setIsShowDelete(true);

  const confirmDeleteCSM = (detail) => {
    setItemDelete(detail);
    handleShowDelete();
  }
  
  const onDeleteCSM = () => {
    dispatch(XoaCS(itemDelete.id));
    handleCloseDelete();
  }

  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">Danh sách cơ sở may</p>
        <Button variant="success" size="sm" className="btn-add" onClick={handleShow}>
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
            <Modal.Title>{`${!!valDefault?.id ? 'Cập nhật' : 'Thêm'} cơ sở may`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(luuCoSo)}>
              <Row>
                <Col sm="6">
                  <Form.Group controlId="macs">
                    <Form.Label>Mã Cơ Sở<span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="macs"
                      autoComplete="off"
                      autoFocus
                      ref={register}
                      onChange={handleChange}
                      defaultValue={valDefault.macs}
                      className={`${errors.macs ? 'invalid' : ''}`}
                    />
                    {errors.macs?.type === 'required' && <p className="error-msg font-bold">{errors.macs.message}</p>}
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group controlId="tencs">
                    <Form.Label>Tên Cơ Sở<span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="tencs"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      defaultValue={valDefault.tencs}
                      className={`${errors.tencs ? 'invalid' : ''}`}
                    />
                    {errors.tencs?.type === 'required' && <p className="error-msg font-bold">{errors.tencs.message}</p>}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <Form.Group controlId="diachi">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      name="diachi"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      defaultValue={valDefault.diachi}
                    />
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group controlId="sdt">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="number"
                      name="sdt"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      defaultValue={valDefault.sdt}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="ghichu">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="ghichu"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      maxLength={250}
                      defaultValue={valDefault.ghichu}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="group-control text-right">
                <Button variant="secondary" size="sm" onClick={handleClose}>
                  Hủy
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2">{`${!!valDefault?.id ? 'Cập nhật' : 'Lưu'}`}</Button>
              </div>
            </Form>        
          </Modal.Body>
        </Modal>
      </div>
      <div className="body-heading">
        {listCSM.length ?
          <Table striped bordered hover responsive variant="dark" className="custom-table table-csm">
            <thead>
              <tr>
                <th className="th-stt text-center">STT</th>
                <th className="th-macs text-center">Mã</th>
                <th className="th-tencs text-center">Tên cơ sở</th>
                <th className="th-dc">Địa chỉ</th>
                <th className="th-sdt text-center">SĐT</th>
                <th>Ghi chú</th>
                <th className="text-center th-action">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {showDSCSM(listCSM)}
            </tbody>
          </Table> : <Empty />
        }

        <Modal
          show={isShowDelete}
          onHide={handleCloseDelete}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bạn có chắc là xóa tên cơ sở "<span className="font-bold">{itemDelete.tencs}</span>" không?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleCloseDelete}>Hủy</Button>
            <Button variant="danger" size="sm" onClick={onDeleteCSM}>Xóa</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DanhSach;