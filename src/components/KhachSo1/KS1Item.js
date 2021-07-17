import ReactHtmlParser from 'react-html-parser';
import _ from 'lodash';

const KS1Item = (props) => {
  const { data, listMH } = props;

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });

  const arrDate = Object.keys(data);
    const cloneArr = [...arrDate];
    const reverseArr = _.reverse(cloneArr);
    let result = '';
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
    for(let i = 0; i < arrDate.length; i++) {
      const sortDate = data[arrDate[i]][0]['thongtin'] === 'giaohang' ? data[arrDate[i]].slice().sort((a, b) => a.ngaytao > b.ngaytao ? -1 : 1) : data[arrDate[i]].slice().sort((a, b) => b.ngaytao > a.ngaytao ? -1 : 1);

      for(let j = 0; j < sortDate.length; j++) {
        let count = sortDate.length;
        let isGH = sortDate[j]['thongtin'] === 'giaohang' ? 'GH' : sortDate[j]['thongtin'] === 'tientratruoc' ? 'TT' : 'HL';
        let detailMH = _.filter(listMH, (x) => {return x.id === sortDate[j]['mahangId']});
        
        result += `
          <tr>
            ${j < 1 ? `<td class="text-center" rowspan=${count}>${sortDate[j]['ngaynhap']}</td>` : ''}
            
            ${isGH === 'TT' ? `<td class="text-right td-bgd" colspan="5">Tiền khách trả trước</td>` : `<td class="text-center ${isGH === 'HL' && 'td-fail'}">${detailMH.length && detailMH[0]?.mahang}</td>`}
            
            ${isGH !== 'TT' ? `<td class=${isGH === 'HL' && 'td-fail'}>${detailMH.length && detailMH[0]?.tenhang}</td>` : ''}
            
            ${isGH !== 'TT' ? `<td class="text-center ${isGH === 'HL' && 'td-fail'}">${detailMH.length && formatter.format(detailMH[0]?.giagiao).slice(1)}</td>` : ''}
            
            ${isGH === 'GH' ? `<td class="text-center">${formatter.format(sortDate[j]['slgiao']).slice(1)}</td>` : isGH === 'HL' ? `<td class="text-center td-fail">0</td>` :  ''}
            
            ${isGH === 'GH' ? `<td class="text-center">0</td>` : isGH === 'HL' ? `<td class="text-center td-fail">${formatter.format(sortDate[j]['slhu']).slice(1)}</td>` : ''}
            
            ${isGH === 'GH' ? `<td class="text-center">${formatter.format(sortDate[j]['slgiao'] * detailMH[0]?.giagiao).slice(1)}</td>` : isGH === 'HL' ? `<td class="text-center td-fail">${formatter.format(sortDate[j]['slhu'] * detailMH[0]?.giagiao).slice(1)}</td>` : `<td class="text-center td-bgd">${formatter.format(sortDate[j]['tientratruoc']).slice(1)}</td>`}
            
            <td class=${isGH === 'TT' ? 'td-bgd' : isGH === 'HL' ? 'td-fail' : ''}>${sortDate[j]['ghichu'].replace(/\n/g, "<br />")}</td>
            
            ${j < 1 ? `<td class="text-center" rowspan=${count}>${formatter.format(reverseArrMoneyTotalDay[i]).slice(1)}</td>` : ''}

            ${j < 1 ? `<td class="text-center" rowspan=${count}>${formatter.format(reverseArrMoneyFail[i]).slice(1)}</td>` : ''}
            
            ${j < 1 ? `<td class="text-center" rowspan=${count}>${formatter.format(reverseArrMoneyCustomer[i]).slice(1)}</td>` : ''}

            ${j < 1 ? `<td class="text-center ${i === 0 && j === 0 ? "td-bgd" : ''}" rowspan=${count}>${formatter.format(reverseArrMoneyFinal[i]).slice(1)}</td>` : ''}
          </tr>`;
      }

    };
    return ReactHtmlParser(result);
};

export default KS1Item;