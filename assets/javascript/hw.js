// Waiting for entire windows to be ready
$(document).ready(function () {

    // Creating an array of dogs that a pre-populated for user
    var dogs = [
        "pug", "chihuahua", "greyhound", "dobermann", "malamute",
        "terrier", "sheepdog", "bullmastiff", "samoyed"
    ];

    // Using the movie button layout example creating dynamic buttons provided in the array
    function renderButtons() {
        // Avoiding repeat buttons
        $("#buttons").empty();

        // Looping through the current array to creat buttons for each one
        for (var i = 0; i < dogs.length; i++) {

            // JQuery to create button for the array
            var newButton = $("<button>");

            // Creating a button class, dog-button
            newButton.addClass("dog-button");

            // Creating a data-attribute of a value of the array name
            newButton.attr("data-name", dogs[i]);

            // Button Text
            newButton.text(dogs[i]);

            // Adding button to HTML
            $("#buttons").prepend(newButton);
        }
    }

    // On click listener to pull gif from gif api
    $(document).on("click", ".dog-button", function () {
        // Emptying the div for a clean DOM
        $("#gif").empty();

        // Identifying variable with data-type that was assigned with the array name
        var type = $(this).attr("data-name");

        // Creating queryURL to be dynamically searched
        // Limit to 10 is set on the queryURL link at the very end
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Setting up ajax call to retrieve JSON results from GIF
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // This is the amout of results we've recieved
            var results = response.data;
            // console.log(response);
            // console.log(response.data);

            // Creating a for loop to go through every result item from the quearyURL
            for (var j = 0; j < results.length; j++) {
                // Creating a variable to store rating
                var rating = results[j].rating;
                console.log(results[j].rating);
                console.log(rating);
                // Creating variable to print rating onto DOM when appended later
                var ratingText = $("<h1>").html("Rating: " + rating);

                // Creating a variable to store moving gif
                var animated = results[j].images.fixed_height.url;
                console.log(results[j].images.fixed_height.url);
                console.log(animated);

                // Creating a variable to store still gif
                var still = results[j].images.fixed_height_still.url;
                console.log(results[j].images.fixed_height_still.url);
                console.log(still);

                // creating a variable for the new img elements to be created in HTML, they will be stored and appended later
                var dogGif = $("<img>");
                dogGif.attr("src", still);
                dogGif.attr("data-still", still);
                dogGif.attr("data-animated", animated);
                dogGif.attr("data-state", "still");
                dogGif.addClass("dog-gif");

                // Appending rating and dog-gif to the html DOM
                var dogDiv = $("<div>");
                dogDiv.append(dogGif);
                dogDiv.append(ratingText);
                $("#gif").append(dogDiv);
            }

        });
    });

    // Pausing and animating Gif using the "pausing-gifs" activities


    // On click listener to add a new breed
    $("#add-breed").on("click", function (event) {

        // Prevents from clicking itself
        event.preventDefault();

        // Setting a variable for text input in dog-input field, also triming any spaces
        var dogBreed = $("#dog-input").val().trim();

        // Pushing new variable dogBreed to dogs array
        dogs.push(dogBreed);

        // Calling the function renderButtons to add the new button that was added in the array
        renderButtons();
    });

    // Calling the function renderButtons to display the array as buttons
    renderButtons();

});