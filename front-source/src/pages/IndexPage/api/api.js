import axios from "axios";

export async function getAllNameOfCrypto() {
  const { data } = await axios.get("/getAllNames");

  return data;
}
