// Функция для Изменения форматы даты, которая приходит с сервера
export default function changeFormatOfDate(date) {
  // Извлекаем день, месяц и час
  const day = date.getDate();
  const month = date.getMonth() + 1; // Месяцы в JavaScript нумеруются с 0, поэтому добавляем 1
  const hour = date.getHours();

  // Форматируем день и месяц, чтобы добавить ведущий ноль, если значение меньше 10
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHour = hour + ":00";

  // Формируем строку в желаемом формате
  const formattedDate = `${formattedDay}/${formattedMonth} ${formattedHour}`;
  return formattedDate;
}
