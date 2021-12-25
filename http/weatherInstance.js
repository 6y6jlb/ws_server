const axios = require('axios')


const baseURL = 'https://api.openweathermap.org/data/2.5/weather/';
module.exports = axios.create({baseURL});