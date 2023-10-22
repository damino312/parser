import convertIntoUsersLocalTime from "../helpers/convertIntoUsersLocalTime";
import setLimitOnLengthOfNumber from "../helpers/setLimitOnLengthOfNumber";
import getDataForChartWithBoundaries from "../helpers/getDataForChartWithBoundaries";

export default async function processDataForChart(
  period,
  crytoName,
  ...dataRange
) {
  const cryptoData = await getDataForChartWithBoundaries(
    period,
    crytoName,
    ...dataRange
  );
  const convertedData = convertIntoUsersLocalTime(cryptoData);
  const result = setLimitOnLengthOfNumber(convertedData);
  return result;
}
