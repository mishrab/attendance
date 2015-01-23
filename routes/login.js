var passport = require('passport');
var Account = require('../models/accounts');
var router = require('express').Router();


router.get('/', function(req, res) {
    res.render('login_test');
});

router.post('/register', function (req, res) {

    console.log('registering user');
    Account.register(new Account(req.body), req.body.password, function(err, result) {
        if (err) {
            console.log((['BadRequestError', 'ValidatorError'].indexOf(err.name) !== -1));
            if (err.name && (['BadRequestError', 'ValidationError'].indexOf(err.name) !== -1)) res.status(400).json(err);
            else res.status(500).json(err);
        } else {
            res.status(200).json({ username: result.username, userid: result._id });
        }
    });
});

router.post('/', passport.authenticate('local'), function(req, res) {
    res.status(200).json({ username: req.user.username, userid: req.user._id, email: req.user.email });
});

router.get('/validate', function(req, res) {
    if (req.user) {
        res.status(200).json({
            user: {
                username: req.user.username,
                email: req.user.email,
                id: req.user._id
            }
        });
    } else res.status(200).json({ user: req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;