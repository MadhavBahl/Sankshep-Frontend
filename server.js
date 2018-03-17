const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const {mongoose} = require('./serverFiles/mongoose');

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

app.post('/saveData', (req, res) => {
    
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

app.listen (port, () => {
    console.log(`Server is up on port ${port}`);
})