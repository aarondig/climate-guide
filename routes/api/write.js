const axios = require("axios");
const router = require("express").Router();
const fsPromises = require("fs").promises;
const fs = require("fs");



router.get("/", (req, res) => {
console.log(req.query)
fsPromises.writeFile(
    req.query.assistantFilePath,
    JSON.stringify(assistantDetails, null, 2))
});


module.exports = router;