import moment from "moment";

export const FORMAT_MONEY = new Intl.NumberFormat(('de-DE'));
export const GET_SUNDAY = (date) => {
  return moment(date, 'DD/MM/YYYY').isoWeekday();
}