import { capNhatMH, themMH, XoaMH } from 'actions/mahang';
import { Pagination } from "antd";
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import Search from 'components/common/Search/Search';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import MHItem from './MHItem';

const DanhSachMH = (props) => {
  const { DSMH, infoPag, handlePaging, onSearchMH } = props;
  const dispatch = useDispatch();
  const [valDefault, setValDefault] = useState({
    id: '',
    mahang: '',
    tenhang: '',
    giamay: '',
    gianhap: '',
    giagiao: '',
    giachau: '',
    ghichu: '',
    ngaytao: '',
    month: '',
    year: ''
  });

  const [isShow, setIsShow] = useState(false);

  const handleClose = () => {
    setIsShow(false);
    setIsError(false);
    setValDefault({
      id: '',
      mahang: '',
      tenhang: '',
      giamay: '',
      gianhap: '',
      giagiao: '',
      giachau: '',
      ghichu: '',
      ngaytao: '',
      month: '',
      year: ''
    });
  };
  const handleShow = () => {
    setValDefault({
      ...valDefault,
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
    });
    setIsShow(true);
  }

  // input change
  const handleChange = (e) => {
    setValDefault({
      ...valDefault,
      [e.target.name]: e.target.value
    });
  }

  const onValueChangeFormat = (nameInput, objVal) => {
    setValDefault({
      ...valDefault,
      [nameInput]: objVal.value
    });
  }
  
  // save and update
  const [isError, setIsError] = useState(false);
  const luuMaHang = () => {
    if (!!valDefault?.id) {
      dispatch(capNhatMH(valDefault, {
        page: 1,
        limit: infoPag?._limit
      }));
      handleClose();
    } else {
      if (!!valDefault.mahang && !!valDefault.tenhang && !!valDefault.gianhap && !!valDefault.giagiao) {
        dispatch(themMH(valDefault, {
          page: 1,
          limit: infoPag?._limit
        }));
        handleClose();
      } else {
        setIsError(true);
      }
    }
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
      giachau: detail.giachau.trim(),
      ghichu: detail.ghichu.trim(),
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
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
      page: 1,
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
          <Search onSearch={onSearchMH} handlePaging={handlePaging} />
          <Button variant="success" size="sm" className="btn-add ml-3" onClick={handleShow} >
            <i className="fa fa-plus mr-1" aria-hidden="true"></i>
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
            <Form onSubmit={e => e.preventDefault()}>
              <Form.Control 
                type="hidden"
                name="ngaytao"
                defaultValue={valDefault.ngaytao}
              />
              <Row>
                <Col sm="4">
                  <Form.Group controlId="mahang">
                    <Form.Label>Mã hàng <span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mã"
                      name="mahang"
                      autoComplete="off"
                      autoFocus
                      onChange={handleChange}
                      maxLength={10}
                      defaultValue={valDefault.mahang}
                      className={`${isError && !valDefault.mahang ? 'invalid' : ''}`}
                    />
                    {isError && !valDefault.mahang && <ErrorMsg msgError="Mã bắt buộc" />}
                  </Form.Group>
                </Col>

                <Col sm="4">
                  <Form.Group controlId="tenhang">
                    <Form.Label>Tên hàng <span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên"
                      name="tenhang"
                      autoComplete="off"
                      onChange={handleChange}
                      defaultValue={valDefault.tenhang}
                      className={`${isError && !valDefault.tenhang ? 'invalid' : ''}`}
                    />
                    {isError && !valDefault.tenhang && <ErrorMsg msgError="Tên bắt buộc" />}
                  </Form.Group>
                </Col>

                <Col sm="4">
                  <Form.Group controlId="giamay">
                    <Form.Label>Giá may</Form.Label>
                    <span className="prefix">VNĐ</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormat('giamay', value)}
                      className="form-control"
                      placeholder="Nhập giá"
                      autoComplete="off"
                      maxLength={10}
                      name="giamay"
                      id="giamay"
                      value={valDefault.giamay}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm="4">
                  <Form.Group controlId="gianhap">
                    <Form.Label>Giá nhập <span>*</span></Form.Label>
                    <span className="prefix">VNĐ</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormat('gianhap', value)}
                      className={`form-control ${isError && !valDefault?.gianhap ? 'invalid' : ''}`}
                      placeholder="Nhập giá"
                      autoComplete="off"
                      maxLength={10}
                      name="gianhap"
                      id="gianhap"
                      value={valDefault.gianhap}
                    />
                    {isError && !valDefault?.gianhap && <ErrorMsg msgError="Giá nhập bắt buộc" />}
                  </Form.Group>
                </Col>

                <Col sm="4">
                  <Form.Group controlId="giagiao">
                    <Form.Label>Giá giao <span>*</span></Form.Label>
                    <span className="prefix">VNĐ</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormat('giagiao', value)}
                      className={`form-control ${isError && !valDefault?.giagiao ? 'invalid' : ''}`}
                      placeholder="Nhập giá"
                      autoComplete="off"
                      maxLength={10}
                      name="giagiao"
                      id="giagiao"
                      value={valDefault.giagiao}
                    />
                    {isError && !valDefault?.giagiao && <ErrorMsg msgError="Giá giao bắt buộc" />}
                  </Form.Group>
                </Col>

                <Col sm="4">
                  <Form.Group controlId="giachau">
                    <Form.Label>Giá Châu</Form.Label>
                    <span className="prefix">VNĐ</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormat('giachau', value)}
                      className="form-control"
                      placeholder="Nhập giá"
                      autoComplete="off"
                      maxLength={10}
                      name="giachau"
                      id="giachau"
                      value={valDefault.giachau}
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
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuMaHang}>{`${!!valDefault?.id ? 'Cập nhật' : 'Lưu'}`}</Button>
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
                <th className="th-gia text-center">Giá may <br />(VNĐ)</th>
                <th className="th-gia text-center">Giá Châu <br />(VNĐ)</th>
                <th className="th-gia text-center">Giá nhập <br />(VNĐ)</th>
                <th className="th-gia text-center">Giá giao <br />(VNĐ)</th>
                <th className="th-gia text-center">Giá chênh lệch <br />(VNĐ)</th>
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
