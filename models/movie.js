var orm = require("../config/orm.js");

var movie = {
    all: function(cb) {
        orm.all("movies", function(res) {
            cb(res);
        });
    },
    create: function(cols, vals, cb) {
        orm.create("movies", cols, vals, function(res) {
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("movies", objColVals, condition, function(res) {
            cb(res);
        });
    },
    delete: function(id, cb) {
        orm.delete("movies", id, function(res) {
            cb(res);
        });
    }
};

module.exports = movie;