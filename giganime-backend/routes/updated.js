const express = require("express");
const router = express.Router();
const getUpdated = require("../db/get-updated");

router.get("/", async function (req, res) {
  const data = await getUpdated();
  res.send(data);
});

module.exports = router;
