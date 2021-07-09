import { yupResolver } from '@hookform/resolvers/yup';
import { capNhatCS, themCS, XoaCS } from 'actions/cosomay';
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import CSItem from 'components/CoSoMay/CSItem';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import './csm.scss';

const DanhSachCSM = (props) => {
  const { DSCSM } = props;
  const dispatch = useDispatch();
  const dateNow = moment().format('DD/MM/YYYY hh:mm:ss');
  const [valDefault, setValDefault] = useState({
    id: '',
    macs: '',
    tencs: '',
    diachi: '',
    sdt: '',
    ghichu: '',
    ngaytao: ''
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
      ghichu: '',
      ngaytao: ''
    });
  };
  const handleShow = () => {
    setValDefault({
      ...valDefault,
      ngaytao: dateNow
    });
    setIsShow(true);
  }

  const phoneRegExp = /^(([0-9]){10})$/;

  let validationSchema = yup.object().shape({
    macs: yup.string().required('Mã bắt buộc'),
    tencs: yup.string().required('Tên bắt buộc'),
    sdt: yup.string().matches(phoneRegExp, 'Số điện thoại không đúng')
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
  // handleKeyPress
  const handleKeyPress = (e) => {
    if (e.which < 48 || e.which > 57) {
      if (e.which !== 46) e.preventDefault();
    } 
  };

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
      ghichu: detail.ghichu.trim(),
      ngaytao: dateNow
    });
    setIsShow(true);
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
        <p className="ttl-list">
          <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
          Danh sách cơ sở may
        </p>
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
              <Form.Control 
                type="hidden"
                name="ngaytao"
                defaultValue={valDefault.ngaytao}
                ref={register}
              />
              <Row>
                <Col sm="6">
                  <Form.Group controlId="macs">
                    <Form.Label>Mã Cơ Sở <span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mã"
                      name="macs"
                      autoComplete="off"
                      autoFocus
                      ref={register}
                      onChange={handleChange}
                      maxLength={10}
                      defaultValue={valDefault.macs}
                      className={`${errors?.macs ? 'invalid' : ''}`}
                    />
                    {errors?.macs?.type === 'required' && <ErrorMsg msgError={errors?.macs?.message} />}
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group controlId="tencs">
                    <Form.Label>Tên Cơ Sở <span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên"
                      name="tencs"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      defaultValue={valDefault.tencs}
                      className={`${errors?.tencs ? 'invalid' : ''}`}
                    />
                    {errors?.tencs?.type === 'required' && <ErrorMsg msgError={errors?.tencs?.message} />}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <Form.Group controlId="sdt">
                    <Form.Label>Số điện thoại <span>*</span></Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      name="sdt"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      maxLength={10}
                      defaultValue={valDefault.sdt}
                      className={`${errors?.sdt ? 'invalid' : ''}`}
                    />
                    {errors?.sdt?.type === 'matches' && <ErrorMsg msgError={errors?.sdt?.message} />}
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group controlId="diachi">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập địa chỉ"
                      name="diachi"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      defaultValue={valDefault.diachi}
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
                      placeholder="Nhập ghi chú..."
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
        {DSCSM && !!DSCSM.length ?
          <Table striped bordered hover responsive variant="dark" className="custom-table table-csm">
            <thead>
              <tr>
                <th className="th-stt text-center">STT</th>
                <th className="th-ma text-center">Mã CS</th>
                <th className="th-tencs text-center">Tên cơ sở</th>
                <th className="th-dc">Địa chỉ</th>
                <th className="th-sdt text-center">SĐT</th>
                <th>Ghi chú</th>
                <th className="text-center th-action">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {showDSCSM(DSCSM)}
            </tbody>
          </Table> : <Empty />
        }
      </div>

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
          <p>Bạn có chắc là xóa tên cơ sở "<span className="font-bold">{itemDelete.tencs}</span>" này không?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDelete}>Hủy</Button>
          <Button variant="danger" size="sm" onClick={onDeleteCSM}>Xóa</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default DanhSachCSM;