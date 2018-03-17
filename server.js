const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const {mongoose} = require('./serverFiles/mongoose');
const {Summary} = require('./serverFiles/summarySchema');
const {addSummary} = require('./serverFiles/addSummary');
const {getData} = require('./serverFiles/getData');
const {getNotes} = require('./serverFiles/getNotes');
const {sendMail} = require('./serverFiles/sendMail');

const port = process.env.PORT || 8000;

var app = express();
app.use(bodyParser());
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

/* =========================================== */
/* ===== Temprary route for dev purposes ===== */
/* =========================================== */

/* ===== End of user based temprary route ===== */

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/404', (req, res) => {
    res.render('404.hbs');
});

app.get('/saveData', (req, res) => {
    res.render('404.hbs', { error: 'GET /saveData is not <b>PERMITTED</b>' });
});

app.post('/saveData', (req, res) => {
    if (req.body.longitude) {
        var sumDetails = {
            title: req.body.title,
            keywords: req.body.keywords,
            summary: req.body.summary
        };
    } else {
        var sumDetails = {
            title: req.body.title,
            keywords: req.body.keywords,
            summary: req.body.summary,
            longitude: req.body.longitude,
            latitude: req.body.latitude
        };
    }
    
    addSummary(sumDetails, (err, doc) => {
        if (err) {
            return res.render('404.hbs', { error: 'Could not save the summary to the database!' });
        }
        res.send(doc);
    });
});

app.get('/getAllSummary', (req, res) => {
    getData((err, data) => {
        if (err) {
            return res.send(err);
        }
        return res.send(data);
    });
});

app.post('/getNotes', (req, res) => {
    var searchQuery = req.body.search;
    getNotes(searchQuery, (err, data) => {
        if (err) {
            res.render('404.hbs', {error: 'Could not connect to the database, Please try again later!'});
        }

        res.send(data);
    }); 
});

app.post('/sendMail',(req,res) => {
    var details = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        feedback: req.body.message
    };
    console.log('Details are: ', details);
    sendMail(details,(err,info) => {
        if (err) {
            res.redirect('404.hbs');
            console.log(err);
        }
        console.log(info);
        res.render('index.hbs');
    });
});

app.post('/sendMail', (req, res) => {
    var details = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };

    sendMail(details, (err, response) => {
        if (err) {
            return res.render('404.hbs', {error: 'Could Not Send Email! Please Try Again After Some Time!'});
        }

        res.redirect('/');
    });
});

app.listen (port, () => {
    console.log(`Server is up on port ${port}`);
})