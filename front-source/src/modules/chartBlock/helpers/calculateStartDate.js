export default function calculateStartDate(period) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - period);
  currentDate.setHours(0, 0, 0, 0);
  const isoDateString = currentDate;
  return isoDateString;
}
