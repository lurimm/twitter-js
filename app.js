const express = require('express');

const app = express();

app.listen(3000, () => console.log('Server listening'));

app.get('/', function(req, res) {
    res.send('Welcome');
});