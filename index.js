import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
const API_URL_GEOPOSITION = 'http://api.openweathermap.org/geo/1.0/direct'
const API_KEY = 'c7c2651dbe9aac60faa8c3cd210c5c9f';

app.get('/', (req, res) => {
    res.render('index.ejs', { content: 'Waiting for data...'});
});

app.get('/get-weather', async (req, res) => {
    const { location, units } = req.query;
    console.log(req.query)
    try {
        const response = await axios.get(`${API_URL_GEOPOSITION}?q=${location}&limit=1&appid=${API_KEY}&units=${units}`);
        const latitude = response.data[0].lat;
        const longitude = response.data[0].lon;
        const weather = await axios.get(`${API_URL_WEATHER}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units${units}`);
        const ambient = weather.data.weather[0].main;
        const temp = weather.data.main.temp;
        res.render('index.ejs', { content: ambient, temp: temp })
    } catch(error) {
        // Maneja los errores adecuadamente
        res.render('index.ejs', { content: error.message || 'An error occurred while fetching weather data'});
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
