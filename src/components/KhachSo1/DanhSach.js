import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const DanhSachMH = (props) => {
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit'
  });
  const [valDefault, setValDefault] = useState({
    id: '',
    ngaytao: ''
  });
  const [isShow, setIsShow] = useState(false);
  const handleClose = () => {
    setIsShow(false);
  };
  const handleShow = () => {
    setIsShow(true);
  }

  const luuThongTinGiaoHang = (data) => {

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
            {/* {showDSSC(DSSC)} */}
          </tbody>
        </Table>
      </div>

    </div> 
  );
};

export default DanhSachMH;
