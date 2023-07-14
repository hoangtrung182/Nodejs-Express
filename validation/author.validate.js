module.exports.authorCreate = (req, res, next) => {
    let errors = [];

    if(!req.body.name) {
        errors.push("Name is required");
    }

    if(!req.body.birthyear) {
        errors.push("Birth year is required");
    }

    if(errors.length > 0) {
        res.render("authors/create", {
            errors: errors,
            values: req.body
        })
        return;
    }
    
    next();
}