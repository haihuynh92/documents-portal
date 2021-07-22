import { themHangLoi, themThongTin, themTienTraTruoc, themTienVaiPhuLieu, xoaThongTin } from 'actions/khachhang';
import { DatePicker, Select } from 'antd';
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import { CONFIG_MONEY } from 'constant/currentUser';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { formatter } from 'services/common';
import KHItem from './KHItem';

const { Option } = Select;

const DanhSachMH = (props) => {
  const { DSKH, DSKHGroupBy, DSMaHang, nameArr, currentUser } = props;
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  const [valDefault, setValDefault] = useState({
    id: '',
    ngaynhap: '',
    mahangId: '',
    slgiao: '',
    ghichu: '',
    ngaytao: '',
    thongtin: 'giaohang',
    month: '',
    year: ''
  });
  const [isShow, setIsShow] = useState(false);
  const handleClose = () => {
    setIsShow(false);
    setIsError(false);
    setValDefault({
      id: '',
      ngaynhap: '',
      mahangId: '',
      slgiao: '',
      ghichu: '',
      ngaytao: '',
      thongtin: 'giaohang',
      month: '',
      year: ''
    });
  };
  const handleShow = () => {
    setValDefault({
      ...valDefault,
      ngaynhap: moment().format('DD/MM/YYYY'),
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
    });
    setIsShow(true);
  }

  const disabledDate = (current) => {
    return current > moment().endOf('day');
  }
  const onChangeDate = (date, dateString) => {
    setValDefault({
      ...valDefault,
      ngaynhap: dateString
    });
  }

  // input change
  const handleChange = (e) => {
    setValDefault({
      ...valDefault,
      [e.target.name]: e.target.value
    });
  }

  const onValueChangeFormatGH = (nameInput, objVal) => {
    setValDefault({
      ...valDefault,
      [nameInput]: objVal.value
    });
  }

  // change selete mã hàng
  const [chiTietMaHang, setChiTietMaHang] = useState([]);
  const onChangeSelectMahang = (value) => {
    setValDefault({
      ...valDefault,
      mahangId: value
    });
  }
  
  // show tên hàng sau khi chọn mã hàng
  useEffect(() => {
    setChiTietMaHang(_.filter(DSMaHang, (x) => {return x.id === valDefault?.mahangId}));
  }, [DSMaHang, valDefault?.mahangId]);

  // show danh sách mã hàng vào dropdown
  const showDSMaHang = (list) => {
    let result = null;
    result = list.map((item, index) => {
      return (
        <Option key={item.id} value={item.id}>{item.mahang}</Option>
      );
    });
    return result;
  }

  // lưu thông tin ngày giao hàng
  const luuThongTinGiaoHang = (data) => {
    setValDefault({
      ...valDefault,
      slgiao: data.slgiao,
      ghichu: data.ghichu
    });
    if (!!valDefault?.mahangId) {
      dispatch(themThongTin(valDefault, nameArr));
      handleClose();
    } else {
      setIsError(true);
    }
  }


  // ===================================================================config tiền khách đưa trước
  const [valDefaultTU, setValDefaultTU] = useState({
    id: '',
    ngaynhap: '',
    tientratruoc: '',
    ghichu: '',
    ngaytao: '',
    thongtin: 'tientratruoc',
    month: '',
    year: ''
  });
  const [isShowTU, setIsShowTU] = useState(false);
  const [isErrorTU, setIsErrorTU] = useState(false);
  const handleCloseTU = () => {
    setIsShowTU(false);
    setIsErrorTU(false);
    setValDefaultTU({
      id: '',
      ngaynhap: '',
      tientratruoc: '',
      ghichu: '',
      ngaytao: '',
      thongtin: 'tientratruoc',
      month: '',
      year: ''
    });
  };
  const handleShowTU = () => {
    setValDefaultTU({
      ...valDefaultTU,
      ngaynhap: moment().format('DD/MM/YYYY'),
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
    });
    setIsShowTU(true);
  }

  // lưu thông tin tiền khách trả
  const luuThongTinTienKhach = () => {
    if (!!valDefaultTU?.tientratruoc) {
      dispatch(themTienTraTruoc(valDefaultTU, nameArr));
      handleCloseTU();
    } else {
      setIsErrorTU(true);
    }
  }
  const handleChangeTU = (e) => {
    setValDefaultTU({
      ...valDefaultTU,
      [e.target.name]: e.target.value
    });
  }
  const onValueChangeFormatTU = (nameInput, objVal) => {
    setValDefaultTU({
      ...valDefaultTU,
      [nameInput]: objVal.value
    });
  }

  // =======================================hàng lỗi
  const [valDefaultFail, setValDefaultFail] = useState({
    id: '',
    ngaynhap: '',
    mahangId: '',
    slhu: '',
    ghichu: '',
    ngaytao: '',
    thongtin: 'hangloi',
    month: '',
    year: ''
  });
  const [isShowFail, setIsShowFail] = useState(false);
  const [isErrorFail, setIsErrorFail] = useState(false);
  const handleCloseFail = () => {
    setIsShowFail(false);
    setIsErrorFail(false);
    setValDefaultFail({
      id: '',
      ngaynhap: '',
      mahangId: '',
      slhu: '',
      ghichu: '',
      ngaytao: '',
      thongtin: 'hangloi',
      month: '',
      year: ''
    });
  };
  const handleShowFail = () => {
    setValDefaultFail({
      ...valDefaultFail,
      ngaynhap: moment().format('DD/MM/YYYY'),
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
    });
    setIsShowFail(true);
  }

  // lưu thông tin hàng lỗi
  const luuHangLoi = () => {
    if (!!valDefaultFail?.mahangId) {
      dispatch(themHangLoi(valDefaultFail, nameArr));
      handleCloseFail();
    } else {
      setIsErrorFail(true);
    }
  }
  const handleChangeFail = (e) => {
    setValDefaultFail({
      ...valDefaultFail,
      [e.target.name]: e.target.value
    });
  }
  const onValueChangeFormatFail = (nameInput, objVal) => {
    setValDefaultFail({
      ...valDefaultFail,
      [nameInput]: objVal.value
    });
  }

  // change selete mã hàng
  const [chiTietMaHangFail, setChiTietMaHangFail] = useState([]);
  const onChangeSelectMahangFail = (value) => {
    setValDefaultFail({
      ...valDefaultFail,
      mahangId: value
    });
  }
  
  // show tên hàng sau khi chọn mã hàng
  useEffect(() => {
    setChiTietMaHangFail(_.filter(DSMaHang, (x) => {return x.id === valDefaultFail?.mahangId}));
  }, [DSMaHang, valDefaultFail?.mahangId]);

  // delete
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState({});
  const handleCloseDelete = () => setIsShowDelete(false);
  const handleShowDelete = () => setIsShowDelete(true);
  let detailKH = _.filter(DSMaHang, (x) => {return x.id === itemDelete.mahangId});

  const confirmDeleteKH = (detail) => {
    setItemDelete(detail);
    handleShowDelete();
  }
  const onDeleteKH = () => {
    dispatch(xoaThongTin(itemDelete.id, nameArr));
    handleCloseDelete();
  }

  const confirmDeleteTTVPL = (id) => {
    dispatch(xoaThongTin(id, nameArr));
  }

  // ===================================================================config tiền vải, phụ liệu
  const [valDefaultVPL, setValDefaultVPL] = useState({
    id: '',
    ngaynhap: '',
    tienvaiphulieu: '',
    ghichu: '',
    ngaytao: '',
    thongtin: 'tienvaiphulieu',
    month: '',
    year: ''
  });
  const [isShowVPL, setIsShowVPL] = useState(false);
  const [isErrorVPL, setIsErrorVPL] = useState(false);
  const handleCloseVPL = () => {
    setIsShowVPL(false);
    setIsErrorVPL(false);
    setValDefaultVPL({
      id: '',
      ngaynhap: '',
      tienvaiphulieu: '',
      ghichu: '',
      ngaytao: '',
      thongtin: 'tienvaiphulieu',
      month: '',
      year: ''
    });
  };
  const handleShowVPL = () => {
    setValDefaultVPL({
      ...valDefaultVPL,
      ngaynhap: moment().format('DD/MM/YYYY'),
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
    });
    setIsShowVPL(true);
  }

  // lưu thông tin tiền khách trả
  const luuThongTinVPL = () => {
    if (!!valDefaultVPL?.tienvaiphulieu) {
      dispatch(themTienVaiPhuLieu(valDefaultVPL, nameArr));
      handleCloseVPL();
    } else {
      setIsErrorVPL(true);
    }
  }
  const handleChangeVPL = (e) => {
    setValDefaultVPL({
      ...valDefaultVPL,
      [e.target.name]: e.target.value
    });
  }
  const onValueChangeFormatVPL = (nameInput, objVal) => {
    setValDefaultVPL({
      ...valDefaultVPL,
      [nameInput]: objVal.value
    });
  }

  // ===================================================================xem lợi nhuận
  const [hangDaGiao, setHangDaGiao] = useState([]);
  const [isShowLN, setIsShowLN] = useState(false);
  let sumSLGiao = 0;
  let sumLN1 = 0;
  let sumLN2 = 0;
  
  const handleCloseLN = () => setIsShowLN(false);
  const viewLN = (data) => {
    setHangDaGiao(data);
    setIsShowLN(true);
  }

  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">
          <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
          Thông tin giao hàng
        </p>
        <div className="d-flex-between align-items-flex-end">
          <Button variant="warning" size="sm" className="btn-add ml-3" onClick={handleShowTU}>
            <i className="fa fa-usd mr-1" aria-hidden="true"></i>
            Tiền khách đưa
          </Button>
          <Button variant="info" size="sm" className="btn-add ml-3" onClick={handleShowVPL}>
            <i className="fa fa-usd mr-1" aria-hidden="true"></i>
            Tiền vải, phụ liệu
          </Button>
          <Button variant="danger" size="sm" className="btn-add ml-3" onClick={handleShowFail}>
            <i className="fa fa-exclamation mr-1" aria-hidden="true"></i>
            Hàng lỗi
          </Button>
          <Button variant="success" size="sm" className="btn-add ml-3" onClick={handleShow}>
            <i className="fa fa-plus mr-1" aria-hidden="true"></i>
            Giao hàng
          </Button>
        </div>

        {/* Hàng lỗi */}
        <Modal
          show={isShowFail}
          onHide={handleCloseFail}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm hàng lỗi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>

                <Col sm="3">
                  <Form.Group>
                    <Form.Label>Mã hàng <span>*</span></Form.Label>
                    <div className={`select-custom mt-2 ${(isErrorFail && !valDefaultFail?.mahangId) ? 'invalid' : ''}`}>
                      <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeSelectMahangFail}
                        defaultValue={`${!!valDefaultFail?.mahangId ? valDefaultFail?.mahangId : 'Tìm kiếm mã hàng'}`}
                      >
                        {showDSMaHang(DSMaHang)}
                      </Select>
                    </div>
                    {isErrorFail && !valDefaultFail?.mahangId && <ErrorMsg msgError="Chưa chọn mã hàng" />}
                  </Form.Group>
                </Col>

                <Col sm="4">
                  <Form.Group>
                    <Form.Label>Tên hàng</Form.Label>
                    <p className="mt-2 text-readonly">{chiTietMaHangFail[0]?.tenhang}</p>
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <Form.Group controlId="slhu">
                    <Form.Label>Số lượng hư</Form.Label>
                    <span className="prefix">Cái</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatFail('slhu', value)}
                      className="form-control"
                      placeholder="Nhập SL"
                      autoComplete="off"
                      maxLength={10}
                      name="slhu"
                      id="slhu"
                      value={valDefaultFail.slhu}
                    />
                  </Form.Group>
                </Col>

                <Col sm="2">
                  <Form.Group>
                    <Form.Label>Giá giao</Form.Label>
                    <p className="mt-2 text-readonly">{chiTietMaHangFail[0]?.giagiao ? formatter.format(chiTietMaHangFail[0]?.giagiao).slice(1) : '0'} VNĐ</p>
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
                      onChange={handleChangeFail}
                      maxLength={250}
                      defaultValue={valDefaultFail.ghichu}
                    />
                  </Form.Group>
                </Col>
              </Row>           
              
              <div className="group-control text-right">
                <Button variant="secondary" size="sm" onClick={handleCloseFail}>
                  Hủy
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuHangLoi}>Lưu</Button>
              </div>
            </Form>        
          </Modal.Body>
        </Modal>

        {/* giao hàng */}
        <Modal
          show={isShow}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm thông tin giao hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm="3">
                  <Form.Group>
                    <Form.Label>Ngày nhập</Form.Label>
                    <div className="datepicker-custom mt-2">
                      <DatePicker
                        placeholder="Chọn ngày nhập"
                        inputReadOnly={true}
                        disabledDate={disabledDate}
                        defaultValue={moment()}
                        format="DD/MM/YYYY"
                        onChange={onChangeDate}
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <Form.Group>
                    <Form.Label>Mã hàng <span>*</span></Form.Label>
                    <div className={`select-custom mt-2 ${(isError && !valDefault?.mahangId) ? 'invalid' : ''}`}>
                      <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeSelectMahang}
                        defaultValue={`${!!valDefault?.mahangId ? valDefault?.mahangId : 'Tìm kiếm mã hàng'}`}
                      >
                        {showDSMaHang(DSMaHang)}
                      </Select>
                    </div>
                    {isError && !valDefault?.mahangId && <ErrorMsg msgError="Chưa chọn mã hàng" />}
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group>
                    <Form.Label>Tên hàng</Form.Label>
                    <p className="mt-2 text-readonly">{chiTietMaHang[0]?.tenhang}</p>
                  </Form.Group>
                </Col>

              </Row>
              
              <Row>
                <Col sm="3">
                  <Form.Group controlId="slgiao">
                    <Form.Label>Số lượng giao <span>*</span></Form.Label>
                    <span className="prefix">Cái</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatGH('slgiao', value)}
                      className={`form-control ${isError && !valDefault?.slgiao ? 'invalid' : ''}`}
                      placeholder="Nhập SL"
                      autoComplete="off"
                      maxLength={10}
                      name="slgiao"
                      id="slgiao"
                      value={valDefault.slgiao}
                    />
                    {isError && !valDefault?.slgiao && <ErrorMsg msgError="SL giao bắt buộc" />}
                  </Form.Group>
                </Col>

                <Col sm="2">
                  <Form.Group>
                    <Form.Label>Giá giao</Form.Label>
                    <p className="mt-2 text-readonly">{chiTietMaHang[0]?.giagiao ? formatter.format(chiTietMaHang[0]?.giagiao).slice(1) : '0'} VNĐ</p>
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
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuThongTinGiaoHang}>Lưu</Button>
              </div>
            </Form>        
          </Modal.Body>
        </Modal>
        
        {/* Tiền khách đưa */}
        <Modal
          show={isShowTU}
          onHide={handleCloseTU}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm tiền khách trả</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm="4">
                  <Form.Group controlId="tientratruoc">
                    <Form.Label>Tiền khách trả <span>*</span></Form.Label>
                    <span className="prefix">VNĐ</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatTU('tientratruoc', value)}
                      className={`form-control ${isErrorTU && !valDefaultTU.tientratruoc ? 'invalid' : ''}`}
                      placeholder="Nhập tiền"
                      autoComplete="off"
                      name="tientratruoc"
                      id="tientratruoc"
                      value={valDefaultTU.tientratruoc}
                    />
                    {(isErrorTU && !valDefaultTU.tientratruoc) && <ErrorMsg msgError="Tiền khách đưa là bắt buộc" />}
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
                      onChange={handleChangeTU}
                      maxLength={250}
                      defaultValue={valDefaultTU.ghichu}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="group-control text-right">
                <Button variant="secondary" size="sm" onClick={handleCloseTU}>
                  Hủy
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuThongTinTienKhach}>Lưu</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Tiền vải, phụ liệu */}
        <Modal
          show={isShowVPL}
          onHide={handleCloseVPL}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm tiền vải, phụ liệu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm="4">
                  <Form.Group controlId="tienvaiphulieu">
                    <Form.Label>Tiền vải, phụ liệu <span>*</span></Form.Label>
                    <span className="prefix">VNĐ</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatVPL('tienvaiphulieu', value)}
                      className={`form-control ${isErrorVPL && !valDefaultVPL.tienvaiphulieu ? 'invalid' : ''}`}
                      placeholder="Nhập tiền"
                      autoComplete="off"
                      name="tienvaiphulieu"
                      id="tienvaiphulieu"
                      value={valDefaultVPL.tienvaiphulieu}
                    />
                    {(isErrorVPL && !valDefaultVPL.tienvaiphulieu) && <ErrorMsg msgError="Tiền vải, phụ liệu là bắt buộc" />}
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
                      onChange={handleChangeVPL}
                      maxLength={250}
                      defaultValue={valDefaultVPL.ghichu}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="group-control text-right">
                <Button variant="secondary" size="sm" onClick={handleCloseVPL}>
                  Hủy
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuThongTinVPL}>Lưu</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

      </div>
      <div className="body-heading">
        {DSKH.data && !!DSKH.data.length ?
          <Table bordered responsive variant="dark" className="custom-table">
            <thead>
              <tr>
                <th className="text-center th-date">Ngày nhập</th>
                <th className="text-center th-action-small">Hành <br />động</th>
                <th className="th-ma text-center">Mã hàng</th>
                <th className="th-min">Tên hàng</th>
                <th className="th-gia text-center">Giá giao (VNĐ)</th>
                <th className="th-sl text-center">SL giao (cái)</th>
                <th className="th-sl text-center">SL hư (cái)</th>
                <th className="th-money text-center">Thành tiền <br />(VNĐ)</th>
                <th className="th-min">Ghi chú</th>
                <th className="th-money text-center">Tổng tiền <br /> trong ngày <br />(VNĐ)</th>
                <th className="th-money text-center">Tổng tiền <br /> vải, phụ liệu <br />(VNĐ)</th>
                <th className="th-money text-center">Tổng tiền <br /> hàng lỗi <br />(VNĐ)</th>
                <th className="th-money text-center">Tổng tiền <br /> khách đưa <br />(VNĐ)</th>
                <th className="th-money text-center">Tổng tiền <br /> còn lại <br />(VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              <KHItem
                currentUser={currentUser}
                data={DSKHGroupBy}
                listMH={DSMaHang}
                confirmDeleteKH={confirmDeleteKH}
                confirmDeleteTTVPL={confirmDeleteTTVPL}
                viewLN={viewLN}
              />
            </tbody>
          </Table> : <Empty />
        }
      </div>
      
      {/* modal delete */}
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
          { itemDelete.thongtin === 'giaohang' ?
            <p>Bạn có chắc là xóa mã hàng "<span className="font-bold">{detailKH[0].mahang} - <span className="font-bold">{detailKH[0].tenhang}</span></span>" ra khỏi ngày giao "<span className="font-bold">{itemDelete.ngaynhap}</span>" không?</p>
            : itemDelete.thongtin === 'hangloi' ? 
            <p>Bạn có chắc là xóa mã hàng lỗi "<span className="font-bold">{detailKH[0].mahang} - <span className="font-bold">{detailKH[0].tenhang}</span></span>" ra khỏi ngày nhập "<span className="font-bold">{itemDelete.ngaynhap}</span>" không?</p>
            : ''
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDelete}>Hủy</Button>
          <Button variant="danger" size="sm" onClick={onDeleteKH}>Xóa</Button>
        </Modal.Footer>
      </Modal>
      
      {/* modal lợi nhuận */}
      <Modal
        show={isShowLN}
        onHide={handleCloseLN}
        backdrop="static"
        keyboard={false}
        size="xl"
        dialogClassName="modal-custom modal-view"
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Xem chi tiết lợi nhuận ngày ${!!hangDaGiao.length ? hangDaGiao[0]['ngaynhap'] : '???'}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!hangDaGiao.length ?
            <Table bordered responsive variant="dark" className="custom-table">
                <thead>
                  <tr>
                    <th className="th-stt text-center">STT</th>
                    <th className="th-ma text-center">Mã hàng</th>
                    <th className="th-min">Tên hàng</th>
                    <th className="th-sl text-center">SL giao (cái)</th>
                    <th className="th-money text-center">Lợi nhuận 1 <br />(VNĐ)</th>
                    <th className="th-money text-center">Lợi nhuận 2 <br />(VNĐ)</th>
                    <th className="th-money text-center">Chi TT <br />(VNĐ)</th>
                  </tr>
                </thead>
                {
                  hangDaGiao.map((item, index) => {
                    let detailMH = _.filter(DSMaHang, (x) => {return x.id === item.mahangId});
                    sumSLGiao += +item.slgiao;
                    sumLN1 += CONFIG_MONEY * item.slgiao;
                    sumLN2 += (detailMH[0].giagiao - detailMH[0].gianhap - CONFIG_MONEY) * item.slgiao

                    return (
                      <tbody key={item.id}>
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{detailMH.length && detailMH[0]?.mahang}</td>
                          <td>{detailMH.length && detailMH[0]?.tenhang}</td>
                          <td className="text-center">{formatter.format(item.slgiao).slice(1)}</td>
                          <td className="text-center">{formatter.format(CONFIG_MONEY * item.slgiao).slice(1)}</td>
                          <td className="text-center">{formatter.format((detailMH[0].giagiao - detailMH[0].gianhap - CONFIG_MONEY) * item.slgiao).slice(1)}</td>
                          <td className="text-center">{formatter.format(CONFIG_MONEY * item.slgiao).slice(1)}</td>
                        </tr>
                        {index === hangDaGiao.length - 1 && 
                          <tr>
                            <td className="text-right td-bgd1" colSpan={3}>Tổng thành phần</td>
                            <td className="text-center td-bgd1">{formatter.format(sumSLGiao).slice(1)}</td>
                            <td className="text-center td-bgd1">{formatter.format(sumLN1).slice(1)}</td>
                            <td className="text-center td-bgd1">{formatter.format(sumLN2).slice(1)}</td>
                            <td className="text-center td-bgd1">{formatter.format(sumLN1).slice(1)}</td>
                          </tr>
                        }
                      </tbody>
                    );
                  })
                }
              </Table> : <Empty />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseLN}>Đóng</Button>
        </Modal.Footer>
      </Modal>

    </div> 
  );
};

export default DanhSachMH;
