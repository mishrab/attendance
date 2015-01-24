
var mongoose = require('mongoose');

var BrowserInfoModel = mongoose.model('Browserinfo', {

    _id: {
        type: ObjectId
    },
    signature: {
        type: string,
        required: true
    }

});

module.exports.BrowserInfoModel = BrowserInfoModel;