const axios = require('axios')
const weather = require('./weatherConst')

const baseURL = weather.baseURL;


module.exports = axios.create({baseURL});
