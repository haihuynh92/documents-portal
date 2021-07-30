import { CONFIG_MONEY } from 'constant/currentUser';
import _ from 'lodash';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { FORMAT_MONEY } from 'services/common';

const SCCItem = (props) => {
  const { data, confirmDeleteTL, confirmDeleteTUTBD, getDetailTL, getInfoTL } = props;

  const arrDate = Object.keys(data);
    // =========================
    let luongGio = getInfoTL.luongcoban/26/9;
    let resultFinal = null;
    resultFinal = arrDate.map((item, i) => {
      let result = null;
      const sortDate = data[arrDate[i]].slice().sort((a, b) => a.ngaytao > b.ngaytao ? -1 : 1);

      result = sortDate.map((item, j) => {
        let count = sortDate.length;
        let isTT = sortDate[j]['thongtin'] === 'chamcong' ? 'CC' : sortDate[j]['thongtin'] === 'tienung' ? 'TU' : 'BD';
        
        let getSunday = moment(item['ngaynhap'], 'DD/MM/YYYY').isoWeekday();
        
        let gioTC = !!item.giotangca ? (+item.giotangca * luongGio) * CONFIG_MONEY.tangca : 0;
        let thanhTien = getSunday === CONFIG_MONEY.sunday ? +item.giolam * luongGio * CONFIG_MONEY.cn : +item.giolam * luongGio;
        let sumTT = FORMAT_MONEY.format((parseFloat(thanhTien) + gioTC));

        console.log(thanhTien);

        return (
          <tr key={item.id} className={item.thanhtoan ? 'tr-disabled' : ''}>
            {j < 1 && <td className={`text-center ${getSunday === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`} rowSpan={count}>{item.ngaynhap}</td>}

            {['CC'].includes(isTT) && <td className={`text-center ${getSunday === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>
              <Button variant="default" className="button-control reset-button mr-3 btn-edit" onClick={() => getDetailTL(item)}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </Button>
              <Button variant="default" className="button-control reset-button btn-delete" onClick={() => confirmDeleteTL(item)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>
            </td>}

            {['CC'].includes(isTT) ? 
              <td className={`text-center ${getSunday === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>{item.giolam}</td>
              : 
              <td className={`text-right td-relative ${isTT === 'TU' ? 'td-bgd-yellow' : 'td-bgd-blue'}`} colSpan="4">
                <Button variant="default" className="button-control reset-button btn-delete btn-delete-ab" onClick={() => confirmDeleteTUTBD(item.id)}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                {isTT === 'TU' ? 'Tiền ứng' : 'Tiền bồi dưỡng'}
              </td> 
            }

            {['CC'].includes(isTT) && <td className={`text-center ${getSunday === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>{item.giotangca}</td>}

            {['CC'].includes(isTT) && <td className={`text-center ${getSunday === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>{item.tiencom ? 'Có' : 'Không'}</td>}

            <td className={`text-center ${getSunday === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>
              {isTT === 'TU' ? FORMAT_MONEY.format(item.tienung) : isTT === 'BD' ? FORMAT_MONEY.format(item.tienbd) : sumTT}
            </td>

          </tr>
        );
      });
      
      return result;
    });

    return resultFinal;
};

export default SCCItem;
