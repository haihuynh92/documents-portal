import React from 'react';
import { Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';


const CSItem = (props) => {
  const { index, item, getDetailCSM, confirmDeleteCSM } = props;

  return (
    <tr>
      <td className="text-center">{index + 1}</td>
      <td className="text-center">{item.macs}</td>
      <td className="text-center">{item.tencs}</td>
      <td>{item.diachi}</td>
      <td className="text-center">{item.sdt}</td>
      <td>{ReactHtmlParser(item.ghichu.replace(/\n/g, "<br />"))}</td>
      <td className="text-center">
        <Button variant="default" className="button-control reset-button mr-3 btn-edit" onClick={() => getDetailCSM(item)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </Button>
        <Button variant="default" className="button-control reset-button btn-delete" onClick={() => confirmDeleteCSM(item)} >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
      </td>
    </tr>
  );
};

export default CSItem;