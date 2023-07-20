const router = require("express").Router();
const multer = require("multer");

const authController = require("../controllers/auth.controller");
const userValidate = require("../validation/user.validate");

const upload = multer({ dest: "./public/uploads"});

router.get("/login", authController.login);

router.post("/login", authController.postLogin);

router.get("/signup", authController.signup);

router.post("/create", upload.single("avatar"), userValidate.createUser, authController.addUser);

router.get("/logout", authController.logout);

module.exports = router;