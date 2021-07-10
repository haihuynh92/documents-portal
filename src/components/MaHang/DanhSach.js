import { yupResolver } from '@hookform/resolvers/yup';
import { capNhatMH, themMH, XoaMH } from 'actions/mahang';
import { Pagination } from "antd";
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import Search from 'components/common/Search/Search';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import './mahang.scss';
import MHItem from './MHItem';

const DanhSachMH = (props) => {
  const { DSMH, infoPag, handlePaging, onSearchMH } = props;
  const dispatch = useDispatch();
  const dateNow = moment().format('DD/MM/YYYY hh:mm:ss');
  const [valDefault, setValDefault] = useState({
    id: '',
    mahang: '',
    tenhang: '',
    giamay: '',
    gianhap: '',
    giagiao: '',
    ghichu: '',
    ngaytao: ''
  });

  const [isShow, setIsShow] = useState(false);

  const handleClose = () => {
    setIsShow(false);
    setValDefault({
      id: '',
      mahang: '',
      tenhang: '',
      giamay: '',
      gianhap: '',
      giagiao: '',
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

  let validationSchema = yup.object().shape({
    mahang: yup.string().required('Mã bắt buộc'),
    tenhang: yup.string().required('Tên bắt buộc')
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
  const luuMaHang = (data) => {
    if (!!valDefault?.id) {
      data.id = valDefault.id;
      dispatch(capNhatMH(data, {
        page: 1,
        limit: infoPag?._limit
      }));
    } else {
      dispatch(themMH(data, {
        page: 1,
        limit: infoPag?._limit
      }));
    }
    handleClose();
  }

  // get detail
  const onGetDetailMH = (detail) => {
    setValDefault({
      id: detail.id,
      mahang: detail.mahang.trim(),
      tenhang: detail.tenhang.trim(),
      giamay: detail.giamay.trim(),
      gianhap: detail.gianhap.trim(),
      giagiao: detail.giagiao.trim(),
      ghichu: detail.ghichu.trim(),
      ngaytao: dateNow
    });
    setIsShow(true);
  }

  // show list
  const showDSMH = (list) => {
    let result = null;
    result = list.data.map((item, index) => {
      return (
        <MHItem
          key={item.id}
          index={index}
          item={item}
          currPage={list.pagination?._page}
          confirmDeleteMH={confirmDeleteMH}
          getDetailMH={onGetDetailMH}
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

  const confirmDeleteMH = (detail) => {
    setItemDelete(detail);
    handleShowDelete();
  }
  const onDeleteMH = () => {
    dispatch(XoaMH(itemDelete.id, {
      page: infoPag?._page,
      limit: infoPag?._limit
    }));
    handleCloseDelete();
  }

  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">
          <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
          Danh sách mã hàng
        </p>
        <div className="d-flex-between align-items-flex-end">
          <Search onSearch={onSearchMH} />
          <Button variant="success" size="sm" className="btn-add ml-3" onClick={handleShow} >
            <i className="fa fa-plus mr-2" aria-hidden="true"></i>
            Thêm
          </Button>
        </div>
        <Modal
          show={isShow}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{`${!!valDefault?.id ? 'Cập nhật' : 'Thêm'} mã hàng`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(luuMaHang)}>
              <Form.Control 
                type="hidden"
                name="ngaytao"
                defaultValue={valDefault.ngaytao}
                ref={register}
              />
              <Row>
                <Col sm="6">
                  <Form.Group controlId="mahang">
                    <Form.Label>Mã hàng <span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mã"
                      name="mahang"
                      autoComplete="off"
                      autoFocus
                      ref={register}
                      onChange={handleChange}
                      maxLength={10}
                      defaultValue={valDefault.mahang}
                      className={`${errors?.mahang ? 'invalid' : ''}`}
                    />
                    {errors?.mahang?.type === 'required' && <ErrorMsg msgError={errors?.mahang?.message} />}
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group controlId="tenhang">
                    <Form.Label>Tên hàng <span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên"
                      name="tenhang"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      defaultValue={valDefault.tenhang}
                      className={`${errors.tenhang ? 'invalid' : ''}`}
                    />
                    {errors?.tenhang?.type === 'required' && <ErrorMsg msgError={errors?.tenhang?.message} />}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <Form.Group controlId="giamay">
                    <Form.Label>Giá may</Form.Label>
                    <span className="prefix">VNĐ</span>
                    <Form.Control
                      type="text"
                      placeholder="Nhập giá"
                      name="giamay"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefault.giamay}
                    />
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group controlId="gianhap">
                    <Form.Label>Giá nhập</Form.Label>
                    <span className="prefix">VNĐ</span>
                    <Form.Control
                      type="text"
                      placeholder="Nhập giá"
                      name="gianhap"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefault.gianhap}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <Form.Group controlId="giagiao">
                    <Form.Label>Giá giao</Form.Label>
                    <span className="prefix">VNĐ</span>
                    <Form.Control
                      type="text"
                      placeholder="Nhập giá"
                      name="giagiao"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefault.giagiao}
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
        {(DSMH.data && !!DSMH.data.length) ?
          <Table striped bordered hover responsive variant="dark" className="custom-table table-mahang">
            <thead>
              <tr>
                <th className="th-stt text-center">STT</th>
                <th className="th-ma text-center">Mã hàng</th>
                <th className="th-min">Tên hàng</th>
                <th className="th-gia text-center">Giá may</th>
                <th className="th-gia text-center">Giá nhập</th>
                <th className="th-gia text-center">Giá giao</th>
                <th className="th-min">Ghi chú</th>
                <th className="text-center th-action">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {showDSMH(DSMH)}
            </tbody>
          </Table> : <Empty />
        }
      </div>
      {DSMH.data && !!DSMH.data.length &&
        <Pagination
          defaultPageSize={infoPag?._limit}
          className="pagination pagination-custom"
          size="small"
          total={infoPag?._totalRows}
          showSizeChanger={false}
          onChange={handlePaging}
          current={infoPag?._page}
          showTitle={false}
        />
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
          <p>Bạn có chắc là xóa mã hàng "<span className="font-bold">{itemDelete.mahang}</span>" này không?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDelete}>Hủy</Button>
          <Button variant="danger" size="sm" onClick={onDeleteMH}>Xóa</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default DanhSachMH;
