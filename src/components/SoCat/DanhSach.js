import { yupResolver } from '@hookform/resolvers/yup';
import { capNhatMH, danhSachTatCaMaHang, themMH, XoaMH } from 'actions/mahang';
import { DatePicker, Pagination, Select } from "antd";
import Empty from 'components/common/Empty/Empty';
import Search from 'components/common/Search/Search';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './socat.scss';
import SCItem from './SCItem';
import { themSC, XoaSC } from 'actions/socat';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
const { Option } = Select;

const DanhSachMH = (props) => {
  const { DSSC, infoPag, DSMaHang, DSCoSoMay, handlePaging, onSearchMH } = props;
  const dispatch = useDispatch();
  const dateNow = moment().format('DD/MM/YYYY hh:mm:ss');
  const [valDefault, setValDefault] = useState({
    id: '',
    ngaycat: '',
    mahangId: '',
    slcat: '',
    slgiao: '',
    cosomayId: '',
    ghichu: '',
    ngaytao: ''
  });
  
  const [isShow, setIsShow] = useState(false);
  
  const handleClose = () => {
    setIsShow(false);
    setIsError(false);
    setValDefault({
      id: '',
      ngaycat: '',
      mahangId: '',
      slcat: '',
      slgiao: '',
      cosomayId: '',
      ghichu: '',
      ngaytao: ''
    });
  };
  const handleShow = () => {
    setValDefault({
      ...valDefault,
      ngaycat: moment().format('DD/MM/YYYY'),
      ngaytao: dateNow
    });
    setIsShow(true);
  }
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit'
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
  const [isError, setIsError] = useState(false);
  
  const luuSoCat = (data) => {
    setValDefault({
      ...valDefault,
      slcat: data.slcat,
      slgiao: data.slgiao,
      ghichu: data.ghichu
    });
    if (!!valDefault?.id) {
      // data.id = valDefault.id;
      // dispatch(capNhatMH(data, {
      //   page: 1,
      //   limit: infoPag?._limit
      // }));
    } else {
      if (!!valDefault?.mahangId && !!valDefault?.cosomayId) {
        dispatch(themSC(valDefault, {
          page: 1,
          limit: infoPag?._limit
        }));
        handleClose();
      } else {
        setIsError(true);
      }
    }
  }

  // // get detail
  // const onGetDetailMH = (detail) => {
  //   setValDefault({
  //     id: detail.id,
  //     mahang: detail.mahang.trim(),
  //     tenhang: detail.tenhang.trim(),
  //     giamay: detail.giamay.trim(),
  //     gianhap: detail.gianhap.trim(),
  //     giagiao: detail.giagiao.trim(),
  //     ghichu: detail.ghichu.trim(),
  //     ngaytao: dateNow
  //   });
  //   handleShow();
  // }

  // show danh sách sổ cắt
  const showDSSC = (list) => {
    let result = null;

    result = list.data.map((item, index) => {
      return (
        <SCItem
          key={item.id}
          index={index}
          item={item}
          currPage={list.pagination?._page}
          listCSM={DSCoSoMay}
          listMH={DSMaHang}
          confirmDeleteSC={confirmDeleteSC}
          // getDetailMH={onGetDetailMH}
        />
      );
    });

    return result;
  }

  // show danh sách mã hàng vào dropdown
  const showDSMaHang = (list) => {
    let result = null;
    result = list.map((item, index) => {
      return (
        <Option key={item.id} value={item.id}>[ {item.mahang} ] - {item.tenhang}</Option>
      );
    });
    return result;
  }

  // show danh sách cơ sơ may
  const showDSCoSoMay = (list) => {
    let result = null;
    result = list.map((item, index) => {
      return (
        <Option key={item.id} value={item.id}>[ {item.macs} ] - {item.tencs}</Option>
      );
    });
    return result;
  }

  // delete
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState({});
  const [detailMH, setDetailMH] = useState({});
  
  const handleCloseDelete = () => setIsShowDelete(false);
  const handleShowDelete = () => setIsShowDelete(true);

  const confirmDeleteSC = (item, detailMH) => {
    if(!!detailMH.length) {
      setDetailMH(detailMH[0]);
    }
    setItemDelete(item);
    handleShowDelete();
  }
  const onDeleteMH = () => {
    dispatch(XoaSC(itemDelete.id, {
      page: infoPag?._page,
      limit: infoPag?._limit
    }));
    handleCloseDelete();
  }

  // config datepicker
  const disabledDate = (current) => {
    return current > moment().endOf('day');
  }
  const onChangeDate = (date, dateString) => {
    setValDefault({
      ...valDefault,
      ngaycat: dateString
    });
  }

  // change selete mã hàng
  const onChangeSelectMahang = (value) => {
    setValDefault({
      ...valDefault,
      mahangId: value
    });
  }

  // change select cơ sở may
  const onChangeSelectCSM = (value) => {
    setValDefault({
      ...valDefault,
      cosomayId: value
    });
  }

  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">
          <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
          Danh sách sổ cắt
        </p>
        <div className="d-flex-between">
          {/* <Search
            onSearch={onSearchMH}
            placeholder="Tìm kiếm tên hàng ..."
          /> */}
          <Button variant="success" size="sm" className="btn-add ml-5" onClick={handleShow}>
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
            <Modal.Title>{`${!!valDefault?.id ? 'Cập nhật' : 'Thêm'} mã hàng vào sổ cắt`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(luuSoCat)}>
              <Row>
                <Col sm="3">
                  <Form.Group controlId="ngaycat">
                    <Form.Label>Ngày cắt</Form.Label>
                    <div className="datepicker-custom mt-2">
                      <DatePicker
                        placeholder="Chọn ngày cắt"
                        inputReadOnly={true}
                        disabledDate={disabledDate}
                        defaultValue={moment(new Date())} format="DD/MM/YYYY"
                        onChange={onChangeDate}
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group>
                    <Form.Label>Mã hàng <span>*</span></Form.Label>
                    <div className={`select-custom mt-2 ${(isError && !valDefault?.mahangId) ? 'invalid' : ''}`}>
                      <Select
                        showSearch
                        placeholder="Tìm kiếm mã hàng"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeSelectMahang}
                      >
                        {showDSMaHang(DSMaHang)}
                      </Select>
                    </div>
                    {isError && !valDefault?.mahangId && <ErrorMsg msgError="Chưa chọn mã hàng" />}
                  </Form.Group>
                </Col>

              </Row>

              <Row>
                <Col sm="3">
                  <Form.Group controlId="slcat">
                    <Form.Label>Số lượng cắt</Form.Label>
                    <span className="prefix">Cái</span>
                    <Form.Control
                      type="text"
                      placeholder="Nhập sl"
                      name="slcat"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefault.slcat}
                    />
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <Form.Group controlId="slgiao">
                    <Form.Label>Số lượng giao</Form.Label>
                    <span className="prefix">Cái</span>
                    <Form.Control
                      type="text"
                      placeholder="Nhập sl"
                      name="slgiao"
                      autoComplete="off"
                      ref={register}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      defaultValue={valDefault.slgiao}
                    />
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group>
                    <Form.Label>Cơ sở may <span>*</span></Form.Label>
                    <div className={`select-custom mt-2 ${(isError && !valDefault?.cosomayId) ? 'invalid' : ''}`}>
                      <Select
                        showSearch
                        placeholder="Tìm kiếm cơ sở may"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeSelectCSM}
                      >
                        {showDSCoSoMay(DSCoSoMay)}
                      </Select>
                      {isError && !valDefault?.cosomayId && <ErrorMsg msgError="Chưa chọn cơ sở may" />}
                    </div>
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
        {(DSSC.data && !!DSSC.data.length) ?
          <Table striped bordered hover responsive variant="dark" className="custom-table table-socat">
            <thead>
              <tr>
                <th className="th-stt text-center">STT</th>
                <th className="text-center th-date">Ngày cắt</th>
                <th className="th-ma text-center">Mã hàng</th>
                <th>Tên hàng</th>
                <th className="th-sl text-center">SL cắt</th>
                <th className="th-sl text-center">SL giao</th>
                <th className="th-tencs text-center">Cơ sở may</th>
                <th>Ghi chú</th>
                <th className="text-center th-action">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {showDSSC(DSSC)}
            </tbody>
          </Table> : <Empty />
        }
      </div>
      {DSSC.data && !!DSSC.data.length &&
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
          <p>Bạn có chắc là xóa mã hàng "<span className="font-bold">{detailMH?.mahang}</span>" vào ngày cắt "<span className="font-bold">{itemDelete.ngaycat}</span>" không?</p>
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
