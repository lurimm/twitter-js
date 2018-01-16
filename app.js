const express = require('express');

const app = express();

app.listen(3000, () => console.log('Server listening'));

app.get('/', function(req, res, next) {
    res.send('Welcome');
    next();
});

app.get('/news', function(req, res, next) {
    res.send('This is the news');
    next();
});

app.use((req, res, next) => {
   const method = req.method;
   const path = req.path;
   console.log(`${method} ${path} ${res.statusCode}`);
});
