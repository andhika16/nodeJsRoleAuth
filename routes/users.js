const express = require('express');
const route = express.Router();
const User = require('../model/users');



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
route.post('/register', (req, res) => {


    console.log(req.body);




})


module.exports = route;