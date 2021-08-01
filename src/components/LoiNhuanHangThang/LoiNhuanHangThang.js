import { DatePicker, Select } from "antd";
import { DATA_KH } from 'constant/currentUser';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { FORMAT_MONEY } from 'services/common';

const { Option } = Select;

const LoiNhuanHangThang = (props) => {
  const { getDSInMonth, objSumMonth, dsInMonth } = props;
  const disabledDate = (current) => {
    return current > moment().endOf('day');
  }
  const [valDefault, setValDefault] = useState({
    thang: '',
    so: []
  });

  const onChangeSelectSo = (value) => {
    setValDefault({
      ...valDefault,
      so: value
    });
  }
  const onChangeMonth = (date, monthString) => {
    setValDefault({
      ...valDefault,
      thang: monthString
    });
  }

  const showDSSo = (list) => {
    let result = null;
    result = list.map((item, index) => {
      return (
        <Option key={index} value={item.value}>{item.name}</Option>
      );
    });
    return result;
  }

  const [isCheck, setIsCheck] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const submitCheckMoney = () => {
    if (!!valDefault.thang && !!valDefault.so.length) {
      setIsCheck(true);
      getDSInMonth(valDefault);
    } else {
      setIsError(true);
      return;
    }
  }

  return (
    <>
      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Col sm="4">
            <Form.Group>
              <Form.Label>Tháng <span>*</span></Form.Label>
              <div className="datepicker-custom mt-2">
                <DatePicker
                  placeholder="Chọn tháng"
                  inputReadOnly={true}
                  disabledDate={disabledDate}
                  picker="month"
                  format="MM/YYYY"
                  onChange={onChangeMonth}
                  className={`${isError && !valDefault.thang ? 'invalid' : ''}`}
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm="4">
            <Form.Group>
              <Form.Label>Sổ <span>*</span></Form.Label>
              <div className={`select-custom mt-2 ${(isError && !valDefault.so.length) ? 'invalid' : ''}`}>
                <Select
                  showSearch
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={onChangeSelectSo}
                  placeholder="Tìm kiếm sổ"
                >
                  {showDSSo(DATA_KH)}
                </Select>
              </div>
            </Form.Group>
          </Col>
          <Col sm="4">
            <Form.Group>
              <Form.Label>&nbsp;</Form.Label>
              <div className="mt-2">
                <Button variant="info" size="sm" className="btn-add" onClick={submitCheckMoney}>
                  <i className="fa fa-search mr-1" aria-hidden="true"></i>
                  Kiểm tra
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {isCheck && !!dsInMonth.length ?
        <div className="detail-money-block">
          <ul>
            <li>
              <span className="ttl-detail">Tổng số lượng đã giao</span>
              {FORMAT_MONEY.format(objSumMonth.sumSLGiaoInMonth)} cái
            </li>
            <li>
              <span className="ttl-detail">Tổng số lượng hàng lỗi</span>
              {FORMAT_MONEY.format(objSumMonth.sumSLFailInMonth)} cái
            </li>
            <li>
              <span className="ttl-detail">Tổng tiền hàng lỗi</span>
              {FORMAT_MONEY.format(objSumMonth.sumMoneyFailInMonth)} vnđ
            </li>
            <li>
              <span className="ttl-detail">Tổng lợi nhuận 1</span>
              {FORMAT_MONEY.format(objSumMonth.sumLN1InMonth)} vnđ
            </li>
            <li>
              <span className="ttl-detail">Tổng lợi nhuận 2</span>
              {FORMAT_MONEY.format(objSumMonth.sumLN2InMonth)} vnđ
            </li>
            <li>
              <span className="ttl-detail">Tổng chi TT</span>
              {FORMAT_MONEY.format(objSumMonth.sumLN1InMonth)} vnđ
            </li>
          </ul>
        </div>
        :
        <p>Không có thông tin cho dữ liệu đang tìm...</p>
      }
    </>
  );
};

export default LoiNhuanHangThang;
