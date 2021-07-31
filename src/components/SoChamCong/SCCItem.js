import { CONFIG_MONEY } from 'constant/currentUser';
import { Button } from 'react-bootstrap';
import { FORMAT_MONEY, GET_SUNDAY } from 'services/common';

const SCCItem = (props) => {
  const { data, confirmDeleteTL, confirmDeleteTUTBD, getDetailTL, luongGio } = props;

  const arrDate = Object.keys(data);
    let resultFinal = null;

    resultFinal = arrDate.map((item, i) => {
      let result = null;
      const sortDate = data[arrDate[i]].slice().sort((a, b) => a.ngaytao > b.ngaytao ? -1 : 1);

      result = sortDate.map((item, j) => {
        let count = sortDate.length;
        let isTT = sortDate[j]['thongtin'] === 'chamcong' ? 'CC' : sortDate[j]['thongtin'] === 'tienung' ? 'TU' : 'BD';
        
        let tiencom = item.tiencom ? CONFIG_MONEY.tiencom : 0;
        let gioTC = !!item.giotangca ? (+item.giotangca * luongGio) * CONFIG_MONEY.tangca : 0;
        let thanhTien = GET_SUNDAY(item.ngaynhap) === CONFIG_MONEY.sunday ? +item.giolam * luongGio * CONFIG_MONEY.cn : +item.giolam * luongGio;
        let sumTT = FORMAT_MONEY.format(thanhTien + gioTC + tiencom);

        return (
          <tr key={item.id} className={item.thanhtoan ? 'tr-disabled' : ''}>
            {j < 1 && <td className="text-center" rowSpan={count}>{item.ngaynhap}</td>}

            {['CC'].includes(isTT) && <td className={`text-center ${GET_SUNDAY(item.ngaynhap) === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>
              {!item.thanhtoan ? 
                <>
                  <Button variant="default" className="button-control reset-button mr-3 btn-edit" onClick={() => getDetailTL(item)}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Button>
                  <Button variant="default" className="button-control reset-button btn-delete" onClick={() => confirmDeleteTL(item)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </Button>
                </>
                : 
                "Đã thanh toán"
              }
            </td>}

            {['CC'].includes(isTT) ? 
              <td className={`text-center ${GET_SUNDAY(item.ngaynhap) === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>{item.giolam}</td>
              : 
              <td className={`text-right td-relative ${isTT === 'TU' ? 'td-bgd-yellow' : 'td-bgd-blue'}`} colSpan="4">
                <Button variant="default" className="button-control reset-button btn-delete btn-delete-ab" onClick={() => confirmDeleteTUTBD(item.id)}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                {isTT === 'TU' ? !item.thanhtoan ? 'Tiền ứng' : 'Đã trừ tiền ứng' : isTT === 'BD' ? !item.thanhtoan ? 'Tiền bồi dưỡng' : 'Đã cộng tiền bồi dưỡng' : ''}
              </td> 
            }

            {['CC'].includes(isTT) && <td className={`text-center ${GET_SUNDAY(item.ngaynhap) === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>{item.giotangca}</td>}

            {['CC'].includes(isTT) && <td className={`text-center ${GET_SUNDAY(item.ngaynhap) === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>{item.tiencom ? 'Có' : 'Không'}</td>}

            <td className={`text-center ${GET_SUNDAY(item.ngaynhap) === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''} ${isTT === 'TU' ? 'td-bgd-yellow' : isTT === 'BD' ? 'td-bgd-blue' : ''}`}>
              {isTT === 'TU' ? FORMAT_MONEY.format(item.tienung) : isTT === 'BD' ? FORMAT_MONEY.format(item.tienbd) : parseFloat(sumTT)}
            </td>
            
            <td className={`${isTT === 'TU' ? 'td-bgd-yellow' : isTT === 'BD' ? 'td-bgd-blue' : ''} ${GET_SUNDAY(item.ngaynhap) === CONFIG_MONEY.sunday ? 'td-bgd-red' : ''}`}>{['TU'].includes(isTT) && item.ghichu}</td>

          </tr>
        );
      });
      
      return result;
    });

    return resultFinal;
};

export default SCCItem;
