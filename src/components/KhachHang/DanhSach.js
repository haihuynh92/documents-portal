import { yupResolver } from '@hookform/resolvers/yup';
import { themHangLoi, themThongTin, themTienTraTruoc, themTienVaiPhuLieu, xoaThongTin } from 'actions/khachhang';
import { DatePicker, Select } from 'antd';
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import KHItem from './KHItem';

const { Option } = Select;

const DanhSachMH = (props) => {
  const { DSKH, DSKHGroupBy, DSMaHang, nameArr } = props;

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  const dateNow = moment().format('DD/MM/YYYY HH:mm:ss');
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  let validationSchema = yup.object().shape({
    slgiao: yup.string().required('SL giao bắt buộc')
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema)
  });
  const [valDefault, setValDefault] = useState({
    id: '',
    ngaynhap: '',
    mahangId: '',
    slgiao: '',
    ghichu: '',
    ngaytao: '',
    thongtin: 'giaohang'
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
      thongtin: 'giaohang'
    });
  };
  const handleShow = () => {
    setValDefault({
      ...valDefault,
      ngaynhap: moment().format('DD/MM/YYYY'),
      ngaytao: dateNow
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

  // handleKeyPress
  const handleKeyPress = (e) => {
    if (e.which < 48 || e.which > 57) {
      if (e.which !== 46) e.preventDefault();
    } 
  };

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
    thongtin: 'tientratruoc'
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
      thongtin: 'tientratruoc'
    });
  };
  const handleShowTU = () => {
    setValDefaultTU({
      ...valDefaultTU,
      ngaynhap: moment().format('DD/MM/YYYY'),
      ngaytao: dateNow
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

  // =======================================hàng lỗi
  const [valDefaultFail, setValDefaultFail] = useState({
    id: '',
    ngaynhap: '',
    mahangId: '',
    slhu: '',
    ghichu: '',
    ngaytao: '',
    thongtin: 'hangloi'
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
      thongtin: 'hangloi'
    });
  };
  const handleShowFail = () => {
    setValDefaultFail({
      ...valDefaultFail,
      ngaynhap: moment().format('DD/MM/YYYY'),
      ngaytao: dateNow
    });
    setIsShowFail(true);
  }

  // lưu thông tin tiền khách trả
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
    thongtin: 'tienvaiphulieu'
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
      thongtin: 'tienvaiphulieu'
    });
  };
  const handleShowVPL = () => {
    setValDefaultVPL({
      ...valDefaultVPL,
      ngaynhap: moment().format('DD/MM/YYYY'),
      ngaytao: dateNow
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
                    <Form.Control
                      type="text"
                      placeholder="Nhập SL"
                      name="slhu"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChangeFail}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefaultFail.slhu}
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
                      ref={register}
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
            <Form onSubmit={handleSubmit(luuThongTinGiaoHang)}>
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
                    <Form.Control
                      type="text"
                      placeholder="Nhập SL"
                      name="slgiao"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefault.slgiao}
                      className={`${errors?.slgiao ? 'invalid' : ''}`}
                    />
                    {errors?.slgiao?.type === 'required' && <ErrorMsg msgError={errors?.slgiao?.message} />}
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
                <Button variant="primary" type="submit" size="sm" className="ml-2">Lưu</Button>
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
                    <Form.Control
                      type="text"
                      placeholder="Nhập tiền"
                      name="tientratruoc"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChangeTU}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefaultTU.tientratruoc}
                      className={`${isErrorTU && !valDefaultTU.tientratruoc ? 'invalid' : ''}`}
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
                      ref={register}
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
                    <Form.Control
                      type="text"
                      placeholder="Nhập tiền"
                      name="tienvaiphulieu"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChangeVPL}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefaultVPL.tienvaiphulieu}
                      className={`${isErrorVPL && !valDefaultVPL.tienvaiphulieu ? 'invalid' : ''}`}
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
                      ref={register}
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
              <KHItem  data={DSKHGroupBy} listMH={DSMaHang} confirmDeleteKH={confirmDeleteKH} confirmDeleteTTVPL={confirmDeleteTTVPL} />
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

    </div> 
  );
};

export default DanhSachMH;
