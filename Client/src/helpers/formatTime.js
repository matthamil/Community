const formatTime = (timeString) => {
  const hour = timeString.split(':')[0];
  const remainder = timeString.split(':')[1];

  if (hour > 12) {
    return hour - 12 + ':' + remainder;
  } else {
    return hour + ':' + remainder;
  }
};

export default formatTime;