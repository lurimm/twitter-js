const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true }) // point nunjucks to the proper directory for templates

app.listen(3000, () => console.log('Server listening'));

app.get('/', function(req, res, next) {
    res.send('Welcome');
    next();
});

app.get('/news', function(req, res, next) {
    res.send('This is the news');
    next();
});

app.get('/special', function(req, res, next) {
    res.send('This is a special page');
    next();
});

app.get('/rendertest', function(req, res, next) {
    var people = [{name: 'Gandalf'},{name: 'Frodo'}, {name: 'Hermione'}];
    res.render('index.html', {title: 'An Example', people: people});
    next();
})

app.use('/special', (req, res, next) => {
    console.log('User reached the special page');
    next();
})

app.use((req, res, next) => {
   const method = req.method;
   const path = req.path;
   console.log(`${method} ${path} ${res.statusCode}`);
});

