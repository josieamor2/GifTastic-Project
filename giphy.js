
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

var APIKey = "9Mc17b4OANxgodiNPHV46mrG1RLZit64";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});

var signs = ["Cancer", "Scorpio", "Aquarius" , "Picses" , "Taurus" ];


function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons").empty();

for (var newButton = 0; newButton < signs.length; newButton++){
    
    // $("#buttons").append("<button>" + signs[newButton] + "</button>");
    var a = $("<button>");
          // Adding a class
          a.addClass("signs");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", signs[newButton]);
          // Providing the button's text with a value of the movie at index i
          a.text(signs[newButton]);
          // Adding the button to the HTML
          $("#buttons").append(a);
    
}
}
$("#add-sign").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var sign = $("#sign-input").val().trim();
    // The movie from the textbox is then added to our array
    signs.push(sign);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();

// $("buttons").on("click", function() {
    
// });