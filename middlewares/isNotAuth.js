module.exports = (req, res, next) => {
    if (req.session.isAuth) {
        return res.redirect(req.session.role == "admin" ? "/admin" : "/company")
    }
    next();
}