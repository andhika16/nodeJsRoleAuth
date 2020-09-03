const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('welcome', {
        layout: 'login',
        title: 'Welcome Page'
    })
})
route.get('/dashboard', (req, res) => {
    res.render('dashboard')
})
route.all('/session-flash', function (req, res) {
    req.session.sessionFlash = {
        type: 'info',
        message: 'This is a flash message using custom middleware and express-session.'
    }
    res.redirect('/users/register', 301);
});


route.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'admin Page'
    })
})

module.exports = route;