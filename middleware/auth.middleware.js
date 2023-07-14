const { Account } = require("../model/model");

module.exports.requireAuth = async (req, res, next) => {
    if(!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }

    const allUser = await Account.find();

    const user = allUser.find(user => {
        return req.signedCookies.userId.indexOf(user._id) !== -1;
    })


    if(!user) {
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = user

    next();
}