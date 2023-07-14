const router = require("express").Router();

const authorController = require("../controllers/author.controller");
const authorValidate = require("../validation/author.validate");
 
router.get("/", authorController.getAllAuthors);

router.get("/create", authorController.create);

router.post("/create", authorValidate.authorCreate, authorController.addAuthor);

router.get("/search", authorController.search);

router.get("/:id", authorController.getAnAuthor);

router.put("/:id", authorController.updateAuthor);

router.delete("/:id", authorController.deleteAuthor);
module.exports = router;