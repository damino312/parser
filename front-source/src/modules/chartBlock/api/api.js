import axios from "axios";

// Получение данных для графика
export async function getOneCrypto(obj) {
  const res = await axios.post("/getonecrypto", obj);
  return res;
}
