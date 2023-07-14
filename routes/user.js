const router = require("express").Router();

const userController = require("../controllers/user.controller");
const userValidate = require("../validation/user.validate");

router.get("/", userController.getAllUsers);

router.get("/create", userController.create);

router.post("/create", userValidate.creataUser, userController.addUser);

router.get("/:id", userController.getAnUser); 

module.exports = router;