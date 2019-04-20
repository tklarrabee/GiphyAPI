// create an array of buttons

$(document).ready(function () {

    var buttList = ["Dennis Reynolds", "Dee Reynolds", "Charlie Kelly", "Dee Reynolds", "Rickety Cricket"];

    // produce buttons
    function buttLoop(butts) {
        for (i = 0; i < butts.length; i++) {
            let button = $("<button>" + butts[i] + "</button>");
            // button.attr("data-search", butts[i]);
            button.attr("id", butts[i]);
            // button.attr("data-search", butts[i]);
            button.addClass("gifButt");
            $("#buttSpot").append(button);
        }
        $(".gifButt").on("click", function () {
            var search = $(this).attr("id");
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
                        gifImage.attr("src", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-state", "still")
                        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-animate", results[i].images.fixed_height.url);
                        gifImage.addClass("pause");

                        giph.prepend(p);
                        giph.prepend(gifImage);

                        $("#gifSpot").prepend(giph);
                    }
                    $(".pause").on("click", function () {
                        console.log("clicky-clicky");
                        var state = $(this).attr("data-state");
                        if(state === "still"){
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        }else{
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        };
                    });
                });
        });
    };

    $("#addButt").on("click", function () {
        var newButt = $("input:text").val();
        buttList.push(newButt);
        $("#buttSpot").empty();
        buttLoop(buttList);
    });


    // Produce gifs when a gif button is pressed

    buttLoop(buttList);




});