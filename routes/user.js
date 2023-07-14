const router = require("express").Router();
const multer = require("multer");

const userController = require("../controllers/user.controller");
const userValidate = require("../validation/user.validate");

const upload = multer({ dest: "./public/uploads"});

router.get("/", userController.getAllUsers);

router.get("/create", userController.create);

router.post("/create", upload.single("avatar"), userValidate.createUser, userController.addUser);

router.get("/search", userController.search);

router.get("/:id", userController.getAnUser); 

module.exports = router;