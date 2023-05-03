const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define Path - Express Configuration
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set Up Handlebars engine and Views Location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);
// Set up static directory to serve
// File Path provided cannot be relative
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    // Renders the "index" HTML template with the provided values 
    res.render('index', {
        title: 'Weather App',
        name: 'Adam Dixon'
    });
})

app.get('/about', (req, res) => {
    // Renders the "about" HTML template with the provided values 
    res.render('about', {
        title: 'About Page',
        name: 'Adam Dixon'
    })
})

app.get('/help', (req, res) => {
    // Renders the "help" HTML template with the provided values 
    res.render('help', {
        title: 'Help Page',
        message: 'Yo, figure out how to use the site, please.',
        name: 'Adam Dixon'
    })
})

// Handling a GET request to the weaather page on the server
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, { latitude, longitude , location } = {}) => {
        if (err) {
            return res.send({ error: err })
        } else {
            forecast(latitude, longitude, (err, forecastData) => {
                if (err) {
                    return res.send({ error: err })
                } else {
                    res.send({
                        location,
                        weather: forecastData
                    })
                }
            })
        }
    })

    // const location = req.query.address;
    // const forecast = 'Bright and Sunny';

    // res.send({
    //     location,
    //     forecast
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        error: 'Help Article Not Found',
        name: 'Adam Dixon'
    })
})

// * - Wildcard character for any route which has not been declared
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        error: 'Page Not Found',
        name: 'Adam Dixon'
    })
})

// Configures the port on which our server is listening for requests
// Remains up and running to listen for requests
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});