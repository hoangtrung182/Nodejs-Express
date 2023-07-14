const { Book, Author} = require("../model/model");

const authorController = {
    create: (req, res) => {
        res.render("authors/create");
    },
    addAuthor: async (req, res) => {
        try {
            const newAuthor = new Author(req.body);
            const savedAuthor = await newAuthor.save();
            
            res.redirect("/authors");   
            // res.status(200).json(savedAuthor);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllAuthors: async (req, res) => {
        try {
            const allAuthors = await Author.find().populate("books");

            res.render("authors/index", {
                authors: allAuthors
            })
            // res.status(200).json(allAuthors);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    search: async (req, res) => {
        try {
            const q = req.query.query;
            const allAuthors = await Author.find();
            
            const searchedAuthor = allAuthors.filter(author => {
                return author.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
            })

            res.render("authors/index",{
                authors: searchedAuthor,
                values: q
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAnAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate("books");
            
            res.render("authors/view", {
                author: author
            })
            
            // res.status(200).json(author);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            await author.updateOne({ $set: req.body});
            res.status(200).json("Updated successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteAuthor: async (req, res) => {
        try {
            await Book.updateMany({ author: req.params.id}, { author: null});
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = authorController;