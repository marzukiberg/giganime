var express = require('express');
var router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const baseURL = 'https://animeindo.one/';

router.get('/', async function (req, res) {
  try {
    const { data } = await axios.get(baseURL);
    const $ = cheerio.load(data);
    const animeData = $(".animepost").map(function () {
      return {
        title: $(this).find("a").attr("href")
      }
    }).get()
    res.send({
      data: animeData
    })
  } catch (error) {
    res.send({
      message: 'Error occured',
      error
    })
  }
});

module.exports = router;
