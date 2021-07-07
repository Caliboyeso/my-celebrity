// Storing the path package
var path = require("path");

// Exporting function
module.exports = function (app) {

    // Renders the survey page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../views/survey.html"));
    });


    // Renders the home page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/../views/index.html"));
    });

};