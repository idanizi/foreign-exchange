/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const request = require('request');

const axios = require('axios');

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
let delaySimulationTimer;
server.use(function (req, res, next) {
  delaySimulationTimer = setTimeout(next, 500);
});

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});


server.get('/convert/', function (req, res, next) {
  
  clearTimeout(delaySimulationTimer);
  
  const { _from, to, amount, decimal_places } = req.query;
  const url = 'https://sonar.trading/api/v1/convert'
    + `?from=${_from}&to=${to}&amount=${amount}&decimal_places=${decimal_places}`;

  request({
    url,
    'method': "GET",
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.json(JSON.parse(body));
    } else {
      res.status(501).json({ message: error });
    }
  })
});

// Use default router
server.use(router);

// Start server
const port = 8080;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});