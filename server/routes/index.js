const express = require("express");
const adsRoutes = require("./adsRoutes");

const router = express.Router();

router.use(adsRoutes);

module.exports = router;
