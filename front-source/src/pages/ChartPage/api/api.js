import axios from "axios";

export async function getNameOfCryptoById(id) {
  const { data } = await axios.post("/getNameOfCryptoById", { name: id });
  return data;
}
