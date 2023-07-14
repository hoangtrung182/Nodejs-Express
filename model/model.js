const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    description: {
        type: String,
        required: true
    }
})


const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    birthyear: {
        type: String,
        required: true
    }
});

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    avatar: {
        type: String
        // required: true
    }
});

const Book = mongoose.model('Book', BookSchema);
const Author = mongoose.model('Author', AuthorSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = {
    Book,
    Author,
    Account
}