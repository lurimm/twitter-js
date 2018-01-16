const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const app = express();

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true }) // point nunjucks to the proper directory for templates

app.listen(3000, () => console.log('Server listening'));

app.use('/', routes);

app.use('/special', (req, res, next) => {
    console.log('User reached the special page');
    next();
})

app.use((req, res, next) => {
   const method = req.method;
   const path = req.path;
   console.log(`${method} ${path} ${res.statusCode}`);
});

