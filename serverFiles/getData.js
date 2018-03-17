const {mongoose} = require('./mongoose');
const {Summary} = require('./summarySchema');

const getData = (callback) => {
    Summary.find({}, (err, docs) => {
        if (err) {
            return console.log(err);
        }
        callback(undefined, docs);
    });
};

module.exports = {getData};