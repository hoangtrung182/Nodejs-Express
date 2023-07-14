module.exports.bookCreate = (req, res, next) => {
    let errors = [];
    if(!req.body.title) {
        errors.push("Title is required")
    }

    if(!req.body.price) {
        errors.push("Price is required");
    }

    if(!req.body.author) {
        errors.push("Author is required");
    }

    if(!req.body.description) {
        errors.push("description is required");
    }
    
    if(errors.length > 0) {
        res.render("books/create", {
            errors: errors,
            values: req.body
        })
        return;
    }
    
    next();
} 