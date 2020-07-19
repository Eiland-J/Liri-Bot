require("dotenv").config();

// Dependencies
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var request = process.argv[2];
var value = process.argv.slice(3).join(" ");

function goLiri(request, value) {
    switch (request) {
      case "concert-this":
        findConcert(value);
  
        break;
  
      case "spotify-this-song":
        getSong(value);
  
        break;
  
      case "movie-this":
        getMovie(value);
  
        break;
  
      case "do-what-it-says":
        doWhatItSays(value);
  
        break;
  
      default:
        break;
    }
  }


  function findConcert(artist) {
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
          artist +
          "/events?app_id=codingbootcamp"
      )
      .then(function (response) {
        console.log("Artist: " + artist);
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city);
  
        var concertDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
        console.log("Concert Date : " + concertDate);
      })
      .catch(function (error) {
        console.log("Error, please try again");
        console.log(error);
      });
  }

  function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
  
        var randomInfo = data.split(",");
        runLiri(randomInfo[0], randomInfo[1]);
      }
    });
  }


  goLiri(request,value)