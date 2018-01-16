const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

// router.get("/stylesheets/style.css", function(req, res) {
//     let path = 'stylesheets/style.css';
//     res.sendFile(path, { root: (__dirname + '/../public')});
// })

router.use(express.static(__dirname + '/../public'));

module.exports = router;