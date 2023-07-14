const router = require("express").Router();

const bookController = require("../controllers/book.controller");
const bookValidate = require("../validation/book.validate");
 
router.get("/", bookController.getAllBooks);

router.get("/create", bookController.create);

router.post("/create", bookValidate.bookCreate, bookController.addBook);

router.get("/search", bookController.search);

router.get("/:id", bookController.getABook);

router.put("/:id", bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

module.exports = router;