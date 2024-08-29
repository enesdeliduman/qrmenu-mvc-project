module.exports = (req, res, next) => {
    if (req.session.role != "company") {
        return res.redirect("/")
    }
    next();
}
