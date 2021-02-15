const express = require("express");
const router = express.Router();

const { googleAuth } = require("../controllers/google")

//signin
router.post("/v1/auth/google", googleAuth)

module.exports = router;