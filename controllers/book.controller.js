const { Book, Author} = require("../model/model");

const bookController = {
    create: (req, res) => {
        res.render("books/create");
    },
    addBook: async (req, res) => {
        try {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            if(req.body.author) {
                const author = await Author.findById(req.body.author);
                await author.updateOne({$push: {books: savedBook._id}})
            }

            res.redirect("/books");
            // res.status(200).json(savedBook);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    getAllBooks: async (req, res) => {
        try {
            const allBooks = await Book.find();
            
            res.render("books/index" ,{
                books: allBooks
            })
            // res.status(200).json(allBooks);
        } catch (error) {
            res.status(500).json(error);    
        }
    },

    getABook : async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate('author');
            console.log(book);
            res.render("books/view", {
                book: book
            })
            
            // res.status(200).json(book);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    search: async (req, res) => {
        try {
            const q = req.query.query;
            const allBooks = await Book.find();
            
            const searchedBook = allBooks.filter(book => {
                return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
            })

            res.render("books/index",{
                books: searchedBook,
                values: q
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            await book.updateOne({ $set: req.body});
            res.status(200).json("Updated successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteBook: async (req, res) => {
        try {
            await Author.updateMany({ books: req.params.id}, { $pull: {books: req.params.id }});
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = bookController;