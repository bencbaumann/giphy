"use strict";
// var animals = require('./animals.js');
var gifs = require("./tvshows.js");
var url = require("./url");
console.log("do a thing");

var createButton = function(name) {
  var a = $("<a>");
  a.attr("href", "#");
  a.attr("data-gif-name", name);
  a.addClass("button text-center");
  a.text(name);
  $("#buttons").append(a);
};

gifs.forEach(createButton);

$("#buttons").on("click", ".button", function() {
  url.setQuery($(this).attr("data-gif-name"));
  url.request();
});

function getValFromInputCreateButtons(){
    $(".get-gif").val()
    .split(',')
      .forEach(createButton);
    $(".get-gif").val("");
}

$(".get-gif").on("keyup", function(ev) {
  if (ev.keyCode === 13) {
    getValFromInputCreateButtons();
  }
});

$(".get-gif-button").on("click", getValFromInputCreateButtons);



$("#gifs").on("click", ".gif", function() {
    //swaps between still and animated state
  ($(this).attr("data-state") === "still"
    ? () => {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
    : () => {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      })();
});

$("#cloud-function").on('click', function(){

    $.ajax({
          type: 'POST',
          url: 'https://us-central1-giphy-96d84.cloudfunctions.net/hello/api',
          contentType: 'text/plain',
        
          xhrFields: {
            withCredentials: false
          },
        
          headers: {
                'Access-Control-Allow-Origin': '*',
          },
        
          success: function(res) {
            // Here's where you handle a successful response.
            console.log(res);
          },
        
          error: function() {

          }
        });
});