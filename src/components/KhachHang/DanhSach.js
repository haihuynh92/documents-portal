import { themHangLoi, themThongTin, themTienTraTruoc, themTienVaiPhuLieu, xoaThongTin } from 'actions/khachhang';
import { DatePicker, Select } from 'antd';
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import { CONFIG_MONEY, DATA_KH, ROLE } from 'constant/currentUser';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { FORMAT_MONEY } from 'services/common';
import KHItem from './KHItem';

const { Option } = Select;

const DanhSachKH = (props) => {
  const { DSKH, DSKHGroupBy, DSMaHang, nameArr, currentUser, isTypeBook } = props;
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
      dispatch(themThongTin(valDefault, nameArr));
      handleClose();
    } else {
      setIsError(true);
    }
  }


  // ===================================================================config ti???n kh??ch ????a tr?????c
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

  // l??u th??ng tin ti???n kh??ch tr???
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

  // =======================================h??ng l???i
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

  // l??u th??ng tin h??ng l???i
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

  // ===================================================================config ti???n v???i, ph??? li???u
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

  // l??u th??ng tin ti???n kh??ch tr???
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

  // ===================================================================xem l???i nhu???n
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

  const getName = (nameArr) => {
    return _.filter(DATA_KH, (x) => {return x.value === nameArr})[0]['name'];
  }

  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">
          <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
          Th??ng tin {getName(nameArr)}
        </p>
        <div className="d-flex-between align-items-flex-end">
          <Button variant="warning" size="sm" className="btn-add ml-3" onClick={handleShowTU}>
            <i className="fa fa-usd mr-1" aria-hidden="true"></i>
            Ti???n kh??ch tr???
          </Button>
          <Button variant="info" size="sm" className="btn-add ml-3" onClick={handleShowVPL}>
            <i className="fa fa-usd mr-1" aria-hidden="true"></i>
            Ti???n v???i, ph??? li???u
          </Button>
          <Button variant="danger" size="sm" className="btn-add ml-3" onClick={handleShowFail}>
            <i className="fa fa-exclamation mr-1" aria-hidden="true"></i>
            H??ng l???i
          </Button>
          <Button variant="success" size="sm" className="btn-add ml-3" onClick={handleShow}>
            <i className="fa fa-plus mr-1" aria-hidden="true"></i>
            Giao h??ng
          </Button>
        </div>

        {/* H??ng l???i */}
        <Modal
          show={isShowFail}
          onHide={handleCloseFail}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Th??m h??ng l???i</Modal.Title>
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

                <Col sm="4">
                  <Form.Group>
                    <Form.Label>T??n h??ng</Form.Label>
                    <p className="mt-2 text-readonly">{chiTietMaHangFail[0]?.tenhang}</p>
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <Form.Group controlId="slhu">
                    <Form.Label>S??? l?????ng h??</Form.Label>
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

                <Col sm="2">
                  <Form.Group>
                    <Form.Label>{isTypeBook === ROLE.NOI_BO ? 'Gi?? nh???p' : 'Gi?? giao'}</Form.Label>
                    {isTypeBook === ROLE.NOI_BO ? 
                      <p className="mt-2 text-readonly">{chiTietMaHangFail[0]?.gianhap ? FORMAT_MONEY.format(chiTietMaHangFail[0]?.gianhap) : '0'} VN??</p>
                      :
                      <p className="mt-2 text-readonly">{chiTietMaHangFail[0]?.giagiao ? FORMAT_MONEY.format(chiTietMaHangFail[0]?.giagiao) : '0'} VN??</p>
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
                    <Form.Label>{isTypeBook === ROLE.NOI_BO ? 'Gi?? nh???p' : 'Gi?? giao'}</Form.Label>
                    {isTypeBook === ROLE.NOI_BO ? 
                      <p className="mt-2 text-readonly">{chiTietMaHang[0]?.gianhap ? FORMAT_MONEY.format(chiTietMaHang[0]?.gianhap) : '0'} VN??</p>
                      : 
                      <p className="mt-2 text-readonly">{chiTietMaHang[0]?.giagiao ? FORMAT_MONEY.format(chiTietMaHang[0]?.giagiao) : '0'} VN??</p>
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
            <Modal.Title>Th??m ti???n kh??ch tr???</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm="4">
                  <Form.Group controlId="tientratruoc">
                    <Form.Label>Ti???n kh??ch tr??? <span>*</span></Form.Label>
                    <span className="prefix">VN??</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatTU('tientratruoc', value)}
                      className={`form-control ${isErrorTU && !valDefaultTU.tientratruoc ? 'invalid' : ''}`}
                      placeholder="Nh???p ti???n"
                      autoComplete="off"
                      name="tientratruoc"
                      id="tientratruoc"
                      value={valDefaultTU.tientratruoc}
                    />
                    {(isErrorTU && !valDefaultTU.tientratruoc) && <ErrorMsg msgError="Ti???n kh??ch ????a l?? b???t bu???c" />}
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
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuThongTinTienKhach}>L??u</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Ti???n v???i, ph??? li???u */}
        <Modal
          show={isShowVPL}
          onHide={handleCloseVPL}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-custom"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Th??m ti???n v???i, ph??? li???u</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm="4">
                  <Form.Group controlId="tienvaiphulieu">
                    <Form.Label>Ti???n v???i, ph??? li???u <span>*</span></Form.Label>
                    <span className="prefix">VN??</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormatVPL('tienvaiphulieu', value)}
                      className={`form-control ${isErrorVPL && !valDefaultVPL.tienvaiphulieu ? 'invalid' : ''}`}
                      placeholder="Nh???p ti???n"
                      autoComplete="off"
                      name="tienvaiphulieu"
                      id="tienvaiphulieu"
                      value={valDefaultVPL.tienvaiphulieu}
                    />
                    {(isErrorVPL && !valDefaultVPL.tienvaiphulieu) && <ErrorMsg msgError="Ti???n v???i, ph??? li???u l?? b???t bu???c" />}
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
                      onChange={handleChangeVPL}
                      maxLength={250}
                      defaultValue={valDefaultVPL.ghichu}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="group-control text-right">
                <Button variant="secondary" size="sm" onClick={handleCloseVPL}>
                  H???y
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuThongTinVPL}>L??u</Button>
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
                <th className="text-center th-date">Ng??y nh???p</th>
                <th className="text-center th-action-small">H??nh <br />?????ng</th>
                <th className="th-ma text-center">M?? h??ng</th>
                <th className="th-min">T??n h??ng</th>
                <th className="th-gia text-center">{isTypeBook === ROLE.NOI_BO ? 'Gi?? nh???p' : 'Gi?? giao'} (VN??)</th>
                <th className="th-sl text-center">SL giao (c??i)</th>
                <th className="th-sl text-center">SL h?? (c??i)</th>
                <th className="th-money text-center">Th??nh ti???n <br />(VN??)</th>
                <th className="th-min">Ghi ch??</th>
                <th className="th-sl text-center">T???ng SL giao <br />(c??i)</th>
                <th className="th-sl text-center">T???ng SL h?? <br />(c??i)</th>
                <th className="th-money text-center">T???ng ti???n <br /> trong ng??y <br />(VN??)</th>
                <th className="th-money text-center">T???ng ti???n <br /> v???i, ph??? li???u <br />(VN??)</th>
                <th className="th-money text-center">T???ng ti???n <br /> h??ng l???i <br />(VN??)</th>
                <th className="th-money text-center">T???ng ti???n <br /> kh??ch ????a <br />(VN??)</th>
                <th className="th-money text-center">T???ng ti???n <br /> c??n l???i <br />(VN??)</th>
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
          <Button variant="danger" size="sm" onClick={onDeleteKH}>X??a</Button>
        </Modal.Footer>
      </Modal>
      
      {/* modal l???i nhu???n */}
      <Modal
        show={isShowLN}
        onHide={handleCloseLN}
        backdrop="static"
        keyboard={false}
        size="xl"
        dialogClassName="modal-custom modal-view"
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Xem chi ti???t l???i nhu???n ng??y ${!!hangDaGiao.length ? hangDaGiao[0]['ngaynhap'] : '???'}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!hangDaGiao.length ?
            <Table bordered responsive variant="dark" className="custom-table">
                <thead>
                  <tr>
                    <th className="th-stt text-center">STT</th>
                    <th className="th-ma text-center">M?? h??ng</th>
                    <th className="th-min">T??n h??ng</th>
                    <th className="th-sl text-center">SL giao (c??i)</th>
                    <th className="th-money text-center">L???i nhu???n 1 <br />(VN??)</th>
                    <th className="th-money text-center">L???i nhu???n 2 <br />(VN??)</th>
                    <th className="th-money text-center">Chi TT <br />(VN??)</th>
                  </tr>
                </thead>
                {
                  hangDaGiao.map((item, index) => {
                    let detailMH = _.filter(DSMaHang, (x) => {return x.id === item.mahangId});
                    sumSLGiao += +item.slgiao;
                    sumLN1 += CONFIG_MONEY.default * item.slgiao;
                    sumLN2 += (detailMH[0].giagiao - detailMH[0].gianhap - CONFIG_MONEY.default) * item.slgiao

                    return (
                      <tbody key={item.id}>
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{detailMH.length && detailMH[0]?.mahang}</td>
                          <td>{detailMH.length && detailMH[0]?.tenhang}</td>
                          <td className="text-center">{FORMAT_MONEY.format(item.slgiao)}</td>
                          <td className="text-center">{FORMAT_MONEY.format(CONFIG_MONEY.default * item.slgiao)}</td>
                          <td className="text-center">{FORMAT_MONEY.format((detailMH[0].giagiao - detailMH[0].gianhap - CONFIG_MONEY.default) * item.slgiao)}</td>
                          <td className="text-center">{FORMAT_MONEY.format(CONFIG_MONEY.default * item.slgiao)}</td>
                        </tr>
                        {index === hangDaGiao.length - 1 && 
                          <tr>
                            <td className="text-right" colSpan={3}>T???ng th??nh ph???n</td>
                            <td className="text-center">{FORMAT_MONEY.format(sumSLGiao)}</td>
                            <td className="text-center">{FORMAT_MONEY.format(sumLN1)}</td>
                            <td className="text-center">{FORMAT_MONEY.format(sumLN2)}</td>
                            <td className="text-center">{FORMAT_MONEY.format(sumLN1)}</td>
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
          <Button variant="secondary" size="sm" onClick={handleCloseLN}>????ng</Button>
        </Modal.Footer>
      </Modal>

    </div> 
  );
};

export default DanhSachKH;
