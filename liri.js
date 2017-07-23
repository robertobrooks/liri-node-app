var userInput = process.argv[2];
var selectInput = process.argv[3];

switch (true) {
    case userInput === 'my-tweets':
        getTweets();
        break;
    case userInput === 'spotify-this-song':
        if (!process.argv[3]) {selectInput = 'The Sign'}
        spotifyFc();
        break;
    case userInput === 'movie-this':
        if (!process.argv[3]) {selectInput = 'Mr. Nobody'}
        movieFc();
        break;
    case userInput === 'do-what-it-says':
        doFc();
        break;
    default:
        console.log('Please indicate if you would like my-tweets');
}

function spotifyFc () {
var Spotify = require('node-spotify-api');
var spotifyKeys = require("./config.js");
var spotify = new Spotify(spotifyKeys);
 
spotify.search({ type: 'track', query: selectInput }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    console.log(data.tracks.items[6].artists[0].name); 
    console.log(data.tracks.items[6].name); 
    console.log(data.tracks.items[6].album.name); 
    console.log(data.tracks.items[6].preview_url); 
});
}

function getTweets () {
    var Twit = require('twit');
    var twitterKeys = require("./config.js");
    var tweet = new Twit(twitterKeys);

var param = {
    q: 'nwuroberto',
    count: 20
    } 

tweet.get('search/tweets', param , searchedData);
    function searchedData(err, data, response) {
     for (var i=0 ; i < data.statuses.length; i++) {
        console.log(data.statuses[i].text);
    }
} 
}

function movieFc () {
    var request = require('request');
    request('http://www.omdbapi.com/?t='+selectInput+'&apikey=40e9cece', function (error, response, body) {
        console.log('Title: '+JSON.parse(body).Title); 
        console.log('Year: '+JSON.parse(body).Year); 
        console.log('IMDB Rating: '+JSON.parse(body).Ratings[0].Value); 
        console.log('Rotten Tomatoes Rating: '+JSON.parse(body).Ratings[1].Value); 
        console.log('Country: '+JSON.parse(body).Country); 
        console.log('Language: '+JSON.parse(body).Language); 
        console.log('Plot: '+JSON.parse(body).Plot); 
        console.log('Actors: '+JSON.parse(body).Actors); 
});
}

function doFc () {
    var fs = require("fs");

    fs.readFile('./random.txt', 'utf-8', function(err, data) {
    dataSplit = data.split(",");
 
    switch (true) {
    case dataSplit[0] === 'my-tweets':
        getTweets();
        break;
    case dataSplit[0] === 'spotify-this-song':
        if (!dataSplit[1]) {selectInput = 'The Sign'} else {selectInput = dataSplit[1]}
        spotifyFc();
        break;
    case dataSplit[0] === 'movie-this':
        if (!dataSplit[1]) {selectInput = 'Mr. Nobody'} else {selectInput = dataSplit[1]}
        movieFc();
        break;
    case dataSplit[0] === 'do-what-it-says':
        doFc();
        break;
    default:
        console.log('select either my-tweets/spotify-this-song/movie-this/do-what-it-says');
}
});
}