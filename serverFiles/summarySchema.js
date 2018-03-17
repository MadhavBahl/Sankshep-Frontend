var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var summarySchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    }, keywords: {
        type: String,
        required: true,
        trim: true
    }, summary: {
        type: String,
        required: true,
        trim: true
    }, longitude: {
        type: Number,
        required: false
    }, latitude: {
        type: Number,
        required: false
    }
});

var Summary = mongoose.model('Summary', summarySchema);

module.exports = {Summary};