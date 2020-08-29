const express = require('express');
const app = express();
const PORT = 4000;
const exphb = require('express-handlebars');
const route = require('./routes/index');



app.engine('.hbs', exphb({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use('/', route)

app.listen(PORT, () => {
    console.log(`server connected ${PORT}`);
})