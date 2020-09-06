function authUser(req, res, next) {

    if (req.user == null) {
        req.session.sessionFlash = {
            type: 'error',
            message: 'Silahkan Login Terlebih dahulu'
        }
        res.redirect('/users/login');
        next()
    }
}

module.exports = {
    authUser
}