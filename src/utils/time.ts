export const formatSecondToDHMS = (second: number) => {
  const day = Math.floor(second / 86400);
  const hour = Math.floor((second % 86400) / 3600);
  const minute = Math.floor((second % 3600) / 60);
  const sec = second % 60;
  let res = ``;
  if (day > 0) {
    res += `${day}d `;
  }
  if (hour > 0) {
    res += `${hour}h `;
  }
  if (minute > 0) {
    res += `${minute}m `;
  }
  if (sec > 0) {
    res += `${sec}s`;
  }
  return res;
  // return `${day}d ${hour}h ${minute}m ${sec}s`;
};

export const prettyDate = (date: number | Date | undefined) => {
  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "full",
    timeStyle: "short"
  }).format(date);
};
