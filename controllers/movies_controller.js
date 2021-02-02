var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var movie = require("../models/movies.js");

router.get("/", function(res, req) {
    movie.all(function(data) {
        var newObj = {
            movies: data
        };
        console.log(newObj);
        res.render("index", newObj);
    });
});

router.post("/api/movies", function (req, res) {
    movie.create([
        "title", "rating"
    ], [req.body.title, req.body.rating],
    function(result) {
        res.json({id: result.insertId});
    });
});

router.put("/api/movies/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    movie.update({
        watched: true
    }, condition,
     function(result) {
        if (result.affectedRows === 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

module.exports = router;