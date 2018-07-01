$(document).ready(function () {
  // var APIKey = "9Mc17b4OANxgodiNPHV46mrG1RLZit64";

  var signs = ["Cancer", "Scorpio", "Aquarius"];
  
  function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons").empty();

    for (var newButton = 0; newButton < signs.length; newButton++) {

      // $("#buttons").append("<button>" + signs[newButton] + "</button>");
      var a = $("<button>");
      // Adding a class
      a.addClass("sign");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-name", signs[newButton]);
      // Providing the button's text with a value of the movie at index i
      a.text(signs[newButton]);
      // Adding the button to the HTML
      $("#buttons").append(a);

    }
  }
  
  $("#add-sign").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();


    // This line will grab the text from the input box
    var newSign = $("#sign-input").val().trim();
    
    if(newSign === "Aries" ||
    newSign === "Taurus" ||
    newSign === "Gemini" || 
    newSign === "Libra" || 
    newSign === "Leo" || 
    newSign === "Virgo" || 
    newSign === "Sagittarius" || 
    newSign === "Capricorn" || 
    newSign === "Pisces")
  {

    renderButtons();
    signs.push(newSign);
    newSign = $("#sign-input").val().trim();
    
   

    // calling renderButtons which handles the processing of our movie array
    
    signsGifs();
  }else{
    alert("This is not a Horoscope Sign. Try again.");
    $("#sign-input").val("");
    

  };
    // The movie from the textbox is then added to our array
    
  
  });
  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();
 

 function signsGifs(){
  $("button").on("click", function () {
    // Grabbing and storing the data-animal property value from the button
    eachSign = $(this).attr("data-name");

    // $("#gifs-appear-here").empty();
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      eachSign + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performisng an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function (response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var signDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var signImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          signImage.attr("src", results[i].images.fixed_height.url);



          signImage.attr("data-still", results[i].images.fixed_height_still.url); // still image
          signImage.attr("data-animate", results[i].images.fixed_height.url); // animated image
          signImage.attr("data-state", "still"); // set the image state
          signImage.addClass("image");


          // Appending the paragraph and image tag to the animalDiv
          signDiv.append(p);
          signDiv.append(signImage);


          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div

          $("#gifs-appear-here").prepend(signDiv);
        }


        $(".image").on("click", function () {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      }); 
  });
};

signsGifs();
});