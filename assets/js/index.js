"use strict";
// var animals = require('./animals.js');
var animals = require("./tvshows.js");
var url = require("./url");
console.log("do a thing");

var createButton = function(name) {
  var a = $("<a>");
  a.attr("href", "#");
  a.attr("data-animal", name);
  a.addClass("button text-center");
  var div = $('<div class="text-center">');
  a.html(name);
  return div.append(a);
};

var appendButton = function(btn) {
  $("#buttons").append(btn);
};

animals.map(createButton).map(appendButton);

$("#buttons").on("click", ".button", function() {
  url.setQuery($(this).attr("data-animal"));
  url.request();
});

$(".get-animal").on("keyup", function(ev) {
  if (ev.keyCode === 13) {
    [ev.target.value].map(createButton).map(appendButton);
    $(this).val("");
  }
});

$(".get-animal-button").on("click", function() {
  [$(".get-animal").val()].map(createButton).map(appendButton);
  $(".get-animal").val("");
});

$("#animals").on("click", ".gif", function() {
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
