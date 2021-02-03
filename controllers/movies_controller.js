var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var movie = require("../models/movie.js");

router.get("/", function(req, res) {
    movie.all(function(data) {
        var obj = {movies: data};
        res.render("index", obj);
    });
});

router.post("/api/movies", function (req, res) {
    movie.create([
        "title", "rating"
    ], [req.body.title, req.body.rating],
    function(result) {
        res.json({id: result.insertId});
        console.log(result);
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

router.delete("/api/movies/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    movie.delete(condition, function(result) {
        if (result.affectedRows === 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

module.exports = router;