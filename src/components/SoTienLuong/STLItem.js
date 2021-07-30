import { CONFIG_MONEY } from 'constant/currentUser';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { FORMAT_MONEY } from 'services/common';

const STLItem = (props) => {
  const { data, confirmDeleteTL, confirmDeleteTUTBD, getDetailTL, getInfoTL } = props;

  const arrDate = Object.keys(data);
    const cloneArr = [...arrDate];
    const reverseArr = _.reverse(cloneArr);
    
    let arrMoneyFail = [];
    let arrMoneyCustomerU = [];
    let arrMoneyAfterMinusAll = [];
    
    // tính tổng tiền trong ngày
    for(let k = 0; k < reverseArr.length; k++) {
      let totalMoneyCustomerU = 0;
      let totalCountMoneyDay = 0;
      let totalCountMoneyFail = 0;

      // thông tin hàng lỗi
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'hangloi') {
          totalCountMoneyFail += +x.slhu * x.giasua;
        }
        return totalCountMoneyFail;
      });
      arrMoneyFail.push(totalCountMoneyFail);

      // thông tin tiền ứng
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'tienung') {
          totalMoneyCustomerU += +x.tienung;
        }
        return totalMoneyCustomerU;
      });
      arrMoneyCustomerU.push(totalMoneyCustomerU);

      // thông tin giao hàng
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'chamcong') {
          // totalCountMoneyDay += +x.slgiao * giamay;
        }
        return totalCountMoneyDay;
      });
      arrMoneyAfterMinusAll.push(totalCountMoneyDay - totalMoneyCustomerU - totalCountMoneyFail);
    }
    
    // 
    const reverseArrMoneyAfterMinusAll = _.reverse(arrMoneyAfterMinusAll);
    const reverseArrMoneyCustomerU = _.reverse(arrMoneyCustomerU);
    const reverseArrMoneyFail = _.reverse(arrMoneyFail);
    
    // =========================
    let luongGio = (getInfoTL.luongcoban/26)/9;
    let resultFinal = null;
    resultFinal = arrDate.map((item, i) => {
      let result = null;
      const sortDate = data[arrDate[i]].slice().sort((a, b) => a.ngaytao > b.ngaytao ? -1 : 1);

      result = sortDate.map((item, j) => {
        let count = sortDate.length;
        let isTT = sortDate[j]['thongtin'] === 'chamcong' ? 'CC' : sortDate[j]['thongtin'] === 'tienung' ? 'TU' : 'BD';
        let gioTC = !!item.giotangca ? item.giotangca * CONFIG_MONEY.tangca : 0;
        let thanhTien = new Intl.NumberFormat('de-DE').format(item.giolam * luongGio);
        let sumTT = parseFloat(thanhTien) + gioTC;
        
        return (
          <tr key={item.id} className={item.thanhtoan ? 'tr-disabled' : ''}>
            {j < 1 && <td className="text-center" rowSpan={count}>{sortDate[j]['ngaynhap']}</td>}

            {['CC'].includes(isTT) && <td className="text-center">
              <Button variant="default" className="button-control reset-button mr-3 btn-edit" onClick={() => getDetailTL(item)}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </Button>
              <Button variant="default" className="button-control reset-button btn-delete" onClick={() => confirmDeleteTL(item)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>
            </td>}

            {['CC'].includes(isTT) ? 
              <td className="text-center">{item.giolam}</td>
              : 
              <td className={`text-right td-relative ${isTT === 'TU' ? 'td-bgd-yellow' : 'td-bgd-blue'}`} colSpan="4">
                <Button variant="default" className="button-control reset-button btn-delete btn-delete-ab" onClick={() => confirmDeleteTUTBD(item.id)}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                {isTT === 'TU' ? 'Tiền ứng' : 'Tiền bồi dưỡng'}
              </td> 
            }

            {['CC'].includes(isTT) && <td className="text-center">{item.giotangca}</td>}

            {['CC'].includes(isTT) && <td className="text-center">{item.tiencom ? 'Có' : 'Không'}</td>}

            <td className="text-center">
              {isTT === 'TU' ? FORMAT_MONEY.format(item.tienung) : isTT === 'BD' ? FORMAT_MONEY.format(item.tienbd) : sumTT}
            </td>

          </tr>
        );
      });
      
      return result;
    });

    return resultFinal;
};

export default STLItem;
