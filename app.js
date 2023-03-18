const ejs = require('ejs');
const express = require('express');
const AirplaneSeatingController = require('./controllers/airplane-seating');

const app = express();

// setting ejs with express.js as a by default template engine
app.set('view engine', 'ejs');
// using static file
app.use(express.static('public'));

// using urlencoded middleware for using  form data
app.use(express.urlencoded({ extended: true }));
// using json middleware for using  json data
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '1800');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, PATCH, OPTIONS'
    );
    next();
});
let airPlaneSeatingResult = [];
// home router
app.get('/', (req, res) => {
    console.log(airPlaneSeatingResult)
    return  res.render('pages/home.ejs', { airPlaneSeatingResult, title: 'Home Page' });
  
});
console.log(airPlaneSeatingResult)
app.post('/', (req, res) => {
    const { seatRowColumns, passengers } = req.body;
    const passenger = +passengers;
    const bracketsRegex = /(\[*\]*)/g;
    const seats = seatRowColumns.split(/\s*]\s*,\s*\[\s*/).map((ele) => {
        const arr = ele.replace(bracketsRegex, '').split(',');
        return [+arr[0], +arr[1]];
    });
    airPlaneSeatingResult.length = 0;
    const result = new AirplaneSeatingController(seats, passenger);
    airPlaneSeatingResult.push(result.autoAssignedSeats);
    res.redirect("/"); // redirect to the get Method
    res.end();
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
