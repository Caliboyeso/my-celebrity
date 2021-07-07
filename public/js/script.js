// Chosen CSS
var config = {
  ".chosen-select": {},
  ".chosen-select-deselect": {
    allow_single_deselect: true,
  },
  ".chosen-select-no-single": {
    disable_search_threshold: 10,
  },
  ".chosen-select-no-results": {
    no_results_text: "Oops, nothing found!",
  },
  ".chosen-select-width": {
    width: "95%",
  },
};

// Targeting the <selector> element to make select boxes user friendly
for (var selector in config) {
  $(selector).chosen(config[selector]);
}

// onClick event for when the user clicks submit
$("#submit-btn").on("click", function (event) {
  
  // Canceling the event
  event.preventDefault();

  // This function checks to see if there are any empty answers
  function validateSurvey() {
    var isValid = true;
    $(".chosen-select").each(function () {
      if ($(this).val() === "") {
        isValid = false;
      }
    });
    return isValid;
  }

  // If all questions have been answered...
  if (validateSurvey()) {
    // This stores the user's scores
    var userData = {
      scores: [
        $("#q1").val(),
        $("#q2").val(),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val(),
        $("#q6").val(),
        $("#q7").val(),
        $("#q8").val(),
        $("#q9").val(),
        $("#q10").val(),
      ],
    };

    // Using AJAX to submit the data to the celebrities API
    $.post("/api/celebrities", userData, function (data) {
      // Grab the result from the AJAX post so that the best match's name and photo are displayed.
      $("#match-name").text(data.name);
      $("#match-img").attr("src", data.photo);

      // Show the modal with the best match
      $("#results-modal").modal("toggle");
    });
    // Else give an alert to fill out all the fields
  } else {
    alert("Please fill out all fields before submitting!");
  }
});

// onClick event for when the user clicks on the close button
$("#close-btn").on("click", function () {
  // Reloading page
  location.reload();
  // Scroll page back to top
  window.scrollTo(0, 0);
});
