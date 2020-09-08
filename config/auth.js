const User = require('../model/users');

function authUser(req, res, next) {

    if (req.session.user == null) {
        res.status(403)
        req.session.sessionFlash = {
            type: 'error',
            message: 'Silahkan Login Terlebih dahulu'
        }
        return res.redirect('/users/login');
    }
    next()
}

function setUser(req, res, next) {
    const userId = req.body._id

    if (userId) {
        req.user = User.find(user => user._id === userId)
    }

    next()

}

module.exports = {
    authUser,
    setUser
}