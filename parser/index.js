const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const { cryptoNameModel, cryptoValueModel } = require("./Crypto.model");

const mongoPort = process.env.MONGO_PORT || 27017;
const mongoLink = process.env.MONGO_HOST || "127.0.0.1";

// Добавляет цену крипты в бд
function addCryptoDataToDB(data) {
  return new Promise((resolve, reject) => {
    cryptoValueModel
      .insertMany(data)
      .then(() => {
        console.log("Data has been added");
        resolve(true);
      })
      .catch((er) => {
        console.log("Error in adding new data to DB");
        reject(false);
      });
  });
}
// Создает документы в коллекции с названиями крипты
async function createNamesOfCryptoCur(parsableCur) {
  const arr = [];
  parsableCur.forEach((elem) => arr.push({ name: elem }));

  try {
    await cryptoNameModel.insertMany(arr);
  } catch (error) {
    console.log("Ошибка записи имен в бд, скорее всего они уже там есть");
  }
}
function getHTML(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => resolve(res.data))
      .catch(() => {
        console.log("Error in getting HTML");
        reject(false);
      });
  });
}
// Получаем документы из коллекции с названиями крипты (нужны id для добавления в БД данных о цене)
function getIDs() {
  return new Promise((resolve, reject) => {
    cryptoNameModel
      .find({})
      .then((arr) => {
        resolve(arr);
      })
      .catch((er) => {
        console.log(er);
        reject(false);
      });
  });
}
function processHTML(html, parsableCur) {
  return new Promise((resolve) => {
    const $ = cheerio.load(html);
    const arr = [];
    $("tbody tr").each((i, element) => {
      let cryptoName = $(element).find("td").eq(2).find("p").eq(0).text();
      let cryptoPriceWithCurrancy = $(element)
        .find("td")
        .eq(3)
        .find("span")
        .text()
        .replace(",", "");
      if (cryptoName === "") {
        cryptoName = $(element).find("td").eq(2).find("span").eq(1).text();
        cryptoPriceWithCurrancy = $(element).find("td").eq(3).text();
        cryptoPrice = cryptoPriceWithCurrancy.slice(1);
      } else {
        cryptoPrice = cryptoPriceWithCurrancy.slice(1);
      }
      if (parsableCur.includes(cryptoName))
        arr.push({ name: cryptoName, price: Number(cryptoPrice) });
    });
    resolve(arr);
  });
}
function prepareCryptoDataBeforeAddingToDB(data, IDs) {
  const preparedData = data.map((obj) => {
    const IDsObject = IDs.find((IDsObj) => IDsObj.name === obj.name);

    return { name: IDsObject._id, price: obj.price };
  });
  return preparedData;
}
async function main() {
  const parsableCur = [
    "Bitcoin",
    "Ethereum",
    "Tether USDt",
    "BNB",
    "XRP",
    "USDC",
    "Solana",
    "Cardano",
    "Dogecoin",
    "TRON",
  ];
  const delay = 10000;

  const url = "https://coinmarketcap.com/";

  await createNamesOfCryptoCur(parsableCur);
  let i = 0;
  setInterval(async () => {
    try {
      const IDs = await getIDs();
      const html = await getHTML(url);
      const obj = await processHTML(html, parsableCur);
      const preparedData = prepareCryptoDataBeforeAddingToDB(obj, IDs);
      await addCryptoDataToDB(preparedData);
      console.log("Удачная иттерация номер " + i + " " + new Date());
    } catch (er) {
      console.log(er);
      console.log("Неудачная иттерация номер " + i + " " + new Date());
    }
    i++;
  }, delay);
}

mongoose
  .connect(`mongodb://${mongoLink}:${mongoPort}/crypto`)
  .then(() => {
    {
      console.log("MongoDB has been connected");
      main();
    }
  })
  .catch((er) => console.error(er));
