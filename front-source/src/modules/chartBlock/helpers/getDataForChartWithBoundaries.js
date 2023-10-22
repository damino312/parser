import determineBoundariesOfPeriod from "../helpers/determineBoundariesOfPeriod";
import { getOneCrypto } from "../api/api";

// Получение и обработка данных данных для отображения
export default async function getDataForChartWithBoundaries(
  period,
  name,
  ...dataRange
) {
  const objWithBoundaries = determineBoundariesOfPeriod(period, ...dataRange);
  const obj = { name: name, ...objWithBoundaries };
  const { data } = await getOneCrypto(obj);
  return data;
}
