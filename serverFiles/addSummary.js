var {mongoose} = require('./mongoose');
var {Summary} = require('./summarySchema');

var addSummary = (sumDoc, callback) => {
    var sum = new Summary(sumDoc);
    sum.save().then((doc) => {
        console.log(doc);
        return callback(undefined, doc);
    }, (e) => {
        return callback(e);
    });
};

module.exports = {addSummary};