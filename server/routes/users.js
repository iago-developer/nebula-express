var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var conexao = require("../models/Users.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

module.exports = router;
