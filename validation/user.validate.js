module.exports.createUser = (req, res, next) => {
    let errors = [];
    
    if(!req.body.username) {
        errors.push('Username is required');
    }

    if(!req.body.password) {
        errors.push('Password is required');
    }

    if(!req.body.phone) {
        errors.push('Phone is required');
    }

    if(errors.length > 0) {
        res.render("users/create", {
            errors: errors,
            values: req.body
        })
        return;
    }

    next();
}