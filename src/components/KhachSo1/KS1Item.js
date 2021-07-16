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
    let arrMoneyTotal = [];
    let arrMoneyFinal = [];
    let arrMoneyCountDown = [];
    
    // tính tổng tiền trong ngày
    for(let k = 0; k < reverseArr.length; k++) {
      let totalSum = 0;
      let totalCountMoneyDay = 0;

      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'tientratruoc') {
          totalSum += parseInt(x.tientratruoc);
        }
        return totalSum;
      });

      data[reverseArr[k]].map(x => {
        if (x.thongtin === 'giaohang') {
          let giagiao = _.filter(listMH, k => {return k.id === x.mahangId})[0]['giagiao'];
          if (!!x.slhu) {
            totalCountMoneyDay += (parseInt(x.slgiao) - parseInt(x.slhu)) * giagiao;;
          } else {
            totalCountMoneyDay += parseInt(x.slgiao) * giagiao;;
          }
        }
        return totalCountMoneyDay;
      });
      arrMoneyTotal.push(totalCountMoneyDay);
      arrMoneyFinal.push(totalCountMoneyDay - totalSum);
    }

    // tính tổng tiền còn lại sau khi khách đưa tiền trước
    arrMoneyCountDown.push(arrMoneyFinal[0]);
    for(let e = 1; e < arrMoneyFinal.length; e++) {
      if (e >= 1) {
        arrMoneyCountDown.push(arrMoneyFinal[e] + arrMoneyCountDown[e-1]);
      }
    }
    const reverseArrMoneyCountDown = _.reverse(arrMoneyCountDown);
    const reverseArrMoneyTotal = _.reverse(arrMoneyTotal);
    
    // 
    for(let i = 0; i < arrDate.length; i++) {
      const sortDate = data[arrDate[i]][0]['thongtin'] === 'giaohang' ? data[arrDate[i]].slice().sort((a, b) => a.ngaytao > b.ngaytao ? -1 : 1) : data[arrDate[i]].slice().sort((a, b) => b.ngaytao > a.ngaytao ? -1 : 1);

      for(let j = 0; j < sortDate.length; j++) {
        let count = sortDate.length;
        let isGH = sortDate[j]['thongtin'] === 'giaohang' ? true : false;
        let detailMH = _.filter(listMH, (x) => {return x.id === sortDate[j]['mahangId']});
        
        result += `
          <tr>
            ${j < 1 ? `<td class="text-center" rowspan=${count}>${sortDate[j]['ngaygiao']}</td>` : ''}
            
            ${!isGH ? `<td class="text-right td-bgd" colspan="5">Tiền khách trả trước</td>` : `<td class="text-center">${detailMH.length && detailMH[0]?.mahang}</td>`}
            
            ${isGH ? `<td>${detailMH.length && detailMH[0]?.tenhang}</td>` : ''}
            
            ${isGH ? `<td class="text-center">${detailMH.length && formatter.format(detailMH[0]?.giagiao)}</td>` : ''}
            
            ${isGH ? `<td class="text-center">${formatter.format(sortDate[j]['slgiao']).slice(1)}</td>` : ''}
            
            ${isGH ? `<td class="text-center">${sortDate[j]['slhu'] ? formatter.format(sortDate[j]['slhu']).slice(1) : 0}</td>` : ''}
            
            ${isGH ? `<td class="text-center">${formatter.format((sortDate[j]['slgiao'] - sortDate[j]['slhu']) * detailMH[0]?.giagiao)}</td>` : `<td class="text-center td-bgd">${formatter.format(sortDate[j]['tientratruoc'])}</td>`}
            
            <td class=${isGH ? '' : 'td-bgd'}>${sortDate[j]['ghichu'].replace(/\n/g, "<br />")}</td>
            
            ${j < 1 ? `<td class="text-center" rowspan=${count}>${formatter.format(reverseArrMoneyTotal[i])}</td>` : ''}
            
            ${j < 1 ? `<td class="text-center" rowspan=${count}>${formatter.format(reverseArrMoneyCountDown[i])}</td>` : ''}
          </tr>`;
      }

    };
    return ReactHtmlParser(result);
};

export default KS1Item;