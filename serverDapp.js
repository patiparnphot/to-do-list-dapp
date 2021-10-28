var express = require('express');

var TodoRoute = require('./routes/todo.js');

var cors = require('cors');

// The Express app is exported so that it can be used by serverless Functions.
function app() {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(cors());

  server.use("/api/todos", TodoRoute);

  server.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  return server;
}

function run() {
  const port = 1210;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
