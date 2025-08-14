// 년, 달, 월, 일, 분 까지 가져오는 함수
export const getDateTime = () => {
  console.log('[Utils] getDateTime()');

  let now = new Date();
  let fullYear = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10 ) month = '0' + month;
  let date = now.getDate()
  if (date < 10 ) date = '0' + date;
  let hours = now.getHours();
  if (hours < 10 ) hours = '0' + hours;
  let minutes = now.getMinutes();
  if (minutes < 10 ) minutes = '0' + minutes;

  return `${fullYear}/${month}/${date} ${hours}:${minutes}`;
}

export const getStringDateTime = () => {
  console.log('[Utils] getStringDateTime()');

  let now = new Date();
  let fullYear = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10 ) month = '0' + month;
  let date = now.getDate()
  if (date < 10 ) date = '0' + date;
  let hours = now.getHours();
  if (hours < 10 ) hours = '0' + hours;
  let minutes = now.getMinutes();
  if (minutes < 10 ) minutes = '0' + minutes;
  let seconds = now.getSeconds();
  if (seconds < 10 ) seconds = '0' + seconds;
  let Milliseconds = now.getMilliseconds()
  if (Milliseconds < 100 ) seconds = '0' + Milliseconds;

  return `${fullYear}${month}${date}${hours}${minutes}${seconds}${Milliseconds}`;
}

