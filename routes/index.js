const express = require('express'),
    route = express.Router(),
    {
        authUser
    } = require('../config/auth');

route.get('/', (req, res) => {
    res.render('welcome', {
        layout: 'login',
        title: 'Welcome Page'
    })
})
route.get('/home', (req, res) => {
    res.render('index', {
        title: 'Home Page'
    })
})
route.get('/dashboard', authUser, (req, res) => {
    res.render('dashboard')
})
route.all('/session-flash', function (req, res) {
    req.session.sessionFlash = {
        type: 'info',
        message: 'This is a flash message using custom middleware and express-session.'
    }
    res.redirect('/users/register', 301);
});


route.get('/admin', authUser, (req, res) => {
    res.render('admin', {
        title: 'admin Page'
    })
})

module.exports = route;