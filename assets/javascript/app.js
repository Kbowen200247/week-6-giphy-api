$(document).ready(function() {
      // Initial array of animes
      var animes = ["Sailor Moon Crystal", "Fairy Tail", "Yowamushi", "kuroko no basket", "Chihayafuru", "Yona of the Dawn", "Blue Exorcist"];

      function displayAnimeShow() {

        var anime = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
          $("#animeview").empty();

          var results = response.data;

          console.log(response);

          for(var i = 0; i < results.length; i++) {
            var animeDiv = $("<div>");
            animeDiv.addClass("animepictures");
            var rating = results[i].rating;
            var p = $("<h2>").text("Rating: " + rating);

            var animeImage = $("<img>");
            // animeImage.attr("src", results[i].images.fixed_height.url);
            animeImage.attr("src", results[i].images.fixed_height_still.url);
            animeImage.attr("data-still", results[i].images.fixed_height_still.url);
            animeImage.attr("data-animate", results[i].images.fixed_height.url);
            animeImage.attr("data-state", "still");
            animeImage.addClass('animeImage');


            animeDiv.prepend(p);
            animeDiv.prepend(animeImage);
            $("#animeview").prepend(animeDiv);
          }

          $(".animeImage").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        });        
      }

      // Function for displaying movie data
      function renderButtons() {
        $("#animebuttons").empty();

        for(var i = 0; i < animes.length; i++) {
          var animeAdd = $("<button>");
          animeAdd.addClass("anime");
          animeAdd.attr("data-name", animes[i]);
          animeAdd.text(animes[i]);
          $("#animebuttons").append(animeAdd);
        }
      }

      $("#add-anime").on("click", function(event){
        event.preventDefault();

        var anime = $("#anime-input").val().trim();
        animes.push(anime);
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "anime"
      $(document).on("click", ".anime", displayAnimeShow);

      renderButtons();
});

