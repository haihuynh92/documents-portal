import { ROLE } from 'constant/currentUser';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import { formatter } from 'services/common';

const KHItem = (props) => {
  const { data, listMH, confirmDeleteKH, confirmDeleteTTVPL, viewLN, currentUser, isTypeBook } = props;

  const arrDate = Object.keys(data);
    const cloneArr = [...arrDate];
    const reverseArr = _.reverse(cloneArr);
    
    let arrMoneyFail = [];
    let arrMoneyVPL = [];
    let arrMoneyCustomer = [];
    let arrMoneyTotalDay = [];
    let arrMoneyAfterMinusAll = [];
    let arrMoneyFinal = [];
    let arrTotalFail = [];
    let arrTotalSend = [];
    
    // tính tổng tiền trong ngày
    for(let k = 0; k < reverseArr.length; k++) {
      let totalMoneyCustomer = 0;
      let totalCountMoneyDay = 0;
      let totalCountMoneyFail = 0;
      let totalCountMoneyVPL = 0;
      let totalFail = 0;
      let totalSend = 0;

      // thông tin tiền vải, phụ liệu
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'tienvaiphulieu') {
          totalCountMoneyVPL += +x.tienvaiphulieu;
        }
        return totalCountMoneyVPL;
      });
      arrMoneyVPL.push(totalCountMoneyVPL);

      // thông tin hàng lỗi
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'hangloi') {
          if(isTypeBook === ROLE.NOI_BO) {
            let gianhap = _.filter(listMH, k => {return k.id === x.mahangId})[0]['gianhap'];
            totalCountMoneyFail += +x.slhu * gianhap;
          } else {
            let giagiao = _.filter(listMH, k => {return k.id === x.mahangId})[0]['giagiao'];
            totalCountMoneyFail += +x.slhu * giagiao;
          }
          totalFail += +x.slhu;
        }
        return totalCountMoneyFail && totalFail;
      });
      arrMoneyFail.push(totalCountMoneyFail);
      arrTotalFail.push(totalFail);

      // thông tin tiền khách đưa trước
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'tientratruoc') {
          totalMoneyCustomer += +x.tientratruoc;
        }
        return totalMoneyCustomer;
      });
      arrMoneyCustomer.push(totalMoneyCustomer);

      // thông tin giao hàng
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'giaohang') {
          if(isTypeBook === ROLE.NOI_BO) {
            let gianhap = _.filter(listMH, k => {return k.id === x.mahangId})[0]['gianhap'];
            totalCountMoneyDay += +x.slgiao * gianhap;
          } else {
            let giagiao = _.filter(listMH, k => {return k.id === x.mahangId})[0]['giagiao'];
            totalCountMoneyDay += +x.slgiao * giagiao;
          }
          totalSend += +x.slgiao;
        }
        return totalCountMoneyDay && totalSend;
      });
      arrMoneyTotalDay.push(totalCountMoneyDay);
      arrTotalSend.push(totalSend);
      arrMoneyAfterMinusAll.push(totalCountMoneyDay - totalMoneyCustomer - totalCountMoneyFail - totalCountMoneyVPL);
    }

    // tính tổng tiền còn lại sau khi khách đưa tiền trước
    arrMoneyFinal.push(arrMoneyAfterMinusAll[0]);
    for(let e = 1; e < arrMoneyAfterMinusAll.length; e++) {
      if (e >= 1) {
        arrMoneyFinal.push(arrMoneyAfterMinusAll[e] + arrMoneyFinal[e-1]);
      }
    }

    // 
    const reverseArrMoneyFinal = _.reverse(arrMoneyFinal);
    const reverseArrMoneyTotalDay = _.reverse(arrMoneyTotalDay);
    const reverseArrMoneyCustomer = _.reverse(arrMoneyCustomer);
    const reverseArrMoneyFail = _.reverse(arrMoneyFail);
    const reverseArrMoneyVPL = _.reverse(arrMoneyVPL);
    const reverseArrTotalFail = _.reverse(arrTotalFail);
    const reverseArrTotalSend = _.reverse(arrTotalSend);
   
    // =========================
    let resultFinal = null;
    resultFinal = arrDate.map((item, i) => {
      let result = null;
      const sortDate = data[arrDate[i]].slice().sort((a, b) => a.ngaytao > b.ngaytao ? -1 : 1);
      const getThongTinGH = _.filter(sortDate, (x) => {return x.thongtin === 'giaohang'});

      result = sortDate.map((item, j) => {
        let count = sortDate.length;
        let isTT = sortDate[j]['thongtin'] === 'giaohang' ? 'GH' : sortDate[j]['thongtin'] === 'tientratruoc' ? 'TT' : sortDate[j]['thongtin'] === 'tienvaiphulieu' ? 'VPL' : 'HL';
        let detailMH = _.filter(listMH, (x) => {return x.id === sortDate[j]['mahangId']});

        return (
          <tr key={item.id}>
            {j < 1 && 
              <td className="text-center" rowSpan={count}>
                {sortDate[j]['ngaynhap']}
                {JSON.parse(currentUser)?.role === ROLE.ADMIN &&
                  <Button variant="default" size="sm" className="btn-view" onClick={() => viewLN(getThongTinGH)}>
                    <i className="fa fa-eye mr-1" aria-hidden="true"></i>
                    Xem
                  </Button>
                }
              </td>
            }
            
            {['GH', 'HL'].includes(isTT) && <td className={`text-center ${isTT === 'HL' ? 'td-bgd-red' : ''}`}>
              <Button variant="default" className="button-control reset-button btn-delete" onClick={() => confirmDeleteKH(item)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>
            </td>}

            {['TT', 'VPL'].includes(isTT) ? 
              <td className={`text-right td-relative ${isTT === 'TT' ? 'td-bgd-yellow' : 'td-bgd-blue'}`} colSpan="6">
                <Button variant="default" className="button-control reset-button btn-delete btn-delete-ab" onClick={() => confirmDeleteTTVPL(item.id)}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                {isTT === 'TT' ? 'Tiền khách trả trước' : 'Tiền vải, phụ liệu'}
              </td> 
              : 
              <td className={`text-center ${isTT === 'HL' && 'td-bgd-red'}`}>{detailMH.length && detailMH[0]?.mahang}</td>
            }
            

            {['GH', 'HL'].includes(isTT) && <td className={`${isTT === 'HL' && 'td-bgd-red'}`}>{detailMH.length && detailMH[0]?.tenhang}</td>}

            {['GH', 'HL'].includes(isTT) && <td className={`text-center ${isTT === 'HL' && 'td-bgd-red'}`}>{isTypeBook === ROLE.NOI_BO && detailMH.length ? formatter.format(detailMH[0]?.gianhap) : formatter.format(detailMH[0]?.giagiao)}</td>}

            {isTT === 'GH' ? <td className="text-center">{formatter.format(sortDate[j]['slgiao'])}</td> : isTT === 'HL' && <td className="text-center td-bgd-red">0</td>}

            {isTT === 'GH' ? <td className="text-center">0</td> : isTT === 'HL' && <td className="text-center td-bgd-red">{formatter.format(sortDate[j]['slhu'])}</td>}

            {isTT === 'GH' ? 
              <td className="text-center">{isTypeBook === ROLE.NOI_BO ? formatter.format(sortDate[j]['slgiao'] * detailMH[0]?.gianhap) : formatter.format(sortDate[j]['slgiao'] * detailMH[0]?.giagiao)}</td> 
              : isTT === 'HL' ? 
              <td className="text-center td-bgd-red">{isTypeBook === ROLE.NOI_BO ? formatter.format(sortDate[j]['slhu'] * detailMH[0]?.gianhap) : formatter.format(sortDate[j]['slhu'] * detailMH[0]?.giagiao)}</td> 
              : isTT === 'TT' ? 
              <td className="text-center td-bgd-yellow">{formatter.format(sortDate[j]['tientratruoc'])}</td> 
              : 
              <td className="text-center td-bgd-blue">{formatter.format(sortDate[j]['tienvaiphulieu'])}</td>
            }

            <td className={`${isTT === 'TT' ? 'td-bgd-yellow' : isTT === 'HL' ? 'td-bgd-red' : isTT === 'VPL' ? 'td-bgd-blue' : ''}`}>{ReactHtmlParser(sortDate[j]['ghichu'].replace(/\n/g, "<br />"))}</td>

            {j < 1 && <td className="text-center" rowSpan={count}>{formatter.format(reverseArrTotalSend[i])}</td>}

            {j < 1 && <td className="text-center td-bgd-red" rowSpan={count}>{formatter.format(reverseArrTotalFail[i])}</td>}

            {j < 1 && <td className="text-center" rowSpan={count}>{formatter.format(reverseArrMoneyTotalDay[i])}</td>}

            {j < 1 && <td className="text-center td-bgd-blue" rowSpan={count}>{formatter.format(reverseArrMoneyVPL[i])}</td>}

            {j < 1 && <td className="text-center td-bgd-red" rowSpan={count}>{formatter.format(reverseArrMoneyFail[i])}</td>}

            {j < 1 && <td className="text-center td-bgd-yellow" rowSpan={count}>{formatter.format(reverseArrMoneyCustomer[i])}</td>}

            {j < 1 && <td className={`text-center ${i === 0 && j === 0 ? 'td-bgd-purple' : ''}`} rowSpan={count}>{reverseArrMoneyFinal[i] > 0 ? formatter.format(reverseArrMoneyFinal[i]) : formatter.format(reverseArrMoneyFinal[i])}</td>}
          </tr>
        );
      });
      
      return result;
    });

    return resultFinal;
};

export default KHItem;
