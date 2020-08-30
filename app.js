const express = require('express');
const app = express();
const PORT = 4000;
const exphb = require('express-handlebars');
const route = require('./routes/index');
const moongose = require('mongoose');

// template engine
app.engine('.hbs', exphb({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
// public layout
app.use(express.static('public'));
// urlparse
app.use(express.urlencoded({
    extended: true
}));

// route
app.use('/', route)
app.use('/users', require('./routes/users'))
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