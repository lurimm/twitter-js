const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
var socketio = require('socket.io');

const app = express();

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true }) // point nunjucks to the proper directory for templates

var server = app.listen(3000, () => console.log('Server listening'));

var io = socketio.listen(server);


app.use('/', routes(io));

app.use('/special', (req, res, next) => {
    console.log('User reached the special page');
    next();
})

app.use((req, res, next) => {
   const method = req.method;
   const path = req.path;
   console.log(`${method} ${path} ${res.statusCode}`);
});

