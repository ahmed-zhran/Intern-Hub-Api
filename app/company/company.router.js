const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../utils/passport")(passport);
const companyCon = require("./company.controller.js");
const authGuard = passport.authenticate("cookie", { session: false });

router.post("/createJob", authGuard, companyCon.createIntern);
router.put("/updateJob/:jobId", authGuard, companyCon.updateIntren);
router.put("/closeJob/:jobId", authGuard, companyCon.closeIntern);

module.exports = router;