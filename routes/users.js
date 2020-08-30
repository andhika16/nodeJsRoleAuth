const express = require('express');
const route = express.Router();



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
// login handler


module.exports = route;