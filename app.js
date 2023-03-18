// importing express and ejs
const express = require('express');

const app = express();

// setting ejs with express.js as a by default template engine
app.set('view engine', 'ejs');

// using static file
app.use(express.static('public'));

// using urlencoded middleware for using  form data
app.use(express.urlencoded({ extended: true }));

// using json middleware for using  json data
app.use(express.json());

const pLangaugeArray = [];
// home router
app.get('/', (req, res) => {
    res.render('pages/home.ejs', { pLangaugeArray, title: 'Home Page' }); // passing data to the EJS Template
    res.end();
});

app.post('/', (req, res) => {
    const { pLangauge } = req.body;
    pLangaugeArray.push(pLangauge);
    res.redirect('/'); // redirect to the get Method
});

// contact router
app.get('/contact', (req, res) => {
    res.render('pages/contact.ejs', { title: 'Contact Page' }); // passing data to the EJS Template;
    res.end();
});

// listening server
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`Server Is Running on Port ${port}`);
});
