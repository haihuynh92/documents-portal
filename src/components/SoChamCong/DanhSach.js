import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { capNhatChamCong, themChamCong, themTienBoiDuong, themTienUngSTL, xacNhanChamCong, xoaChamCong } from 'actions/sochamcong';
import { DatePicker } from 'antd';
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import { CONFIG_MONEY, DATA_SL } from 'constant/currentUser';
import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { FORMAT_MONEY } from 'services/common';
import STLItem from './SCCItem';

const DanhSachChamCong = (props) => {
  const { DSChamCong, DSTLGroupBy, nameArr, refreshSTL, filterDate } = props;
  const dispatch = useDispatch();
  let getInfoTL = _.filter(DATA_SL, x => x.value === nameArr)[0];

  const [isError, setIsError] = useState(false);
  const [valDefault, setValDefault] = useState({
    id: '',
    ngaynhap: '',
    giolam: '',
    giotangca: '',
    tiencom: true,
    ngaytao: '',
    thongtin: 'chamcong',
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
      giolam: '',
      giotangca: '',
      tiencom: true,
      ngaytao: '',
      thongtin: 'chamcong',
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
  const gioRegExp = /^([0-9]*[.])?[0-9]{1,2}$/;
  const handleChange = (e) => {
    if ((e.target.name === 'giolam' || e.target.name === 'giotangca') && !gioRegExp.test(e.target.value.trim())) {
      setIsError(true);
    }
    setValDefault({
      ...valDefault,
      [e.target.name]: e.target.value
    });
  }

  // lưu thông tin chấm công
  const luuChamCong = () => {
    let dataPost = {
      ...valDefault,
      tiencom: valDefault.tiencom === 'true' || valDefault.tiencom === true ? true : false
    }
    if (!!valDefault?.id) {
      dispatch(capNhatChamCong(dataPost, nameArr));
      setFormSearch({
        ngaynhap: null
      });
      handleClose();
    } else {
      if (!!valDefault.giolam && gioRegExp.test(valDefault.giolam.trim()) && (!valDefault.giotangca || gioRegExp.test(valDefault.giotangca.trim()))) {
        dispatch(themChamCong(dataPost, nameArr));
        setFormSearch({
          ngaynhap: null
        });
        handleClose();
      } else {
        setIsError(true);
      }
    }
  }

  // detail tiền lương
  const getDetailTL = (detail) => {
    setValDefault({
      id: detail.id,
      ngaynhap: detail.ngaynhap,
      giolam: detail.giolam,
      giotangca: detail.giotangca,
      tiencom: detail.tiencom,
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      thongtin: detail.thongtin,
      thanhtoan: detail.thanhtoan,
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
    });
    setIsShow(true);
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
      dispatch(themTienUngSTL(valDefaultTU, nameArr));
      setFormSearch({
        ngaynhap: null
      });
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

  // ===================================================================config tiền bồi dưỡng
  const [valDefaultBD, setValDefaultBD] = useState({
    id: '',
    ngaynhap: '',
    tienbd: '',
    ngaytao: '',
    thongtin: 'tienboiduong',
    thanhtoan: false,
    month: '',
    year: ''
  });
  const [isShowBD, setIsShowBD] = useState(false);
  const [isErrorBD, setIsErrorBD] = useState(false);
  const handleCloseBD = () => {
    setIsShowBD(false);
    setIsErrorBD(false);
    setValDefaultBD({
      id: '',
      ngaynhap: '',
      tienbd: '',
      ngaytao: '',
      thongtin: 'tienboiduong',
      thanhtoan: false,
      month: '',
      year: ''
    });
  };
  const handleShowBD = () => {
    setValDefaultBD({
      ...valDefaultBD,
      ngaynhap: moment().format('DD/MM/YYYY'),
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
    });
    setIsShowBD(true);
  }

  // lưu thông tin tiền bồi dưỡng
  const luuThongTinTienBD = () => {
    if (!!valDefaultBD?.tienbd) {
      dispatch(themTienBoiDuong(valDefaultBD, nameArr));
      setFormSearch({
        ngaynhap: null
      });
      handleCloseBD();
    } else {
      setIsErrorBD(true);
    }
  }
  const onValueChangeFormatBD = (nameInput, objVal) => {
    setValDefaultBD({
      ...valDefaultBD,
      [nameInput]: objVal.value
    });
  }
  
  // delete
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState({});
  const handleCloseDelete = () => setIsShowDelete(false);
  const handleShowDelete = () => setIsShowDelete(true);

  const confirmDeleteTL = (detail) => {
    setItemDelete(detail);
    handleShowDelete();
  }
  const onDeleteTL = () => {
    dispatch(xoaChamCong(itemDelete.id, nameArr));
    setFormSearch({
      ngaynhap: null
    });
    handleCloseDelete();
  }

  const confirmDeleteTUTBD = (id) => {
    dispatch(xoaChamCong(id, nameArr));
    setFormSearch({
      ngaynhap: null
    });
  }

  const getName = (nameArr) => {
    return _.filter(DATA_SL, (x) => {return x.value === nameArr})[0]['name'];
  }

  // =============================================Thanh toán sổ
  const [formSearch, setFormSearch] = useState({
    ngaynhap: null
  });
  const onChangeDateSearch = (value) => {
    value === null ? refreshSTL() : filterDate(value);
    setFormSearch({
      ngaynhap: value
    });
    setIsChecked(false);
  }
  
  let arrMoneyAfterMinusAll = 0;
  let luongThang = getInfoTL.luongcoban;
  let luongNgay = luongThang/CONFIG_MONEY.standar;
  let luongGio = luongNgay/CONFIG_MONEY.totalHourPerDay;
  // tính tổng tiền trong ngày
  for(let k = 0; k < DSChamCong.data.length; k++) {
    let totalUng = 0;
    let totalCountMoneyDay = 0;
    let totalBD = 0;

    // thông tin hàng lỗi
    DSChamCong.data.map(x => {
      if (x.thongtin === 'tienboiduong' && !x.thanhtoan) {
        return totalBD += +x.tienbd;
      }
      if (x.thongtin === 'tienung' && !x.thanhtoan) {
        return totalUng += +x.tienung;
      }
      if (x.thongtin === 'chamcong' && !x.thanhtoan) {
        let getSunday = moment(x.ngaynhap, 'DD/MM/YYYY').isoWeekday();
        
        let tiencom = x.tiencom ? CONFIG_MONEY.tiencom : 0;
        let gioTC = !!x.giotangca ? (+x.giotangca * luongGio) * CONFIG_MONEY.tangca : 0;
        let thanhTien = getSunday === CONFIG_MONEY.sunday ? +x.giolam * luongGio * CONFIG_MONEY.cn : +x.giolam * luongGio;
        let sumTT = thanhTien + gioTC + tiencom;

        return totalCountMoneyDay += sumTT;
      }
      return false;
    });

    arrMoneyAfterMinusAll = totalCountMoneyDay + totalBD - totalUng;
    
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
    dispatch(xacNhanChamCong(DSChamCong.data, nameArr));
    setFormSearch({
      ngaynhap: null
    });
    setIsShowConfirm(false);
    refreshSTL();
  }

  return (
    <>
      <div className="list-default">
        <div className="title-heading d-flex-between">
          <p className="ttl-list">
            <i className="fa fa-question-circle mr-2" aria-hidden="true"></i>
            Thông tin lương - {getName(nameArr)}
          </p>
        </div>
        <div className="body-heading inner">
          <Row>
            <Col sm="3">
              <Form.Group>
                <Form.Label>Lương cơ bản/tháng</Form.Label>
                <p className="mt-2">{FORMAT_MONEY.format(luongThang)} vnđ</p>
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group>
                <Form.Label>Lương cơ bản/ngày</Form.Label>
                <p className="mt-2">{parseFloat(FORMAT_MONEY.format(luongNgay))} vnđ</p>
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group>
                <Form.Label>Lương cơ bản/giờ</Form.Label>
                <p className="mt-2">{parseFloat(FORMAT_MONEY.format(luongGio))} vnđ</p>
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group>
                <Form.Label>Tiền trong nhà</Form.Label>
                <p className="mt-2">{FORMAT_MONEY.format(getInfoTL.tientrongnha)} vnđ</p>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
      <div className="list-default mt-4">
        <div className="title-heading d-flex-between">
          <p className="ttl-list">
            <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
            Chấm công hàng ngày - {getName(nameArr)}
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
            <Button variant="info" size="sm" className="btn-add ml-3" onClick={handleShowBD}>
              <i className="fa fa-usd mr-1" aria-hidden="true"></i>
              Tiền bồi dưỡng
            </Button>
            <Button variant="success" size="sm" className="btn-add ml-3" onClick={handleShow}>
              <i className="fa fa-plus mr-1" aria-hidden="true"></i>
              Chấm công
            </Button>
          </div>

          {/* chấm công */}
          <Modal
            show={isShow}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-custom"
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>{`${!!valDefault?.id ? 'Cập nhật' : 'Thêm'} chấm công`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={e => e.preventDefault()}>
                <Row>
                  <Col sm="3">
                    <Form.Group>
                      <Form.Label>Ngày làm</Form.Label>
                      <div className="datepicker-custom mt-2">
                        <DatePicker
                          allowClear={false}
                          placeholder="Chọn ngày"
                          inputReadOnly={true}
                          disabledDate={disabledDate}
                          defaultValue={moment(valDefault.ngaynhap, 'DD/MM/YYYY')}
                          format="DD/MM/YYYY"
                          onChange={onChangeDate}
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col sm="3">
                    <Form.Group controlId="giolam">
                      <Form.Label>Giờ làm <span>*</span></Form.Label>
                      <span className="prefix">giờ</span>
                      <Form.Control
                        type="text"
                        placeholder="Nhập giờ"
                        name="giolam"
                        autoComplete="off"
                        onChange={handleChange}
                        maxLength={5}
                        defaultValue={valDefault.giolam}
                        className={`form-control ${isError && (!valDefault?.giolam || !gioRegExp.test(valDefault?.giolam.trim())) ? 'invalid' : ''}`}
                      />
                      {isError && !valDefault?.giolam && <ErrorMsg msgError="Giờ làm bắt buộc" />}
                      {isError && !!valDefault?.giolam && !gioRegExp.test(valDefault?.giolam.trim()) && <ErrorMsg msgError="Sai định dạng giờ" />}
                    </Form.Group>
                  </Col>

                  <Col sm="3">
                    <Form.Group controlId="giotangca">
                      <Form.Label>Giờ tăng ca</Form.Label>
                      <span className="prefix">giờ</span>
                      <Form.Control
                        type="text"
                        placeholder="Nhập giờ"
                        name="giotangca"
                        autoComplete="off"
                        onChange={handleChange}
                        maxLength={5}
                        defaultValue={valDefault.giotangca}
                      />
                      {isError && !!valDefault?.giotangca && !gioRegExp.test(valDefault?.giotangca.trim()) && <ErrorMsg msgError="Sai định dạng giờ" />}
                    </Form.Group>
                  </Col>

                  <Col sm="3">
                    <Form.Group>
                      <Form.Label>Tiền cơm</Form.Label>
                      <div className="mt-3">
                        <Form.Check
                          inline
                          type="radio"
                          label="Có"
                          name="tiencom"
                          id="com1"
                          onChange={handleChange}
                          value={true}
                          defaultChecked={valDefault.tiencom}
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="Không"
                          name="tiencom"
                          id="com2"
                          onChange={handleChange}
                          value={false}
                          defaultChecked={!valDefault.tiencom}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="group-control text-right mt-3">
                  <Button variant="secondary" size="sm" onClick={handleClose}>
                    Hủy
                  </Button>
                  <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuChamCong}>{`${!!valDefault?.id ? 'Cập nhật' : 'Lưu'}`}</Button>
                </div>
              </Form>        
            </Modal.Body>
          </Modal>
          
          {/* Tiền ứng */}
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
                        decimalSeparator="."
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

          {/* Tiền bồi dưỡng */}
          <Modal
            show={isShowBD}
            onHide={handleCloseBD}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-custom"
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Thêm tiền bồi dưỡng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={e => e.preventDefault()}>
                <Row>
                  <Col sm="4">
                    <Form.Group controlId="tienbd">
                      <Form.Label>Tiền bồi dưỡng <span>*</span></Form.Label>
                      <span className="prefix">VNĐ</span>
                      <CurrencyFormat 
                        thousandSeparator={true}
                        onValueChange={(value) => onValueChangeFormatBD('tienbd', value)}
                        className={`form-control ${isErrorBD && !valDefaultBD.tienbd ? 'invalid' : ''}`}
                        placeholder="Nhập tiền"
                        autoComplete="off"
                        name="tienbd"
                        id="tienbd"
                        value={valDefaultBD.tienbd}
                      />
                      {(isErrorBD && !valDefaultBD.tienbd) && <ErrorMsg msgError="Tiền bồi dưỡng là bắt buộc" />}
                    </Form.Group>
                  </Col>
                </Row>
                <div className="group-control text-right">
                  <Button variant="secondary" size="sm" onClick={handleCloseBD}>
                    Hủy
                  </Button>
                  <Button variant="primary" type="submit" size="sm" className="ml-2" onClick={luuThongTinTienBD}>Lưu</Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

        </div>
        <div className="body-heading">
          {DSChamCong.data && !!DSChamCong.data.length ?
            <Table bordered responsive variant="dark" className="custom-table">
              <thead>
                <tr>
                  <th className="text-center">Ngày nhập</th>
                  <th className="text-center">Hành động</th>
                  <th className="text-center">Giờ làm (giờ)</th>
                  <th className="text-center">Tăng ca (giờ)</th>
                  <th className="text-center">Tiền cơm</th>
                  <th className="text-center">Thành tiền (VNĐ)</th>
                  <th className="th-min">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {formSearch.ngaynhap && !!formSearch.ngaynhap.length &&
                  <tr>
                    <td className="text-right td-bgd-purple" colSpan="5">
                      Thanh toán tiền lương <br />
                      <Button variant="info" size="sm" className="mt-1" onClick={handleShowConfirm}>
                        Thanh toán
                      </Button>
                    </td>
                    <td className="text-center td-bgd-purple">
                      {FORMAT_MONEY.format(arrMoneyAfterMinusAll).split(',')[0]}
                    </td>
                  </tr>
                }
                <STLItem
                  data={DSTLGroupBy}
                  confirmDeleteTL={confirmDeleteTL}
                  confirmDeleteTUTBD={confirmDeleteTUTBD}
                  getDetailTL={getDetailTL}
                  luongGio={luongGio}
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
            <p>Bạn có chắc xóa thông tin ngày làm "<span className="font-bold">{itemDelete.ngaynhap}</span>" và giờ làm là "<span className="font-bold">{itemDelete.giolam}</span> giờ" không?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleCloseDelete}>Hủy</Button>
            <Button variant="danger" size="sm" onClick={onDeleteTL}>Xóa</Button>
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
            <p>Tổng tiền lương của <span className="font-bold">"{getName(nameArr)}"</span></p>
            <p className="mt-1">
              {formSearch.ngaynhap && !!formSearch.ngaynhap.length && 
                `Từ ngày "${moment(formSearch?.ngaynhap[0]).format('DD/MM/YYYY')}" đến ngày "${moment(formSearch?.ngaynhap[1]).format('DD/MM/YYYY')}": `
              }
              <span className="font-bold">&nbsp;&nbsp;{FORMAT_MONEY.format(arrMoneyAfterMinusAll).split(',')[0]}</span> vnđ.
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
    </>
  );
};

export default DanhSachChamCong;
