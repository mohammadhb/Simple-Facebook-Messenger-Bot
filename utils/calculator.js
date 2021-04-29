function calculateDayDifferenceFromNow(date) {
  const result =
    Math.ceil((new Date(date) - new Date()) / 1000 / 3600 / 24) % 365;
  if (result < 0) return result + 365;
  return result;
}

module.exports = {
  calculateDayDifferenceFromNow
};
