const User = require('../model/users'),
    bcrypt = require('bcrypt');

const login = (req, res) => {
    res.render('users/login', {
        layout: 'login',
        title: 'login page'
    })
}

const register = (req, res) => {
    res.render('users/register', {
        layout: 'login',
        title: 'register page'
    })
}


// / register handler
const register_post = (req, res, next) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;


    const flash_message = (info, msg, route) => {
        req.session.sessionFlash = {
            type: info,
            message: msg
        }
        res.redirect(route)
    }

    if (!name || !email || !password || !password2) {
        return flash_message('error', 'Isi field terlebih dahulu', '/users/register')
    }

    if (password !== password2) {
        return flash_message('error', 'passwordword tidak cocok', '/users/register');
    }

    if (password.length < 3) {
        return flash_message('error', 'passwordword terlalu pendek', '/users/register');
    } else {
        User.findOne({
            email: email
        }).then(user => {
            if (user) {
                return flash_message('error', 'Email sudah tersedia', '/users/register');
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        newUser.save()
                            .then(result => {
                                return flash_message('success', 'Registrasi berhasil', '/users/login');

                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

}

// login handler
const login_post = (req, res, next) => {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        req.session.sessionFlash = {
            type: 'error',
            message: 'Isi field terlebih dahulu'
        }
        return res.redirect('/users/login');
    }

    User.findOne({
        email: email
    }).then(user => {
        if (!user) {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Email tidak terdaftar'
            }
            return res.redirect('/users/login');
        } else {
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) throw err;
                if (match) {

                } else {
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Password Salah'
                    }
                    res.redirect('/users/login')
                }
            })
        }
    }).catch(err => {
        console.log(err);
    })


}

module.exports = {
    login,
    register,
    register_post,
    login_post
};