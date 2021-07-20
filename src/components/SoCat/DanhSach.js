import { capNhatSC, themSC, XoaSC } from 'actions/socat';
import { DatePicker, Pagination, Select } from "antd";
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import DatePickerEle from 'react-date-picker';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import SCItem from './SCItem';
import './socat.scss';

const { Option } = Select;

const DanhSachMH = (props) => {
  const { DSSC, infoPag, DSMaHang, DSCoSoMay, handlePaging, onSearchSC } = props;
  const dispatch = useDispatch();
  const dateNow = moment().format('DD/MM/YYYY HH:mm:ss');
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
      dispatch(capNhatSC(valDefault, {
        page: 1,
        limit: infoPag?._limit
      }));
      setSelected({
        ngaycat: '',
        mahangId: ''
      });
      handleClose();
    } else {
      if (!!valDefault?.mahangId && !!valDefault?.cosomayId) {
        dispatch(themSC(valDefault, {
          page: 1,
          limit: infoPag?._limit
        }));
        setSelected({
          ngaycat: '',
          mahangId: ''
        });
        handleClose();
      } else {
        setIsError(true);
      }
    }
  }

  // get detail
  const onGetDetailSC = (detail) => {
    setValDefault({
      id: detail.id,
      ngaycat: detail.ngaycat,
      mahangId: detail.mahangId,
      slcat: detail.slcat.trim(),
      slgiao: detail.slgiao.trim(),
      cosomayId: detail.cosomayId,
      ghichu: detail.ghichu.trim(),
      ngaytao: dateNow
    });
    setIsShow(true);
  }

  // show danh sách sổ cắt
  const showDSSC = (list) => {
    let result = null;

    result = list.data.map((item, index) => {
      return (
        <SCItem
          key={item.id}
          item={item}
          listCSM={DSCoSoMay}
          listMH={DSMaHang}
          confirmDeleteSC={confirmDeleteSC}
          getDetailSC={onGetDetailSC}
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
        <Option key={item.id} value={item.id}>{item.mahang}</Option>
      );
    });
    return result;
  }

  // show danh sách cơ sơ may
  const showDSCoSoMay = (list) => {
    let result = null;
    result = list.map((item, index) => {
      return (
        <Option key={item.id} value={item.id}>{item.tencs}</Option>
      );
    });
    return result;
  }

  // delete
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState({});
  const [detailMH, setDetailMH] = useState({});
  
  const handleCloseDelete = () => {
    setIsShowDelete(false);
  }
  const handleShowDelete = () => {
    setIsShowDelete(true);
  }

  const confirmDeleteSC = (item, detailMH) => {
    if(!!detailMH.length) {
      setDetailMH(detailMH[0]);
    }
    setItemDelete(item);
    handleShowDelete();
  }
  const onDeleteMH = () => {
    dispatch(XoaSC(itemDelete.id, {
      page: 1,
      limit: infoPag?._limit
    }));
    setSelected({
      ngaycat: '',
      mahangId: ''
    });
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

  // change select cơ sở may
  const onChangeSelectCSM = (value) => {
    setValDefault({
      ...valDefault,
      cosomayId: value
    });
  }

  // tìm kiếm mã hàng, ngày cắt
  const [selected, setSelected] = useState({
    ngaycat: '',
    mahangId: ''
  });

  const onChangeSearchMaHang = (value) => {
    setSelected({
      ...selected,
      mahangId: value
    });
  }

  const onChangeDateSearch = (value) => {
    setSelected({
      ...selected,
      ngaycat: value
    });
    handlePaging(1);
  }

  const refreshControl = () => {
    setSelected({
      ngaycat: '',
      mahangId: ''
    });
    handlePaging(1);
  }
  useEffect(() => {
    onSearchSC(selected);
  }, [dispatch, selected, onSearchSC]);


  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">
          <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
          Danh sách sổ cắt
        </p>
        <div className="d-flex-between align-items-flex-end">
          <div className="search-socat">
            <Row>
              <Col sm="6">
                <Form.Group>
                  <div className="datepicker-custom">
                    <DatePickerEle
                      className={`${!!selected.ngaycat ? 'isValue' : ''}`}
                      onChange={onChangeDateSearch}
                      value={!!selected.ngaycat ? selected.ngaycat : ''}
                      format="dd/MM/y"
                      maxDate={new Date()}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <div className="select-custom">
                    <Select
                      showSearch
                      value={!!selected.mahangId ? selected.mahangId : 'Tìm mã hàng'}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                      }
                      onChange={onChangeSearchMaHang} 
                    >
                      {showDSMaHang(DSMaHang)}
                    </Select>
                  </div>
                </Form.Group>
              </Col>

            </Row>

            <Button variant="default" onClick={refreshControl} className="btn-refresh" title="Làm mới Table">
              <i className="fa fa-refresh" aria-hidden="true"></i>
            </Button>
          </div>
          
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
                        defaultValue={moment(`${!!valDefault?.ngaycat ? valDefault?.ngaycat : new Date()}`, 'DD/MM/YYYY')}
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
                  <Form.Group controlId="slcat">
                    <Form.Label>Số lượng cắt</Form.Label>
                    <span className="prefix">Cái</span>
                    <Form.Control
                      type="text"
                      placeholder="Nhập SL"
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
                      placeholder="Nhập SL"
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
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeSelectCSM}
                        defaultValue={`${!!valDefault?.cosomayId ? valDefault?.cosomayId : 'Tìm kiếm cơ sở may'}`}
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
                <th className="text-center th-date">Ngày cắt</th>
                <th className="th-ma text-center">Mã hàng</th>
                <th className="th-min">Tên hàng</th>
                <th className="th-sl text-center">SL cắt (cái)</th>
                <th className="th-sl text-center">SL giao (cái)</th>
                <th className="th-tencs text-center">Cơ sở may</th>
                <th className="th-min">Ghi chú</th>
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
