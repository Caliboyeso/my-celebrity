// Storing the celebrities.js file
var celebrities = require("../data/celebrities");

// Exporting function
module.exports = function (app) {

    // Renders the list of celebrities in JSON format
    app.get("/api/celebrities", function(req, res) {
        res.json(celebrities);
    });

    // Sends the best match to the server
    app.post("/api/celebrities", function(req, res) {
        // This stores the users best match
        var bestMatch = {
            name: "",
            photo: "",
            celebrityDifference: Infinity
        };

        // This stores the users data
        var userData = req.body;

        // This stores the users score
        var userScores = userData.scores;

        // This will store the difference between the user's score and the scores of each celebrity
        var totalDifference;

        // A for loop to loop through all the celebrities in the database
        for (var i = 0; i < celebrities.length; i++) {
            // This stores the current celebrity being looped through
            var currentCelebrity = celebrities[i];
            // Setting totalDifference to zero
            totalDifference = 0;
            // Logging celebrity name to the console
            console.log(currentCelebrity.name);
            // A for loop to loop through all the celebrities scores
            for (var j = 0; j < currentCelebrity.scores.length; j++) {
                // This stores the currentCelebrity score
                var currentCelebrityScore = currentCelebrity.scores[j];
                // This stores the user's score
                var currentUserScore = userScores[j];
                // Calculating the user's score and and the currentCelebrity score
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentCelebrityScore));
            }

            // If the totalDifference is less than the celebrityDifference...
            if (totalDifference <= bestMatch.celebrityDifference) {
                // Stores the bestMatch name
                bestMatch.name = currentCelebrity.name;
                // Stores the bestMatch photo
                bestMatch.photo = currentCelebrity.photo;
                // Assigning the totalDifference to the celebrityDifference
                bestMatch.celebrityDifference = totalDifference;
            }
        }
        // Adding the users data to the celebrities array
        celebrities.push(userData);

        // Returns the users bestMatch in JSON string
        res.json(bestMatch);
    });
};