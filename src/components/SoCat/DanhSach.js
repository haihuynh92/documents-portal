import { capNhatSC, themSC, XoaSC } from 'actions/socat';
import { DatePicker, Pagination, Select } from "antd";
import Empty from 'components/common/Empty/Empty';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import SCItem from './SCItem';
import './socat.scss';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const { Option } = Select;

const DanhSachMH = (props) => {
  const { DSSC, infoPag, DSMaHang, DSCoSoMay, handlePaging, onSearchSC } = props;
  const dispatch = useDispatch();
  const [valDefault, setValDefault] = useState({
    id: '',
    ngaycat: '',
    mahangId: '',
    slcat: '',
    slgiao: '',
    cosomayId: '',
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
      ngaycat: '',
      mahangId: '',
      slcat: '',
      slgiao: '',
      cosomayId: '',
      ghichu: '',
      ngaytao: '',
      month: '',
      year: ''
    });
  };
  const handleShow = () => {
    setValDefault({
      ...valDefault,
      ngaycat: moment().format('DD/MM/YYYY'),
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
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

  const onValueChangeFormat = (nameInput, objVal) => {
    setValDefault({
      ...valDefault,
      [nameInput]: objVal.value
    });
  }

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
      setFormSearch({
        ngaycat: [],
        mahangId: '',
        cosomayId: ''
      });
      handleClose();
    } else {
      if (!!valDefault?.mahangId && !!valDefault?.cosomayId) {
        dispatch(themSC(valDefault, {
          page: 1,
          limit: infoPag?._limit
        }));
        setFormSearch({
          ngaycat: [],
          mahangId: '',
          cosomayId: ''
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
      ngaytao: moment().format('DD/MM/YYYY HH:mm:ss'),
      month: moment().format('MM/YYYY'),
      year: moment().format('YYYY')
    });
    setIsShow(true);
  }

  // show danh s??ch s??? c???t
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

  // show danh s??ch c?? s?? may
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
    setFormSearch({
      ngaycat: [],
      mahangId: '',
      cosomayId: ''
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

  // change select c?? s??? may
  const onChangeSelectCSM = (value) => {
    setValDefault({
      ...valDefault,
      cosomayId: value
    });
  }

  // ===========================================t??m ki???m m?? h??ng, ng??y c???t
  const [formSearch, setFormSearch] = useState({
    ngaycat: null,
    mahangId: '',
    cosomayId: ''
  });

  const onChangeSearchMaHang = (value) => {
    setFormSearch({
      ...formSearch,
      mahangId: value
    });
    handlePaging(1);
  }

  const onChangeSelectSearchCSM = (value) => {
    setFormSearch({
      ...formSearch,
      cosomayId: value
    });
    handlePaging(1);
  }

  const onChangeDateSearch = (value) => {
    setFormSearch({
      ...formSearch,
      ngaycat: value
    });
    handlePaging(1);
  }

  const refreshControl = () => {
    setFormSearch({
      ngaycat: null,
      mahangId: '',
      cosomayId: ''
    });
    handlePaging(1);
  }
  useEffect(() => {
    onSearchSC(formSearch);
  }, [dispatch, formSearch, onSearchSC]);


  return (
    <div className="list-default">
      <div className="title-heading d-flex-between">
        <p className="ttl-list">
          <i className="fa fa-list-alt mr-2" aria-hidden="true"></i>
          Danh s??ch s??? c???t
        </p>
        <div className="d-flex-between align-items-flex-end">
          <div className="search-socat">
            <Row>
              <Col sm="5">
                <Form.Group>
                  <div className="datepicker-custom">
                    <DateRangePicker
                      className={`${formSearch.ngaycat && !!formSearch.ngaycat.length ? 'isValue' : ''}`}
                      onChange={onChangeDateSearch}
                      value={formSearch.ngaycat && !!formSearch.ngaycat.length ? formSearch.ngaycat : null}
                      maxDate={new Date()}
                      format="dd/MM/y"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col sm="3">
                <Form.Group>
                  <div className="select-custom">
                    <Select
                      showSearch
                      value={!!formSearch.mahangId ? formSearch.mahangId : 'T??m m?? h??ng'}
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

              <Col sm="4">
                <Form.Group>
                  <div className="select-custom">
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                      }
                      onChange={onChangeSelectSearchCSM}
                      value={`${!!formSearch?.cosomayId ? formSearch?.cosomayId : 'T??m c?? s???'}`}
                    >
                      {showDSCoSoMay(DSCoSoMay)}
                    </Select>
                  </div>
                </Form.Group>
              </Col>
              <Button variant="default" onClick={refreshControl} className="btn-refresh" title="L??m m???i Table">
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </Button>
            </Row>
          </div>
          
          <Button variant="success" size="sm" className="btn-add ml-3" onClick={handleShow}>
            <i className="fa fa-plus mr-1" aria-hidden="true"></i>
            Th??m
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
            <Modal.Title>{`${!!valDefault?.id ? 'C???p nh???t' : 'Th??m'} m?? h??ng v??o s??? c???t`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(luuSoCat)}>
              <Row>
                <Col sm="3">
                  <Form.Group controlId="ngaycat">
                    <Form.Label>Ng??y c???t</Form.Label>
                    <div className="datepicker-custom mt-2">
                      <DatePicker
                        allowClear={false}
                        placeholder="Ch???n ng??y c???t"
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
                  <Form.Group controlId="slcat">
                    <Form.Label>S??? l?????ng c???t</Form.Label>
                    <span className="prefix">C??i</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormat('slcat', value)}
                      className="form-control"
                      placeholder="Nh???p SL"
                      autoComplete="off"
                      maxLength={6}
                      name="slcat"
                      id="slcat"
                      value={valDefault.slcat}
                    />
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <Form.Group controlId="slgiao">
                    <Form.Label>S??? l?????ng giao</Form.Label>
                    <span className="prefix">C??i</span>
                    <CurrencyFormat 
                      thousandSeparator={true}
                      onValueChange={(value) => onValueChangeFormat('slgiao', value)}
                      className="form-control"
                      placeholder="Nh???p SL"
                      autoComplete="off"
                      maxLength={6}
                      name="slgiao"
                      id="slgiao"
                      value={valDefault.slgiao}
                    />
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group>
                    <Form.Label>C?? s??? may <span>*</span></Form.Label>
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
                        defaultValue={`${!!valDefault?.cosomayId ? valDefault?.cosomayId : 'T??m ki???m c?? s??? may'}`}
                      >
                        {showDSCoSoMay(DSCoSoMay)}
                      </Select>
                      {isError && !valDefault?.cosomayId && <ErrorMsg msgError="Ch??a ch???n c?? s??? may" />}
                    </div>
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
                  H???y
                </Button>
                <Button variant="primary" type="submit" size="sm" className="ml-2">{`${!!valDefault?.id ? 'C???p nh???t' : 'L??u'}`}</Button>
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
                <th className="text-center th-date">Ng??y c???t</th>
                <th className="th-ma text-center">M?? h??ng</th>
                <th className="th-min">T??n h??ng</th>
                <th className="th-sl text-center">SL c???t (c??i)</th>
                <th className="th-sl text-center">SL giao (c??i)</th>
                <th className="th-tencs text-center">C?? s??? may</th>
                <th className="th-min">Ghi ch??</th>
                <th className="text-center th-action">H??nh ?????ng</th>
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
          <Modal.Title>X??c nh???n</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>B???n c?? ch???c l?? x??a m?? h??ng "<span className="font-bold">{detailMH?.mahang}</span>" v??o ng??y c???t "<span className="font-bold">{itemDelete.ngaycat}</span>" kh??ng?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDelete}>H???y</Button>
          <Button variant="danger" size="sm" onClick={onDeleteMH}>X??a</Button>
        </Modal.Footer>
      </Modal>

    </div> 
  );
};

export default DanhSachMH;
