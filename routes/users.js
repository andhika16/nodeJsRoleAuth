const express = require('express');
const route = express.Router();
const User = require('../model/users');
const bcrypt = require('bcrypt');



// login page
route.get('/login', (req, res) => {
    res.render('users/login', {
        layout: 'login',
        title: 'login page'
    })
})
// register page
route.get('/register', (req, res) => {
    res.render('users/register', {
        layout: 'login',
        title: 'register page'
    })
})
// register handler
route.post('/register', (req, res, next) => {
    const {
        name,
        email,
        pass,
        re_pass
    } = req.body;


    const flash_message = (info, msg, route) => {
        req.session.sessionFlash = {
            type: info,
            message: msg
        }
        res.redirect(route)
    }

    if (!name || !email || !pass || !re_pass) {
        flash_message('error', 'Silahkan input terlebih dahulu', '/users/register');
    }

    if (pass !== re_pass) {
        flash_message('error', 'password tidak cocok', '/users/register');
    }

    if (pass.length < 3) {
        flash_message('error', 'password terlalu pendek', '/users/register');
    } else {
        User.findOne({
            email: email
        }).then(user => {
            if (user) {
                flash_message('error', 'Email sudah tersedia', '/users/register');
            } else {
                const newUser = new User({
                    name,
                    email,
                    pass
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.pass, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.pass = hash;

                        newUser.save()
                            .then(result => {
                                flash_message('success', 'Registrasi berhasil', '/users/login')
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


})


module.exports = route;