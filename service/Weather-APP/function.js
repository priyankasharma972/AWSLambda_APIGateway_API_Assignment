const fetch = require('node-fetch');
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports.getWeather = (event, context, callback) => {
  const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=covilha&units=metric&appid=${process.env.APPID}`
  // OpenWeatherMap API endpoint.

  fetch(endpoint)
    .then( res => res.json() )
    .then( body =>  {
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify({temperature: body.main.temp, timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')})
      };

      callback(null, response);
    });
};