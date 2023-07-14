const express = require('express');
const bodyParser = require('body-parser');
const cookiesParser = require('cookie-parser');
const cors = require('cors');
// const morgan = require('morgan');
const mongoose = require('mongoose');
require("dotenv").config();

const authMiddleware = require("./middleware/auth.middleware");
const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static('public'));
app.use(cors());
// app.use(morgan('common'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiesParser('adsads'));

// Connect to DB
mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB');
})
.catch(err => {
    console.log('Error connecting to DB');
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.use("/auth", authRoute);
app.use("/users",authMiddleware.requireAuth, userRoute);
app.use("/authors", authMiddleware.requireAuth, authorRoute);
app.use("/books", authMiddleware.requireAuth, bookRoute);

app.listen(port, () => {
    console.log('listening on port ' + port);
})