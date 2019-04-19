// create an array of buttons

$(document).ready(function () {

    var buttList = ["Dennis Reynolds", "Dee Reynolds", "Charlie Kelly", "Dee Reynolds"];

    // produce buttons
    function buttLoop(butts) {
        for (i = 0; i < butts.length; i++) {
            let button = $("<button>" + butts[i] + "</button>");
            // button.attr("data-search", butts[i]);
            button.attr("value", butts[i]);
            // button.attr("data-search", butts[i]);
            button.addClass("gifButt");
            $("#buttSpot").append(button);
        }
    }

    // Produce gifs when a gif button is pressed
    $(".gifButt").on("click", function () {
        var search = $(this).attr("gifButt");
        console.log(search);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search +
            "&api_key=X5j7rw3BXSVKfmei856bV9ww2EGL7BUd&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var giph = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height.url);

                    giph.prepend(p);
                    giph.prepend(gifImage);

                    $("#gifSpot").prepend(giph);
                }
            });

    });



    buttLoop(buttList);

});