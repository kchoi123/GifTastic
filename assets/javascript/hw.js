    // Creating an array of dogs that a pre-populated for user
    var dogs = [
        "pug", "terrier", "husky", "chihuahua", "greyhound", "dobermann", 
        "malamute", "sheepdog", "bullmastiff", "samoyed", "klee kai", 
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

            // Create a break for styling purposes
            $("#buttons").prepend("<br>");
        }
    }

    // On click listener to pull gif from gif api
    $(document).on("click", ".dog-button", function () {
        event.preventDefault();


        // Emptying the div for a clean DOM
        $("#gif").empty();

        // Identifying variable with data-type that was assigned with the array name
        var type = $(this).attr("data-name");

        // Creating queryURL to be dynamically searched
        // Limit to 10 is set on the queryURL link at the very end
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=k6Uja7qOoPb0IxP4CrFv2IGnbSnJWYp3&limit=10&rating=g";

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
                var animate = results[j].images.fixed_height.url;
                console.log(results[j].images.fixed_height.url);
                console.log(animate);

                // Creating a variable to store still gif
                var still = results[j].images.fixed_height_still.url;
                console.log(results[j].images.fixed_height_still.url);
                console.log(still);

                // creating a variable for the new img elements to be created in HTML, they will be stored and appended later
                var dogGif = $("<img>");
                dogGif.attr("src", still);
                dogGif.attr("data-still", still);
                dogGif.attr("data-animate", animate);
                dogGif.attr("data-state", "still");
                dogGif.addClass("dogGiphy");

                // Appending rating and dogGiphy to the html DOM
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

    // This on click listener determins the gif to be still or animate
    // using the pausing-gifs excercise
    $(document).on("click", ".dogGiphy", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });