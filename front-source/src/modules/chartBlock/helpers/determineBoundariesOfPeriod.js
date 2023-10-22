import calculateStartDate from "./calculateStartDate";

// Функция выставляет заданный период для отображения на графике
export default function determineBoundariesOfPeriod(period, ...dataRange) {
  const obj = {};
  switch (period) {
    case "month": {
      obj.period = {
        start: calculateStartDate(29),
        end: new Date(),
      };
      break;
    }
    case "week": {
      obj.period = {
        start: calculateStartDate(6),
        end: new Date(),
      };
      break;
    }
    case "day": {
      obj.period = {
        start: calculateStartDate(0),
        end: new Date(),
      };
      break;
    }
    case "range": {
      obj.period = {
        start: dataRange[0],
        end: dataRange[1],
      };
      break;
    }
    default: {
      console.log("switch в app не получает правильные значения");
      return;
    }
  }
  return obj;
}
