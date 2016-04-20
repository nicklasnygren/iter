import cu from 'auto-curry';

function resetDate(date) {
  date.setHours(0, 0, 0, 0);
}

export default cu(function * dateRange(start, end) {
  const endDate = new Date(end);
  let curDate = new Date(start);

  resetDate(curDate);
  resetDate(endDate);

  do {
    yield curDate;
    curDate.setDate(curDate.getDate() + 1);
  } while (curDate <= endDate);
});
