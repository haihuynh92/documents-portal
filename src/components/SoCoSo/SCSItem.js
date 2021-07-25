import { ROLE } from 'constant/currentUser';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import { formatter } from 'services/common';

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

            {['GH', 'HL'].includes(isTT) && <td className={`text-center ${['HL'].includes(isTT) ? 'td-bgd-red' : ''}`}>{isTypeBook === ROLE.SO_KET ? formatter.format(detailMH[0]?.giaket).slice(1) : formatter.format(detailMH[0]?.giamay).slice(1)}</td>}

            {['GH'].includes(isTT) ? <td className="text-center">{formatter.format(sortDate[j]['slgiao']).slice(1)}</td> : ['HL'].includes(isTT) && <td className="text-center td-bgd-red">0</td>}

            {!['TU'].includes(isTT) && <td className={`text-center ${['HL'].includes(isTT) ? 'td-bgd-red' : ''}`}>{['GH'].includes(isTT) ? 0 : formatter.format(sortDate[j]['giasua']).slice(1)}</td>}

            {['GH'].includes(isTT) ? <td className="text-center">0</td> : ['HL'].includes(isTT) && <td className="text-center td-bgd-red">{formatter.format(sortDate[j]['slhu']).slice(1)}</td>}

            {['GH'].includes(isTT) ? 
              <td className="text-center">{isTypeBook === ROLE.SO_KET ? formatter.format(sortDate[j]['slgiao'] * detailMH[0]?.giaket).slice(1) : formatter.format(sortDate[j]['slgiao'] * detailMH[0]?.giamay).slice(1)}</td> 
              : ['HL'].includes(isTT) ? 
              <td className="text-center td-bgd-red">{formatter.format(sortDate[j]['slhu'] * sortDate[j]['giasua']).slice(1)}</td> 
              : <td className="text-center td-bgd-yellow">{formatter.format(sortDate[j]['tienung']).slice(1)}</td> 
            }

            <td className={`${isTT === 'TU' ? 'td-bgd-yellow' : ['HL'].includes(isTT) ? 'td-bgd-red' : ''}`}>{ReactHtmlParser(sortDate[j]['ghichu'].replace(/\n/g, "<br />"))}</td>

            {j < 1 && <td className="text-center td-bgd-red" rowSpan={count}>{formatter.format(reverseArrMoneyFail[i]).slice(1)}</td>}

            {j < 1 && <td className="text-center td-bgd-yellow" rowSpan={count}>{formatter.format(reverseArrMoneyCustomerU[i]).slice(1)}</td>}

            {j < 1 && <td className="text-center" rowSpan={count}>{reverseArrMoneyAfterMinusAll[i] > 0 ? formatter.format(reverseArrMoneyAfterMinusAll[i]).slice(1) : formatter.format(reverseArrMoneyAfterMinusAll[i]).replace(formatter.format(reverseArrMoneyAfterMinusAll[i]).slice(1, 2), '')}</td>}
          </tr>
        );
      });
      
      return result;
    });

    return resultFinal;
};

export default SCSItem;
