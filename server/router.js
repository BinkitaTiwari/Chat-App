const express = require("express")
const router = express.Router()

router.get("/",  (req, res) => {
  console.log("server is running")
  res.send("Server is up and running." ).status(200);
});

module.exports = router; 