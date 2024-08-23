module.exports = (req, res, next) => {
    res.locals.isAuth = req.session.isAuth
    res.locals.companyId = req.session.companyId;
    res.locals.qrcode = req.session.qrcode;
    res.locals.name = req.session.name;
    res.locals.email = req.session.email;
    res.locals.telephone = req.session.telephone;
    res.locals.socialMedia = req.session.socialMedia;
    res.locals.address = req.session.address;
    res.locals.photo = req.session.photo;
    next()
}