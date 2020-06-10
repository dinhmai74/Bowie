import moment from 'moment'

export const enoughTimeToCreate = (lastTime: string) => {
  console.log('l', moment(lastTime).format('HH:mm:ss'))
  const d = moment.duration(moment(moment()).diff(moment(lastTime)))
  console.log('d', d.asSeconds())
  return d.asSeconds() > 5
}
