const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = (new Date()).toString();
    fs.appendFile('server.log', `${now}: ${req.method} ${req.url}\n`, (e) => {
        if(e)
            console.log('Unable to appendFile to server.log');
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => (new Date).getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        currentYear: (new Date).getFullYear(),
        welcomeMessage: 'Welcome'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
        currentYear: (new Date).getFullYear()
    })
});

app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'Unable to fulfill this request'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});