const axios = require("axios");
const router = require("express").Router();
const fsPromises = require("fs").promises;
const fs = require("fs");



router.get("/", (req, res) => {
console.log(req.query)
fsPromises.readFile(
  req.query.assistantFilePath,
  "utf8"
);
});




module.exports = router;