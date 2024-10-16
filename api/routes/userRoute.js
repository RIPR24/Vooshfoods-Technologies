const router = require("express").Router();
const {
  getAllUsers,
  signupUser,
  loginUser,
  gloginUser,
  gsignupUser,
} = require("../controlers/Usercon");

router.get("/all", getAllUsers);
router.post("/signup", signupUser);
router.post("/gsignup", gsignupUser);
router.post("/login", loginUser);
router.post("/glogin", gloginUser);

module.exports = router;
