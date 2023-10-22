export default function setLimitOnLengthOfNumber(
  ArrayOfObjectsWithNumbersAndDates
) {
  const newArray = [];
  ArrayOfObjectsWithNumbersAndDates.forEach((obj) => {
    const newObject = { name: obj.name };
    const value = changeNumber(obj.value);
    newObject.value = value;
    newArray.push(newObject);
  });

  function changeNumber(number) {
    const limit = 3; // Лимит по количеству цифр после нулей в дробном числе
    let changeableNumber = number;
    let limitNumber = 0;
    for (let i = 0, check = 0; check < limit; i++) {
      if (Math.floor(changeableNumber * 10) !== 0) check++;
      changeableNumber *= 10;
      limitNumber++;
    }
    return number.toFixed(limitNumber);
  }
  return newArray;
}
