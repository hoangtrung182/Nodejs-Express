const { Account } = require("../model/model");

const authController = {
    login: (req, res) => {
        res.render("auth/login");
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
        res.render("users/create");
    },
    addUser: async (req, res) => {
        try {
            req.body.avatar = req.file.path.split("/").slice(1).join("/");
            const newUser = new Account(req.body);
            
            const allAccounts = await Account.find();
            const user = allAccounts.findIndex((user) => user.username === newUser.username);

            if(user !== -1) {
                res.render("users/create", {
                    errors: [
                        "Username already exists"
                    ],
                    values: req.body
                });
                return;
            }
            await newUser.save();
            
            res.redirect("/auth/login");
            // res.render("auth/login", {
            //     msg: "Register successfully"
            // })
        } catch (error) {
            res.status(500).json(error);
        }
    },

    logout: (req, res) => {
        res.clearCookie("userId");
        res.redirect("/auth/login");
    }
}

module.exports = authController;
