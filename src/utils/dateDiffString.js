import * as dayjs from 'dayjs';

const dateDiffUnit = (dateDiff, unit) => {
  const unitStr = dateDiff - 1 ? `${unit}s` : unit;
  return `${-dateDiff} ${unitStr}`;
};

const dateDiffString = (date) => {
  const dateDayjs = dayjs(date);

  const week = dateDayjs.diff(Date.now(), 'w');
  if (week) {
    return dateDiffUnit(week, 'week');
  }

  const day = dateDayjs.diff(Date.now(), 'd');
  if (day) {
    return dateDiffUnit(day, 'day');
  }

  const hour = dateDayjs.diff(Date.now(), 'h');
  if (hour) {
    return dateDiffUnit(hour, 'hour');
  }

  const minute = dateDayjs.diff(Date.now(), 'minute');
  if (minute) {
    return dateDiffUnit(minute, 'minute');
  }

  const second = dateDayjs.diff(Date.now(), 'second');
  if (second) {
    return dateDiffUnit(second, 'second');
  }

  return '1 second';
};

export default dateDiffString;
