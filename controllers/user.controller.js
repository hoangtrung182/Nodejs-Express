const { Account } = require("../model/model");

const userController = {
    create: (req, res) => {
        res.render("users/create");
    },
    addUser: async (req, res) => {
        try {
            req.body.avatar = req.file.path.split("/").slice(1).join("/");
            const newUser = new Account(req.body);
            const savedUser = await newUser.save();
            
            res.redirect("/auth/login");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    search: async (req, res) => {
        try {
            const query = req.query.query;
            // console.log(query)
            const allUsers = (await Account.find()).filter(user => {
                return user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            })

            res.render("users/index", {
                users: allUsers,
                value: query
            })            
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await Account.find();
            res.render("users/index", {
                users: allUsers
            })
            // res.status(200).json(allUsers);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAnUser: async (req, res) => {
        try {
            const user = await Account.findById(req.params.id);

            res.render("users/view", {
                user
            })

            // res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = userController;