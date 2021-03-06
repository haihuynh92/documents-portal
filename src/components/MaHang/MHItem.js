import { CONFIG_MONEY } from 'constant/currentUser';
import React from 'react';
import { Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import { FORMAT_MONEY } from 'services/common';

const MHItem = (props) => {
  const { index, item, getDetailMH, confirmDeleteMH, currPage } = props;

  return (
    <tr>
      <td className="text-center">{index + (currPage - 1) + currPage}</td>
      <td className="text-center">{item.mahang}</td>
      <td>{item.tenhang}</td>
      <td className="text-center">{FORMAT_MONEY.format(item.giamay)}</td>
      <td className="text-center">{FORMAT_MONEY.format(item.giachau)}</td>
      <td className="text-center">{FORMAT_MONEY.format(item.giaket)}</td>
      <td className="text-center">{FORMAT_MONEY.format(item.gianhap)}</td>
      <td className="text-center">{FORMAT_MONEY.format(item.giagiao)}</td>
      <td className="text-center">{FORMAT_MONEY.format(item.giagiao - item.gianhap - CONFIG_MONEY.default)}</td>
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