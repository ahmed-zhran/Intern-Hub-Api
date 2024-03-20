const express = require('express');
const router = express.Router();
const userCon=require("./user.controller.js")
const { myMullter, HME } = require('../utils/multer.js');
const passport = require('passport');
require('../utils/passport')(passport);
const verifyToken = require('../middlewares/verifyToken.js');
const authGuard = passport.authenticate("cookie", { session: false });


router.post("/addskill", verifyToken, userCon.addSkills)
router.put("/updateUserprofile", verifyToken, myMullter().fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), HME, userCon.updateUser);
router.post('/delete', verifyToken, userCon.deleteUser);
router.put("/changePassword",verifyToken, userCon.changePassword);
router.post("/logout", verifyToken, userCon.signOut)
router.post("/apply/:jobId",verifyToken,myMullter().single("file"),HME , userCon.applyJob);
router.get("/appliedjob", verifyToken, userCon.appliedjobs);
router.get("/jobs",userCon.getAllJobs)
router.get("/userdata/:userId",userCon.userData)



module.exports = router;