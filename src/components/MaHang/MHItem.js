import React from 'react';
import { Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';


const MHItem = (props) => {
  const { index, item, getDetailMH, confirmDeleteMH, currPage } = props;

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <tr>
      <td className="text-center">{index + (currPage - 1) + currPage}</td>
      <td className="text-center">{item.mahang}</td>
      <td>{item.tenhang}</td>
      <td className="text-center">{formatter.format(item.giamay).slice(1)}</td>
      <td className="text-center">{formatter.format(item.gianhap).slice(1)}</td>
      <td className="text-center">{formatter.format(item.giagiao).slice(1)}</td>
      <td>{ReactHtmlParser(item.ghichu.replace(/\n/g, "<br />"))}</td>
      <td className="text-center">
        <Button variant="default" className="button-control reset-button mr-3 btn-edit" onClick={() => getDetailMH(item)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </Button>
        <Button variant="default" className="button-control reset-button btn-delete" onClick={() => confirmDeleteMH(item)} >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
      </td>
    </tr>
  );
};

export default MHItem;