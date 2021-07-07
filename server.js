// DEPENDENCIES
// ==============================================================================
// Storing the express package
var express = require("express");

// Creating a server with express
var app = express();

// Setting up an initial PORT
var PORT = process.env.PORT || 8080;



// CONFIGURATION
// ==============================================================================
// Serving static files in Express
app.use(express.static(__dirname + "/public"));

// Allowing data to be stored in the server
app.use(express.urlencoded({  extended: true  }));
app.use(express.json());



// ROUTER
// ==============================================================================

// API route file
require("./router/apiRouter") (app);

// HTML route file
require("./router/htmlRouter") (app);



// LISTENER
// ==============================================================================
// Logging a message to the console
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});