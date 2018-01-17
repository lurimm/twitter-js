const express = require('express');
const bodyParser = require('body-parser');
const tweetBank = require('../tweetBank');
const router = express.Router();

module.exports = function (io) {
    router.use(express.static(__dirname + '/../public'));

    // parse application/x-www-form-urlencoded
    router.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    router.use(bodyParser.json())

    router.get('/', function (req, res, next) {
        let tweets = tweetBank.list();
        res.render( 'index', { tweets: tweets, showForm: true } );
        next();
    });

    router.get('/users/:name', function(req, res) {
        var name = req.params.name;
        var list = tweetBank.find( {name: name} );
        res.render( 'index', { tweets: list, prepopulatedName: name, showForm: true } );
    });

    router.get('/tweets/:id', function(req, res) {
        var id = +req.params.id;
        var tweets = tweetBank.find( {id: id} );
        console.log(tweets);
        res.render( 'index', { tweets: tweets});
    })

    router.post('/tweets', function(req, res) {
        var text = req.body.text;
        var name = req.body.name;
        newTweet = tweetBank.add(name, text);
        io.sockets.emit('newTweet', newTweet);
        res.redirect('/');
    });

    return router;
}

// router.get("/stylesheets/style.css", function(req, res) {
//     let path = 'stylesheets/style.css';
//     res.sendFile(path, { root: (__dirname + '/../public')});
// })
