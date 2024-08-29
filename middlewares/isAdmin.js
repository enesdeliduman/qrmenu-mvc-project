module.exports = (req, res, next) => {
    if (req.session.role != "admin") {
        return res.redirect("/")
    }
    next();
}
