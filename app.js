const express = require('express'),
    app = express(),
    PORT = 4000,
    exphb = require('express-handlebars'),
    moongose = require('mongoose'),
    flash = require('express-flash'),
    session = require('express-session'),
    hbs = require('handlebars'),
    {
        setUser
    } = require('./config/auth');


hbs.registerHelper("contains", function (value, array, options) {
    // fallback...
    array = (array instanceof Array) ? array : [array];
    return (array.indexOf(value) > -1) ? options.fn(this) : "";
});

// template engine
app.engine('.hbs', exphb({
    extname: '.hbs'
}));
// hbs view engine
app.set('view engine', '.hbs');
// public layout
app.use(express.static('public'));
// urlparse
app.use(express.urlencoded({
    extended: true
}));
// flash middleware flash
app.use(flash());

// session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// global var
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();

// });
app.use(function (req, res, next) {
    // if there's a flash message in the session request, make it available 
    // in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});
// userID
app.use(setUser)
// route
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'));
// server connect
app.listen(PORT, () => {
    console.log(`server connected ${PORT}`);
})
moongose.connect(require('./config/keys'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

}).then(result => {
    console.log('database connected');
}).catch(err => {
    console.log(err);
})