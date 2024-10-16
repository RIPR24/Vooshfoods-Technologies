const {
  getUserCards,
  addNewCard,
  modifyCard,
  deleteCard,
  Auth,
} = require("../controlers/Cardcon");

const router = require("express").Router();

router.get("/get", Auth, getUserCards);
router.post("/add", Auth, addNewCard);
router.post("/modify", Auth, modifyCard);
router.post("/delete", Auth, deleteCard);

module.exports = router;
