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
import { FORMAT_MONEY } from 'services/common';
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

  // change selete m?? h??ng
  const [chiTietMaHang, setChiTietMaHang] = useState([]);
  const onChangeSelectMahang = (value) => {
    setValDefault({
      ...valDefault,
      mahangId: value
    });
  }
  
  // show t??n h??ng sau khi ch???n m?? h??ng
  useEffect(() => {
    setChiTietMaHang(_.filter(DSMaHang, (x) => {return x.id === valDefault?.mahangId}));
  }, [DSMaHang, valDefault?.mahangId]);

  // show danh s??ch m?? h??ng v??o dropdown
  const showDSMaHang = (list) => {
    let result = null;
    result = list.map((item, index) => {
      return (
        <Option key={item.id} value={item.id}>{item.mahang}</Option>
      );
    });
    return result;
  }

  // l??u th??ng tin ng??y giao h??ng
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


  // ===================================================================config ti???n ???ng
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

  // l??u th??ng tin ti???n ???ng
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

  // =======================================h??ng l???i
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

  // l??u th??ng tin h??ng l???i
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

  // change selete m?? h??ng
  const [chiTietMaHangFail, setChiTietMaHangFail] = useState([]);
  const onChangeSelectMahangFail = (value) => {
    setValDefaultFail({
      ...valDefaultFail,
      mahangId: value
    });
  }
  
  // show t??n h??ng sau khi ch???n m?? h??ng
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

  // =============================================Thanh to??n s???
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
  // t??nh t???ng ti???n trong ng??y
  for(let k = 0; k < DSThongTinSCS.data.length; k++) {
    let totalMoneyCustomerU = 0;
    let totalCountMoneyDay = 0;
    let totalCountMoneyFail = 0;

    // th??ng tin h??ng l???i
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
          Th??ng tin {getName(nameArr)}
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
            Ti???n ???ng
          </Button>
          <Button variant="danger" size="sm" className="btn-add ml-3" onClick={handleShowFail}>
            <i className="fa fa-exclamation mr-1" aria-hidden="true"></i>
            Ph??t sinh
          </Button>
          <Button variant="success" size="sm" className="btn-add ml-3" onClick={handleShow}>
            <i className="fa fa-plus mr-1" aria-hidden="true"></i>
            Giao h??ng
          </Button>
        </div>

        {/* H??ng ph??t sinh */}
        <Modal
          show={isShowFail}
          onHide={handleCloseFail}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Th??m ph??t sinh</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>

                <Col sm="3">
                  <Form.Group>
                    <Form.Label>M?? h??ng <span>*</span></Form.Label>
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
                        defaultValue={`${!!valDefaultFail?.mahangId ? valDefaultFail?.mahangId : 'T??m ki???m m?? h??ng'}`}
                      >
                        {showDSMaHang(DSMaHang)}
                      </Select>
                    </div>
                    {isErrorFail && !valDefaultFail?.mahangId && <ErrorMsg msgError="Ch??a ch???n m?? h??ng" />}
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <Form.Group>
                    <Form.Label>T??n h??ng</Form.Label>
                    <p className="mt-2 text-readonly">{chiTietMaHangFail[0]?.tenhang}</p>
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <Form.Group controlId="slhu">
                    <Form.Label>S??? l?????ng s???a</Form.Label>
                    <span className="prefix">C??i</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatFail('slhu', value)}
                      className="form-control"
                      placeholder="Nh???p SL"
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
                    <Form.Label>Gi?? s???a</Form.Label>
                    <span className="prefix">VN??</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatFail('giasua', value)}
                      placeholder="Nh???p ti???n"
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
                    <Form.Label>Ghi ch??</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Nh???p ghi ch??..."
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
                  H???y
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuHangLoi}>L??u</Button>
              </div>
            </Form>        
          </Modal.Body>
        </Modal>

        {/* giao h??ng */}
        <Modal
          show={isShow}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Th??m th??ng tin giao h??ng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm="3">
                  <Form.Group>
                    <Form.Label>Ng??y nh???p</Form.Label>
                    <div className="datepicker-custom mt-2">
                      <DatePicker
                        allowClear={false}
                        placeholder="Ch???n ng??y nh???p"
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
                    <Form.Label>M?? h??ng <span>*</span></Form.Label>
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
                        defaultValue={`${!!valDefault?.mahangId ? valDefault?.mahangId : 'T??m ki???m m?? h??ng'}`}
                      >
                        {showDSMaHang(DSMaHang)}
                      </Select>
                    </div>
                    {isError && !valDefault?.mahangId && <ErrorMsg msgError="Ch??a ch???n m?? h??ng" />}
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group>
                    <Form.Label>T??n h??ng</Form.Label>
                    <p className="mt-2 text-readonly">{chiTietMaHang[0]?.tenhang}</p>
                  </Form.Group>
                </Col>

              </Row>
              
              <Row>
                <Col sm="3">
                  <Form.Group controlId="slgiao">
                    <Form.Label>S??? l?????ng giao <span>*</span></Form.Label>
                    <span className="prefix">C??i</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatGH('slgiao', value)}
                      className={`form-control ${isError && !valDefault?.slgiao ? 'invalid' : ''}`}
                      placeholder="Nh???p SL"
                      autoComplete="off"
                      maxLength={10}
                      name="slgiao"
                      id="slgiao"
                      value={valDefault.slgiao}
                    />
                    {isError && !valDefault?.slgiao && <ErrorMsg msgError="SL giao b???t bu???c" />}
                  </Form.Group>
                </Col>

                <Col sm="2">
                  <Form.Group>
                    <Form.Label>{isTypeBook === ROLE.SO_KET ? 'Gi?? k???t' : 'Gi?? may'}</Form.Label>
                    {isTypeBook === ROLE.SO_KET ? 
                      <p className="mt-2 text-readonly">{chiTietMaHang[0]?.giaket ? FORMAT_MONEY.format(chiTietMaHang[0]?.giaket) : '0'} VN??</p>
                      :
                      <p className="mt-2 text-readonly">{chiTietMaHang[0]?.giamay ? FORMAT_MONEY.format(chiTietMaHang[0]?.giamay) : '0'} VN??</p>
                    }
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="ghichu">
                    <Form.Label>Ghi ch??</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Nh???p ghi ch??..."
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
                  H???y
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuThongTinGiaoHang}>L??u</Button>
              </div>
            </Form>        
          </Modal.Body>
        </Modal>
        
        {/* Ti???n kh??ch ????a */}
        <Modal
          show={isShowTU}
          onHide={handleCloseTU}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Th??m ti???n ???ng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm="4">
                  <Form.Group controlId="tienung">
                    <Form.Label>Ti???n ???ng <span>*</span></Form.Label>
                    <span className="prefix">VN??</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatTU('tienung', value)}
                      className={`form-control ${isErrorTU && !valDefaultTU.tienung ? 'invalid' : ''}`}
                      placeholder="Nh???p ti???n"
                      autoComplete="off"
                      name="tienung"
                      id="tienung"
                      value={valDefaultTU.tienung}
                    />
                    {(isErrorTU && !valDefaultTU.tienung) && <ErrorMsg msgError="Ti???n ???ng l?? b???t bu???c" />}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="ghichu">
                    <Form.Label>Ghi ch??</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Nh???p ghi ch??..."
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
                  H???y
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuThongTinTienUng}>L??u</Button>
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
                <th className="text-center th-date">Ng??y nh???p</th>
                <th className="text-center th-action">H??nh <br />?????ng</th>
                <th className="th-ma text-center">M?? h??ng</th>
                <th className="th-min">T??n h??ng</th>
                <th className="th-gia text-center">{isTypeBook === ROLE.SO_KET ? 'Gi?? k???t' : 'Gi?? may'} (VN??)</th>
                <th className="th-sl text-center">SL giao (c??i)</th>
                <th className="th-gia text-center">Gi?? s???a (VN??)</th>
                <th className="th-sl text-center">SL s???a (c??i)</th>
                <th className="th-money text-center">Th??nh ti???n <br />(VN??)</th>
                <th className="th-min">Ghi ch??</th>
                <th className="th-money text-center">T???ng ti???n <br /> ph??t sinh <br />(VN??)</th>
                <th className="th-money text-center">T???ng ti???n ???ng <br />(VN??)</th>
                <th className="th-money text-center">T???ng ti???n <br /> c??n l???i <br />(VN??)</th>
              </tr>
            </thead>
            <tbody>
              {formSearch.ngaynhap && !!formSearch.ngaynhap.length &&
                <tr>
                  <td className="text-right td-bgd-purple" colSpan="12">
                    T???ng ti???n thanh to??n <br />
                    <Button variant="info" size="sm" className="mt-1" onClick={handleShowConfirm}>
                      Thanh to??n
                    </Button>
                  </td>
                  <td className="text-center td-bgd-purple">
                    {arrMoneyAfterMinusAll > 0 ? 
                      FORMAT_MONEY.format(arrMoneyAfterMinusAll) 
                      :
                      FORMAT_MONEY.format(arrMoneyAfterMinusAll).replace(FORMAT_MONEY.format(arrMoneyAfterMinusAll).slice(1, 2), '')
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
          <Modal.Title>X??c nh???n</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { itemDelete.thongtin === 'giaohang' ?
            <p>B???n c?? ch???c l?? x??a m?? h??ng "<span className="font-bold">{detailKH[0].mahang} - <span className="font-bold">{detailKH[0].tenhang}</span></span>" ra kh???i ng??y giao "<span className="font-bold">{itemDelete.ngaynhap}</span>" kh??ng?</p>
            : itemDelete.thongtin === 'hangloi' ? 
            <p>B???n c?? ch???c l?? x??a m?? h??ng l???i "<span className="font-bold">{detailKH[0].mahang} - <span className="font-bold">{detailKH[0].tenhang}</span></span>" ra kh???i ng??y nh???p "<span className="font-bold">{itemDelete.ngaynhap}</span>" kh??ng?</p>
            : ''
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDelete}>H???y</Button>
          <Button variant="danger" size="sm" onClick={onDeleteSCS}>X??a</Button>
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
          <Modal.Title>X??c nh???n thanh to??n</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>T???ng ti???n c???n thanh to??n cho <span className="font-bold">"{getName(nameArr)}"</span></p>
          <p className="mt-1">
            {formSearch.ngaynhap && !!formSearch.ngaynhap.length && 
              `T??? ng??y "${moment(formSearch?.ngaynhap[0]).format('DD/MM/YYYY')}" ?????n ng??y "${moment(formSearch?.ngaynhap[1]).format('DD/MM/YYYY')}" l??: ${arrMoneyAfterMinusAll > 0 ? FORMAT_MONEY.format(arrMoneyAfterMinusAll) : FORMAT_MONEY.format(arrMoneyAfterMinusAll).replace(FORMAT_MONEY.format(arrMoneyAfterMinusAll).slice(1, 2), '')} vn??.`
            }
          </p>
          <Form.Group className="mt-3" controlId="agreeTT">
            <Form.Check 
              type="checkbox" 
              label="T??i ?????ng ?? thanh to??n." 
              onChange={handleChangeCheckAgree}
              checked={isChecked}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseConfirm}>H???y</Button>
          <Button variant="info" size="sm" onClick={confirmSuccessfull} disabled={!isChecked}>X??c nh???n thanh to??n</Button>
        </Modal.Footer>
      </Modal>

    </div> 
  );
};

export default DanhSachThongTinCS;
