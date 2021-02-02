const { query } = require("../config/connection.js");
var connection = require("../config/connection.js");


function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
}



var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT title, release_year FROM "+ tableInput + ";";
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    create: function(tableInput, cols, vals,  cb) {
        var queryString = "INSERT INTO "+ tableInput +"(";
        queryString += cols.toString();
        queryString += ") VALUES (";
        for (var i =0; i < vals.length-1; i++) {
            queryString += "?,";
        }
        queryString += "?) ";

        connection.query(queryString, vals, function(err, results) {
            if (err) throw err;
            cb(result);
        });
    },
    update: function(tableInput, objColVals, condition, cb){
        var queryString = "UPDATE "+ tableInput + "SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = orm;