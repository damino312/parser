const express = require("express");
const app = express();
const CryptoContoller = require("./Crypto.controller");

app.get("/getAllCrypto", CryptoContoller.getAllCrypto);
app.get("/getAllNames", CryptoContoller.getNameOfAllCrypts);
app.post("/getOneCrypto", CryptoContoller.getOneCrypto);
app.post("/getNameOfCryptoById", CryptoContoller.getNameOfCryptoById);

module.exports = app;
