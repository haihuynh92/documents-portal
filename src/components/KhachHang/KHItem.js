import _ from 'lodash';
import { Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

const KHItem = (props) => {
  const { data, listMH, confirmDeleteKH, confirmDeleteTT } = props;

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });

  const arrDate = Object.keys(data);
    const cloneArr = [...arrDate];
    const reverseArr = _.reverse(cloneArr);
    
    let arrMoneyFail = [];
    let arrMoneyCustomer = [];
    let arrMoneyTotalDay = [];
    let arrMoneyAfterMinusCustomer = [];
    let arrMoneyFinal = [];
    
    // tính tổng tiền trong ngày
    for(let k = 0; k < reverseArr.length; k++) {
      let totalMoneyCustomer = 0;
      let totalCountMoneyDay = 0;
      let totalCountMoneyFail = 0;

      // thông tin hàng lỗi
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'hangloi') {
          let giagiao = _.filter(listMH, k => {return k.id === x.mahangId})[0]['giagiao'];
          totalCountMoneyFail += parseInt(x.slhu) * giagiao;
        }
        return totalCountMoneyFail;
      });
      arrMoneyFail.push(totalCountMoneyFail);

      // thông tin tiền khách đưa trước
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'tientratruoc') {
          totalMoneyCustomer += parseInt(x.tientratruoc);
        }
        return totalMoneyCustomer;
      });
      arrMoneyCustomer.push(totalMoneyCustomer);

      // thông tin giao hàng
      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'giaohang') {
          let giagiao = _.filter(listMH, k => {return k.id === x.mahangId})[0]['giagiao'];
          totalCountMoneyDay += parseInt(x.slgiao) * giagiao;;
        }
        return totalCountMoneyDay;
      });
      arrMoneyTotalDay.push(totalCountMoneyDay);
      arrMoneyAfterMinusCustomer.push(totalCountMoneyDay - totalMoneyCustomer - totalCountMoneyFail);
    }

    // tính tổng tiền còn lại sau khi khách đưa tiền trước
    arrMoneyFinal.push(arrMoneyAfterMinusCustomer[0]);
    for(let e = 1; e < arrMoneyAfterMinusCustomer.length; e++) {
      if (e >= 1) {
        arrMoneyFinal.push(arrMoneyAfterMinusCustomer[e] + arrMoneyFinal[e-1]);
      }
    }
    const reverseArrMoneyFinal = _.reverse(arrMoneyFinal);
    const reverseArrMoneyTotalDay = _.reverse(arrMoneyTotalDay);
    const reverseArrMoneyCustomer = _.reverse(arrMoneyCustomer);
    const reverseArrMoneyFail = _.reverse(arrMoneyFail);
    
    // 
    // for(let i = 0; i < arrDate.length; i++) {
    let resultFinal = null;
    resultFinal = arrDate.map((item, i) => {
      let result = null;
      const sortDate = data[arrDate[i]][0]['thongtin'] === 'giaohang' ? data[arrDate[i]].slice().sort((a, b) => a.ngaytao > b.ngaytao ? -1 : 1) : data[arrDate[i]].slice().sort((a, b) => b.ngaytao > a.ngaytao ? -1 : 1);

      result = sortDate.map((item, j) => {
        let count = sortDate.length;
        let isTT = sortDate[j]['thongtin'] === 'giaohang' ? 'GH' : sortDate[j]['thongtin'] === 'tientratruoc' ? 'TT' : 'HL';
        let detailMH = _.filter(listMH, (x) => {return x.id === sortDate[j]['mahangId']});

        return (
          <tr key={item.id}>
            {j < 1 && <td className="text-center" rowSpan={count}>{sortDate[j]['ngaynhap']}</td>}
            
            {isTT !== 'TT' && <td className="text-center">
              <Button variant="default" className="button-control reset-button btn-delete" onClick={() => confirmDeleteKH(item)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>
            </td>}

            {isTT === 'TT' ? 
              <td className="text-right td-bgd td-relative" colSpan="6">
                <Button variant="default" className="button-control reset-button btn-delete btn-delete-ab" onClick={() => confirmDeleteTT(item.id)}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                Tiền khách trả trước
              </td> 
              : 
              <td className={`text-center ${isTT === 'HL' && 'td-fail'}`}>{detailMH.length && detailMH[0]?.mahang}</td>
            }

            {isTT !== 'TT' && <td className={`${isTT === 'HL' && 'td-fail'}`}>{detailMH.length && detailMH[0]?.tenhang}</td>}

            {isTT !== 'TT' && <td className={`text-center ${isTT === 'HL' && 'td-fail'}`}>{detailMH.length && formatter.format(detailMH[0]?.giagiao).slice(1)}</td>}

            {isTT === 'GH' ? <td className="text-center">{formatter.format(sortDate[j]['slgiao']).slice(1)}</td> : isTT === 'HL' && <td className="text-center td-fail">0</td>}

            {isTT === 'GH' ? <td className="text-center">0</td> : isTT === 'HL' && <td className="text-center td-fail">{formatter.format(sortDate[j]['slhu']).slice(1)}</td>}

            {isTT === 'GH' ? <td className="text-center">{formatter.format(sortDate[j]['slgiao'] * detailMH[0]?.giagiao).slice(1)}</td> : isTT === 'HL' ? <td className="text-center td-fail">{formatter.format(sortDate[j]['slhu'] * detailMH[0]?.giagiao).slice(1)}</td> : <td className="text-center td-bgd">{formatter.format(sortDate[j]['tientratruoc']).slice(1)}</td>}

            <td className={`${isTT === 'TT' ? 'td-bgd' : isTT === 'HL' ? 'td-fail' : ''}`}>{ReactHtmlParser(sortDate[j]['ghichu'].replace(/\n/g, "<br />"))}</td>

            {j < 1 && <td className="text-center" rowSpan={count}>{formatter.format(reverseArrMoneyTotalDay[i]).slice(1)}</td>}

            {j < 1 && <td className="text-center" rowSpan={count}>{formatter.format(reverseArrMoneyFail[i]).slice(1)}</td>}

            {j < 1 && <td className="text-center" rowSpan={count}>{formatter.format(reverseArrMoneyCustomer[i]).slice(1)}</td>}

            {j < 1 && <td className={`text-center ${i === 0 && j === 0 ? 'td-bgd' : ''}`} rowSpan={count}>{reverseArrMoneyFinal[i] > 0 ? formatter.format(reverseArrMoneyFinal[i]).slice(1) : formatter.format(reverseArrMoneyFinal[i]).replace(formatter.format(reverseArrMoneyFinal[i]).slice(1, 2), '')}</td>}
          </tr>
        );
      });
      
      return result;
      
    });
    return resultFinal;
};

export default KHItem;