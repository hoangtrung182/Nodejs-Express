const { Account } = require("../model/model");

const authController = {
    login: (req, res) => {
        res.render("auth/login");
        // res.send("Welcome");
    },

    postLogin: async (req, res) => {
        const { username, password } = req.body;

        const allUser = await Account.find();
        // const user = await Account.findOne({ username: username});
        const user = allUser.find((user) => user.username === username);

        if(!user) {
            res.render("auth/login", {
                errors: [
                    "User not exits"
                ],
                values: req.body
            })
            return;
        }

        if(user.password !== password) {
            res.render("auth/login", {
                errors: [
                    "Wrong password"
                ],
                values: req.body
            })
            return;
        }

        res.cookie("userId", user._id, {
            signed: true
        });
        res.redirect("/books");
    },
    signup: (req, res) => {
        res.render("users/create")
    },

    logout: (req, res) => {
        res.clearCookie("userId");
        res.redirect("/");
    }
}

module.exports = authController;
