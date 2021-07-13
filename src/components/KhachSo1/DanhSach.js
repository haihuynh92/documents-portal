import { yupResolver } from '@hookform/resolvers/yup';
import { themSoKhachSo1 } from 'actions/khachso1';
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

const { Option } = Select;

const DanhSachMH = (props) => {
  const { DSKS1, DSKS1Custom, DSMaHang, DSCoSoMay, handlePaging, onSearchSC } = props;

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  const dateNow = moment().format('DD/MM/YYYY hh:mm:ss');
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
    ngaygiao: '',
    mahangId: '',
    slgiao: '',
    slhu: '',
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
      ngaygiao: '',
      mahangId: '',
      slgiao: '',
      slhu: '',
      ghichu: '',
      ngaytao: '',
      thongtin: 'giaohang'
    });
  };
  const handleShow = () => {
    setValDefault({
      ...valDefault,
      ngaygiao: moment().format('DD/MM/YYYY'),
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
      ngaygiao: dateString
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

  // show danh sách sổ cắt
  const showDSKS1 = (obj) => {
    const arrDate = _.reverse(Object.keys(obj));
    // console.log(obj['12/07/2021']);
    
    arrDate.forEach(date => {
      console.log(obj[date]);

    });
    // let result = null;

    // result = list.data.map((item, index) => {
    //   return (
    //     <SCItem
    //       key={item.id}
    //       item={item}
    //       listCSM={DSCoSoMay}
    //       listMH={DSMaHang}
    //       confirmDeleteSC={confirmDeleteSC}
    //       getDetailSC={onGetDetailSC}
    //     />
    //   );
    // });

    // return result;
  }








  const luuThongTinGiaoHang = (data) => {
    setValDefault({
      ...valDefault,
      slgiao: data.slgiao,
      slhu: data.slhu,
      ghichu: data.ghichu
    });
    if (!!valDefault?.id) {
    } else {
      if (!!valDefault?.mahangId) {
        dispatch(themSoKhachSo1(valDefault));
        handleClose();
      } else {
        setIsError(true);
      }
    }
  }

  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">
          <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
          Thông tin ngày giao hàng
        </p>
        <div className="d-flex-between align-items-flex-end">
          <Button variant="warning" size="sm" className="btn-add ml-3" onClick={handleShow}>
            <i className="fa fa-usd mr-1" aria-hidden="true"></i>
            Tiền khách đưa
          </Button>
          
          <Button variant="success" size="sm" className="btn-add ml-3" onClick={handleShow}>
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
            <Modal.Title>{`${!!valDefault?.id ? 'Cập nhật' : 'Thêm'} thông tin giao hàng`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(luuThongTinGiaoHang)}>
              <Row>
                <Col sm="3">
                  <Form.Group controlId="ngaygiao">
                    <Form.Label>Ngày giao</Form.Label>
                    <div className="datepicker-custom mt-2">
                      <DatePicker
                        placeholder="Chọn ngày giao"
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
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefault.slhu}
                    />
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <Form.Group>
                    <Form.Label>Giá giao</Form.Label>
                    <p className="mt-2 text-readonly">{chiTietMaHang[0]?.giagiao ? formatter.format(chiTietMaHang[0]?.giagiao) : '0'}</p>
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
        {DSKS1.data && !!DSKS1.data.length ?
          <Table striped bordered hover responsive variant="dark" className="custom-table">
            <thead>
              <tr>
                <th className="text-center th-date">Ngày giao</th>
                <th className="th-ma text-center">Mã hàng</th>
                <th className="th-min">Tên hàng</th>
                <th className="th-gia text-center">Giá giao</th>
                <th className="th-sl text-center">SL giao</th>
                <th className="th-sl text-center">SL hư</th>
                <th className="th-gia text-center">Thành tiền</th>
                <th className="th-min">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {showDSKS1(DSKS1Custom)}
            </tbody>
          </Table> : <Empty />
        }
      </div>

    </div> 
  );
};

export default DanhSachMH;
