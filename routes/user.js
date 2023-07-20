const router = require("express").Router();

const userController = require("../controllers/user.controller");
// const userValidate = require("../validation/user.validate");

router.get("/", userController.getAllUsers);

router.get("/search", userController.search);

router.get("/:id", userController.getAnUser); 

module.exports = router;