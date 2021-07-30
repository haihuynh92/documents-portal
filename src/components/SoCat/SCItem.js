import _ from 'lodash';
import React from 'react';
import { Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import { FORMAT_MONEY } from 'services/common';

const SCItem = (props) => {
  const { item, getDetailSC, confirmDeleteSC, listCSM, listMH } = props;
  const detailCSM = _.filter(listCSM, (x) => {return x.id === item?.cosomayId});
  const detailMH = _.filter(listMH, (x) => {return x.id === item?.mahangId});

  return (
    <tr>
      <td className="text-center">{item.ngaycat}</td>
      <td className="text-center">{detailMH.length && detailMH[0]?.mahang}</td>
      <td>{detailMH.length && detailMH[0]?.tenhang}</td>
      <td className="text-center">{FORMAT_MONEY.format(item.slcat)}</td>
      <td className="text-center">{FORMAT_MONEY.format(item.slgiao)}</td>
      <td className="text-center">{detailCSM.length && detailCSM[0]?.tencs}</td>
      <td>{ReactHtmlParser(item.ghichu.replace(/\n/g, "<br />"))}</td>
      <td className="text-center">
        <Button variant="default" className="button-control reset-button mr-3 btn-edit" onClick={() => getDetailSC(item)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </Button>
        <Button variant="default" className="button-control reset-button btn-delete" onClick={() => confirmDeleteSC(item, detailMH)} >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
      </td>
    </tr>
  );
};

export default SCItem;