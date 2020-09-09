const express = require('express'),
    route = express.Router(),
    {
        register,
        login,
        register_post,
        login_post,
        logout
    } = require('../controller/users');

// logout
route.get('/logout', logout)
// login post
route.post('/login', login_post);
// login page
route.get('/login', login);
// register page
route.get('/register', register);
// register handler
route.post('/register', register_post);

module.exports = route;