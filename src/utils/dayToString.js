import * as dayjs from 'dayjs';

/**
 *
 * @param {Date} time
 */
function dayToString(time) {
  const day = dayjs(time);

  if (day.isSame(Date.now(), 'day')) {
    return day.format('HH:mm');
  }

  if (day.isSame(Date.now(), 'week')) {
    return day.format('ddd HH:mm');
  }

  return day.format('HH:mm, MMM DD, YYYY');
}

export default dayToString;
