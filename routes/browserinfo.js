var router = require('express').Router();
var BrowserInfoModel = require('../models/browserinfo').BrowserInfoModel;

router.post('/', function(req, res) {
    console.log(req.body);

    // generate the signature

    var obj = {
        signature: generateSignature(req.body)
    };

    if (req.body.userid) {
        obj._id = req.body.userid;
    }

    var info = new BrowserInfoModel(obj);
    info.save(function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    });
});

function generateSignature(frontEndBrowserInfo) {
    return 'asdf-asdf53a435adfs';
}

module.exports = router;