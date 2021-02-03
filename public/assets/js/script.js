$(function() {
    $(".change-watched").on("click", function (event) {
        var id = $(this).data("id");
        
        
        var newWatchedState = {
            watched: true
        };

        $.ajax("/api/movies/"+id, {
            type: "PUT",
            data: newWatchedState
        }).then(function(){
            location.reload();
        });
    });

    $(".delete").on("click", function (event) {
        var id = $(this).data("id");

        $.ajax("/api/movies/"+id, {
            type: "DELETE",
            data: id
        }).then(function(){
            location.reload();
        });
    });



    $("#addNew").on("click", function(event) {
        event.preventDefault();

        var newMovie = {
            title: $("#mov").val().trim(),
            rating: $("#rat").val().trim(),
            release_year: $("#rely").val().trim()
        };

        $.ajax("/api/movies/", {
            type: "POST",
            data: newMovie
        }).then(function() {
            location.reload()
        });
    });

});