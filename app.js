const express = require('express');
const hbs = require('hbs');
const path = require('path');
const callbacks = require('../callbacks');

const dir = path.join(__dirname, "pages");
const dirPartials = path.join(__dirname, "partials");
//console.log(dir);

const app = express();
const port = process.env.PORT || 4188;

app.set('view engine', 'hbs');
app.use(express.static(dir));
hbs.registerPartials(dirPartials);

app.get('', (req, res) => {
    //res.send("<h1>Olá server</h1>");
    console.log(req.query);
    if (!req.query.city) {
        res.render('index', {
            lang: 'Javascript JS',
            forecast: '',
            coordinates: ''
        })
    }else{
        const data = (dados) =>{
            res.render('index', {
                lang: 'Javascript JS',
                forecast: dados.weather,
                coordinates: `Longitude: ${dados.coord.lon} Latitude: ${dados.coord.lat}` 
            })
        }

        callbacks(req.query.city, data);
    }
}); 

app.get('/about', (req, res) => {
    res.send(`<h2 style="color:green">About</h2>`);
})

app.get('/json', (req, res) => {
    const data = {
        name: "web-server",
        date: "16/07/2020"
    } 

    res.send(data);
});

app.get('*', (req, res) => {
    res.render('404', {
        err: 'Something happened'
    })
}); 

app.listen(port, () => {
    console.log('Server running');
});