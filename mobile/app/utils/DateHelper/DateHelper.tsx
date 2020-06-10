import moment, { Moment } from 'moment'
export const DateFormat = {
  timeWithIndicator: 'HH:mm a',
  fullDateTime: 'DD MMM [at] HH:mm a',
  monthDate: 'MMM[,] DD',
  serverTime: 'YYYY-MM-DD',
}

export const combineDateAndTime = (date: string | Moment, time: string | Moment) => {
  const timeString = moment(time).format('hh:mm')
  const rs = moment(moment(date).format(DateFormat.serverTime) + ' ' + timeString + ':00')
  return rs
}

