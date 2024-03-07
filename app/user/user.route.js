const express = require('express');
const router = express.Router();
const userCon=require("./user.controller.js")
const { myMullter, HME } = require('../utils/multer.js');
const passport = require('passport');
require('../utils/passport')(passport);
const authGuard = passport.authenticate("cookie", { session: false });



router.post("/addskill", authGuard, userCon.addSkills)
router.put("/updateUserprofile", authGuard, myMullter().fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), HME, userCon.updateUser);
router.post('/delete', authGuard, userCon.deleteUser);
router.put("/changePassword",authGuard, userCon.changePassword);
router.post("/logout", authGuard, userCon.signOut)
router.post("/apply/:jobId",authGuard,myMullter().single("file"),HME , userCon.applyJob);
router.get("/appliedjob", authGuard, userCon.appliedjobs);


module.exports = router;