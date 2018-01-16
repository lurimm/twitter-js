const express = require('express');
const bodyParser = require('body-parser');
const tweetBank = require('../tweetBank');
const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list, prepopulatedName: name, showForm: true } );
  });

router.get('/tweets/:id', function(req, res) {
    var id = +req.params.id;
    var tweets = tweetBank.find( {id: id});
    console.log(tweets);
    res.render( 'index', { tweets: tweets});
})

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

// router.get("/stylesheets/style.css", function(req, res) {
//     let path = 'stylesheets/style.css';
//     res.sendFile(path, { root: (__dirname + '/../public')});
// })

router.use(express.static(__dirname + '/../public'));

module.exports = router;
