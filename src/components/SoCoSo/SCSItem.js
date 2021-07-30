import { ROLE } from 'constant/currentUser';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import { FORMAT_MONEY } from 'services/common';

const SCSItem = (props) => {
  const { data, listMH, confirmDeleteSCS, confirmDeleteTU, isTypeBook } = props;

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
        if (x.thongtin === 'giaohang') {
          if(isTypeBook === ROLE.SO_KET) {
            let giaket = _.filter(listMH, k => {return k.id === x.mahangId})[0]['giaket'];
            totalCountMoneyDay += +x.slgiao * giaket;
          } else {
            let giamay = _.filter(listMH, k => {return k.id === x.mahangId})[0]['giamay'];
            totalCountMoneyDay += +x.slgiao * giamay;
          }
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
    let resultFinal = null;
    resultFinal = arrDate.map((item, i) => {
      let result = null;
      const sortDate = data[arrDate[i]].slice().sort((a, b) => a.ngaytao > b.ngaytao ? -1 : 1);

      result = sortDate.map((item, j) => {
        let count = sortDate.length;
        let isTT = sortDate[j]['thongtin'] === 'giaohang' ? 'GH' : sortDate[j]['thongtin'] === 'tienung' ? 'TU' : 'HL';
        let detailMH = _.filter(listMH, (x) => {return x.id === sortDate[j]['mahangId']});

        return (
          <tr key={item.id} className={item.thanhtoan ? 'tr-disabled' : ''}>
            {j < 1 && <td className="text-center" rowSpan={count}>{sortDate[j]['ngaynhap']}</td>}

            {['GH', 'HL'].includes(isTT) && <td className={`text-center ${['HL'].includes(isTT) ? 'td-bgd-red' : ''}`}>
              <Button variant="default" className="button-control reset-button btn-delete" onClick={() => confirmDeleteSCS(item)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>
            </td>}

            {['TU'].includes(isTT) ? 
              <td className="text-right td-relative td-bgd-yellow" colSpan="7">
                <Button variant="default" className="button-control reset-button btn-delete btn-delete-ab" onClick={() => confirmDeleteTU(item.id)}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                Tiền ứng
              </td> 
              : 
              <td className={`text-center ${['HL'].includes(isTT) ? 'td-bgd-red' : ''}`}>{detailMH.length && detailMH[0]?.mahang}</td>
            }
            

            {['GH', 'HL'].includes(isTT) && <td className={`${['HL'].includes(isTT) && 'td-bgd-red'}`}>{detailMH.length && detailMH[0]?.tenhang}</td>}

            {['GH', 'HL'].includes(isTT) && <td className={`text-center ${['HL'].includes(isTT) ? 'td-bgd-red' : ''}`}>{isTypeBook === ROLE.SO_KET ? FORMAT_MONEY.format(detailMH[0]?.giaket) : FORMAT_MONEY.format(detailMH[0]?.giamay)}</td>}

            {['GH'].includes(isTT) ? <td className="text-center">{FORMAT_MONEY.format(sortDate[j]['slgiao'])}</td> : ['HL'].includes(isTT) && <td className="text-center td-bgd-red">0</td>}

            {!['TU'].includes(isTT) && <td className={`text-center ${['HL'].includes(isTT) ? 'td-bgd-red' : ''}`}>{['GH'].includes(isTT) ? 0 : FORMAT_MONEY.format(sortDate[j]['giasua'])}</td>}

            {['GH'].includes(isTT) ? <td className="text-center">0</td> : ['HL'].includes(isTT) && <td className="text-center td-bgd-red">{FORMAT_MONEY.format(sortDate[j]['slhu'])}</td>}

            {['GH'].includes(isTT) ? 
              <td className="text-center">{isTypeBook === ROLE.SO_KET ? FORMAT_MONEY.format(sortDate[j]['slgiao'] * detailMH[0]?.giaket) : FORMAT_MONEY.format(sortDate[j]['slgiao'] * detailMH[0]?.giamay)}</td> 
              : ['HL'].includes(isTT) ? 
              <td className="text-center td-bgd-red">{FORMAT_MONEY.format(sortDate[j]['slhu'] * sortDate[j]['giasua'])}</td> 
              : <td className="text-center td-bgd-yellow">{FORMAT_MONEY.format(sortDate[j]['tienung'])}</td> 
            }

            <td className={`${isTT === 'TU' ? 'td-bgd-yellow' : ['HL'].includes(isTT) ? 'td-bgd-red' : ''}`}>{ReactHtmlParser(sortDate[j]['ghichu'].replace(/\n/g, "<br />"))}</td>

            {j < 1 && <td className="text-center td-bgd-red" rowSpan={count}>{FORMAT_MONEY.format(reverseArrMoneyFail[i])}</td>}

            {j < 1 && <td className="text-center td-bgd-yellow" rowSpan={count}>{FORMAT_MONEY.format(reverseArrMoneyCustomerU[i])}</td>}

            {j < 1 && <td className="text-center" rowSpan={count}>{reverseArrMoneyAfterMinusAll[i] > 0 ? FORMAT_MONEY.format(reverseArrMoneyAfterMinusAll[i]) : FORMAT_MONEY.format(reverseArrMoneyAfterMinusAll[i])}</td>}
          </tr>
        );
      });
      
      return result;
    });

    return resultFinal;
};

export default SCSItem;
