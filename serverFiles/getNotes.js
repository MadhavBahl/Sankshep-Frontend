const {mongoose} = require('./mongoose');
const {Summary} = require('./summarySchema');

const getNotes = (searchString, callback) => {
    Summary.find({"keywords": { "$regex": searchString, "$options": "i" }}, (err, docs) => {
        if (err) {
            return console.log(err);
        }
        callback(undefined, docs);
    });
};

module.exports = {getNotes};