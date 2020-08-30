const express = require('express');
const route = express.Router();


route.get('/dashboard', (req, res) => {
    res.render('dashboard')
})



route.get('/', (req, res) => {
    res.render('welcome', {
        layout: 'login',
        title: 'Welcome Page'
    })
})

route.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'admin Page'
    })
})

module.exports = route;