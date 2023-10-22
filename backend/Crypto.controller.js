const mongoose = require("mongoose");
const { cryptoNameModel, cryptoValueModel } = require("./Crypto.model");
const { countAverage } = require("./Utils");

const getAllCrypto = (req, res) => {
  cryptoValueModel
    .find({})
    .populate("name")
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((er) => console.log(er));
};

const getOneCrypto = async (req, res) => {
  const { name, period } = req.body;

  try {
    const cryptoArray = await cryptoNameModel.find({ name: name });
    const { _id: idOfCrypto } = cryptoArray[0];
    const valuesOfCrypto = await cryptoValueModel.find({
      name: idOfCrypto,
      createdAt: {
        $gte: period.start,
        $lte: period.end,
      },
    });
    countAverage(valuesOfCrypto, { start: period.start, end: period.end }).then(
      (data) => {
        res.json(data);
      }
    );
  } catch (er) {
    console.log("Ошибка в getOneCrypto() - Crypto.controller.js");
  }
};

const getNameOfAllCrypts = (req, res) => {
  cryptoNameModel
    .find({})
    .then((data) => res.json(data))
    .catch((er) => console.log(er));
};

const getNameOfCryptoById = (req, res) => {
  const { name } = req.body; // получаем название крипты
  cryptoNameModel
    .find({ _id: name })
    .then((data) => res.json(data[0].name))
    .catch((er) => console.log(er));
};

module.exports = {
  getAllCrypto,
  getOneCrypto,
  getNameOfAllCrypts,
  getNameOfCryptoById,
};
