import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { themHangLoiSCS, themThongTinSCS, themTienUngSCS, updateThongTinSCS, xoaThongTinSCS } from 'actions/socoso';
import { DatePicker, Select } from 'antd';
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import { DATA_SCS, ROLE } from 'constant/currentUser';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { formatter } from 'services/common';
import SCSItem from './SCSItem';

const { Option } = Select;

const DanhSachThongTinCS = (props) => {
  const { DSThongTinSCS, DSSCSGroupBy, DSMaHang, nameArr, filterDate, refreshSCS, isTypeBook } = props;
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
    thanhtoan: false,
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
      thanhtoan: false,
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
      dispatch(themThongTinSCS(valDefault, nameArr));
      handleClose();
    } else {
      setIsError(true);
    }
  }


  // ===================================================================config tiền ứng
  const [valDefaultTU, setValDefaultTU] = useState({
    id: '',
    ngaynhap: '',
    tienung: '',
    ghichu: '',
    ngaytao: '',
    thongtin: 'tienung',
    thanhtoan: false,
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
      tienung: '',
      ghichu: '',
      ngaytao: '',
      thongtin: 'tienung',
      thanhtoan: false,
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

  // lưu thông tin tiền ứng
  const luuThongTinTienUng = () => {
    if (!!valDefaultTU?.tienung) {
      dispatch(themTienUngSCS(valDefaultTU, nameArr));
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
    giasua: '',
    ghichu: '',
    ngaytao: '',
    thongtin: 'hangloi',
    thanhtoan: false,
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
      giasua: '',
      ghichu: '',
      ngaytao: '',
      thongtin: 'hangloi',
      thanhtoan: false,
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
      dispatch(themHangLoiSCS(valDefaultFail, nameArr));
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

  const confirmDeleteSCS = (detail) => {
    setItemDelete(detail);
    handleShowDelete();
  }
  const onDeleteSCS = () => {
    dispatch(xoaThongTinSCS(itemDelete.id, nameArr));
    handleCloseDelete();
  }

  const confirmDeleteTU = (id) => {
    dispatch(xoaThongTinSCS(id, nameArr));
  }

  const getName = (nameArr) => {
    return _.filter(DATA_SCS, (x) => {return x.value === nameArr})[0]['name'];
  }

  // =============================================Thanh toán sổ
  const [formSearch, setFormSearch] = useState({
    ngaynhap: null
  });
  const onChangeDateSearch = (value) => {
    value === null ? refreshSCS() : filterDate(value);
    setFormSearch({
      ngaynhap: value
    });
    setIsChecked(false);
  }
  
  let arrMoneyAfterMinusAll = 0;
  // tính tổng tiền trong ngày
  for(let k = 0; k < DSThongTinSCS.data.length; k++) {
    let totalMoneyCustomerU = 0;
    let totalCountMoneyDay = 0;
    let totalCountMoneyFail = 0;

    // thông tin hàng lỗi
    DSThongTinSCS.data.map(x => {
      if (x.thongtin === 'hangloi' && !x.thanhtoan) {
        return totalCountMoneyFail += +x.slhu * x.giasua;
      }
      if (x.thongtin === 'tienung' && !x.thanhtoan) {
        return totalMoneyCustomerU += +x.tienung;
      }
      if (x.thongtin === 'giaohang' && !x.thanhtoan) {
        if(isTypeBook === ROLE.SO_KET) {
          let giaket = _.filter(DSMaHang, k => {return k.id === x.mahangId})[0]['giaket'];
          return totalCountMoneyDay += +x.slgiao * giaket;
        } else {
          let giamay = _.filter(DSMaHang, k => {return k.id === x.mahangId})[0]['giamay'];
          return totalCountMoneyDay += +x.slgiao * giamay;
        }
      }
      return false;
    });
    arrMoneyAfterMinusAll = totalCountMoneyDay - totalMoneyCustomerU - totalCountMoneyFail;
  }

  // ====================================
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const handleCloseConfirm = () => {
    setIsShowConfirm(false);
    setIsChecked(false);
  }
  const handleShowConfirm = () => {
    if (formSearch.ngaynhap !== null) {
      setIsShowConfirm(true)
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleChangeCheckAgree = (e) => {
    setIsChecked(!isChecked);
  }

  
  const confirmSuccessfull = () => {
    dispatch(updateThongTinSCS(DSThongTinSCS.data, nameArr));
    setFormSearch({
      ngaynhap: null
    });
    setIsShowConfirm(false);
    refreshSCS();
  }
  

  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">
          <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
          Thông tin {getName(nameArr)}
        </p>
        <div className="d-flex-between align-items-flex-end">
          <Row className="row-tt">
            <Col>
              <div className="datepicker-custom">
                <DateRangePicker
                  className={`${formSearch.ngaynhap && !!formSearch.ngaynhap.length ? 'isValue' : ''}`}
                  onChange={onChangeDateSearch}
                  value={formSearch.ngaynhap && !!formSearch.ngaynhap.length ? formSearch.ngaynhap : null}
                  maxDate={new Date()}
                  format="dd/MM/y"
                />
              </div>
            </Col>
          </Row>

          <Button variant="warning" size="sm" className="btn-add ml-3" onClick={handleShowTU}>
            <i className="fa fa-usd mr-1" aria-hidden="true"></i>
            Tiền ứng
          </Button>
          <Button variant="danger" size="sm" className="btn-add ml-3" onClick={handleShowFail}>
            <i className="fa fa-exclamation mr-1" aria-hidden="true"></i>
            Phát sinh
          </Button>
          <Button variant="success" size="sm" className="btn-add ml-3" onClick={handleShow}>
            <i className="fa fa-plus mr-1" aria-hidden="true"></i>
            Giao hàng
          </Button>
        </div>

        {/* Hàng phát sinh */}
        <Modal
          show={isShowFail}
          onHide={handleCloseFail}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm phát sinh</Modal.Title>
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

                <Col sm="3">
                  <Form.Group>
                    <Form.Label>Tên hàng</Form.Label>
                    <p className="mt-2 text-readonly">{chiTietMaHangFail[0]?.tenhang}</p>
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <Form.Group controlId="slhu">
                    <Form.Label>Số lượng sửa</Form.Label>
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

                <Col sm="3">
                  <Form.Group controlId="giasua">
                    <Form.Label>Giá sửa</Form.Label>
                    <span className="prefix">VNĐ</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatFail('giasua', value)}
                      placeholder="Nhập tiền"
                      autoComplete="off"
                      className="form-control"
                      name="giasua"
                      id="giasua"
                      maxLength={10}
                      value={valDefaultFail.giasua}
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
                    <Form.Label>{isTypeBook === ROLE.SO_KET ? 'Giá kết' : 'Giá may'}</Form.Label>
                    {isTypeBook === ROLE.SO_KET ? 
                      <p className="mt-2 text-readonly">{chiTietMaHang[0]?.giaket ? formatter.format(chiTietMaHang[0]?.giaket).slice(1) : '0'} VNĐ</p>
                      :
                      <p className="mt-2 text-readonly">{chiTietMaHang[0]?.giamay ? formatter.format(chiTietMaHang[0]?.giamay).slice(1) : '0'} VNĐ</p>
                    }
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
            <Modal.Title>Thêm tiền ứng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm="4">
                  <Form.Group controlId="tienung">
                    <Form.Label>Tiền ứng <span>*</span></Form.Label>
                    <span className="prefix">VNĐ</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatTU('tienung', value)}
                      className={`form-control ${isErrorTU && !valDefaultTU.tienung ? 'invalid' : ''}`}
                      placeholder="Nhập tiền"
                      autoComplete="off"
                      name="tienung"
                      id="tienung"
                      value={valDefaultTU.tienung}
                    />
                    {(isErrorTU && !valDefaultTU.tienung) && <ErrorMsg msgError="Tiền ứng là bắt buộc" />}
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
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuThongTinTienUng}>Lưu</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

      </div>
      <div className="body-heading">
        {DSThongTinSCS.data && !!DSThongTinSCS.data.length ?
          <Table bordered responsive variant="dark" className="custom-table">
            <thead>
              <tr>
                <th className="text-center th-date">Ngày nhập</th>
                <th className="text-center th-action-small">Hành <br />động</th>
                <th className="th-ma text-center">Mã hàng</th>
                <th className="th-min">Tên hàng</th>
                <th className="th-gia text-center">{isTypeBook === ROLE.SO_KET ? 'Giá kết' : 'Giá may'} (VNĐ)</th>
                <th className="th-sl text-center">SL giao (cái)</th>
                <th className="th-gia text-center">Giá sửa (VNĐ)</th>
                <th className="th-sl text-center">SL sửa (cái)</th>
                <th className="th-money text-center">Thành tiền <br />(VNĐ)</th>
                <th className="th-min">Ghi chú</th>
                <th className="th-money text-center">Tổng tiền <br /> phát sinh <br />(VNĐ)</th>
                <th className="th-money text-center">Tổng tiền ứng <br />(VNĐ)</th>
                <th className="th-money text-center">Tổng tiền <br /> còn lại <br />(VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              {formSearch.ngaynhap && !!formSearch.ngaynhap.length &&
                <tr>
                  <td className="text-right td-bgd-purple" colSpan="12">
                    Tổng tiền thanh toán <br />
                    <Button variant="danger" size="sm" className="mt-1" onClick={handleShowConfirm}>
                      Xác nhận
                    </Button>
                  </td>
                  <td className="text-center td-bgd-purple">
                    {arrMoneyAfterMinusAll > 0 ? 
                      formatter.format(arrMoneyAfterMinusAll).slice(1) 
                      :
                      formatter.format(arrMoneyAfterMinusAll).replace(formatter.format(arrMoneyAfterMinusAll).slice(1, 2), '')
                    }
                  </td>
                </tr>
              }
              <SCSItem
                data={DSSCSGroupBy}
                listMH={DSMaHang}
                confirmDeleteSCS={confirmDeleteSCS}
                confirmDeleteTU={confirmDeleteTU}
                isTypeBook={isTypeBook}
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
          <Button variant="danger" size="sm" onClick={onDeleteSCS}>Xóa</Button>
        </Modal.Footer>
      </Modal>

      {/* modal confirm */}
      <Modal
        show={isShowConfirm}
        onHide={handleCloseConfirm}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tổng tiền cần thanh toán cho <span className="font-bold">"{getName(nameArr)}"</span></p>
          <p className="mt-1">
            {formSearch.ngaynhap && !!formSearch.ngaynhap.length && 
              `Từ ngày "${moment(formSearch?.ngaynhap[0]).format('DD/MM/YYYY')}" đến ngày "${moment(formSearch?.ngaynhap[1]).format('DD/MM/YYYY')}" là: ${arrMoneyAfterMinusAll > 0 ? formatter.format(arrMoneyAfterMinusAll).slice(1) : formatter.format(arrMoneyAfterMinusAll).replace(formatter.format(arrMoneyAfterMinusAll).slice(1, 2), '')} vnđ.`
            }
          </p>
          <Form.Group className="mt-3" controlId="agreeTT">
            <Form.Check 
              type="checkbox" 
              label="Tôi đồng ý thanh toán." 
              onChange={handleChangeCheckAgree}
              checked={isChecked}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseConfirm}>Hủy</Button>
          <Button variant="info" size="sm" onClick={confirmSuccessfull} disabled={!isChecked}>Xác nhận thanh toán</Button>
        </Modal.Footer>
      </Modal>

    </div> 
  );
};

export default DanhSachThongTinCS;
