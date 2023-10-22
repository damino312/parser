import changeFormatOfDate from "./changeFormatOfDate";
// В ключе находится дата по UTC. Перебор ниже заменяет ключи на дату по нашему часовому поясу
export default function convertIntoUsersLocalTime(resData) {
  const result = [];
  for (const key in resData) {
    if (resData.hasOwnProperty(key)) {
      const obj = {};
      const value = resData[key];
      const date = new Date(key);
      const changedDate = changeFormatOfDate(date);
      obj.name = changedDate;
      obj.value = value;
      result.push(obj);
    }
  }
  return result;
}
