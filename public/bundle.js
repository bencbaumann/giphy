/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// var animals = require('./animals.js');
var gifs = __webpack_require__(1);
var url = __webpack_require__(2);
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = [
    "Sienfeld",
    "Cosby Show",
    "The Office",
    "Room 104",
    "The Sopranos",
    "Bob's Burgers",
    "Simpsons",
    "Futurama"
]

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
    test: 'https://api.giphy.com/v1/gifs/search?api_key=0fnyoCvqyVDJ2ZYwpVxiwY7Nz30NbOCp&q=peaches&limit=5&offset=0&rating=R&lang=en',
    baseUrl: 'https://api.giphy.com/v1/gifs/',
    resource: 'search',
    options: {
        apikey: '0fnyoCvqyVDJ2ZYwpVxiwY7Nz30NbOCp',
        q: 'bunnies',
        limit: 12,
        rating: 'R',
        lang: 'en'
    },
    setQuery: function(q){
        this.options.q = q;
    },
    make: function() {
        return `${this.baseUrl}${this.resource}?q=${this.options.q}&api_key=${this.options.apikey}&limit=${this.options.limit}&rating=${this.options.rating}&lang=${this.options.lang}`;
    },
    request: function () {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
        }
        httpRequest.onreadystatechange = this.displayContents;
        httpRequest.open('GET', this.make());
        httpRequest.send();
      },
      displayContents: function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText).data;
            
            $('#gifs').html("");
            data.forEach(appendToGifs);

            function appendToGifs(el){

                var div = $('<div class = "card" style="width: 20rem">')
                var img = $('<img class = "card-img-top gif">');
                img.attr({
                  'src': el.images.fixed_height.url,
                  'data-still': el.images.fixed_height_still.url,
                  'data-animate': el.images.fixed_height.url,
                  'data-state': 'animate'                  
                });
                
                var divBody = $('<div class="card-body">');
                var h4 = $('<h4 class="card-title">');
                h4.text(`Rated: ${el.rating}`);
                var p = $('<p class="card-text>');
                p.text("Some quick example text to build on the card title and make up the bulk of the card's content.");
                var a = $('<a class="btn btn-primary">');
                a.attr('href', el.bitly_gif_url);
                a.text("See on Giphy");
                divBody.append(h4);
                divBody.append(p);
                divBody.append(a);

                div.append(img);
                div.append(divBody);

                var divCardWrapper = $('<div class="card-wrapper">');
                divCardWrapper.append(div);
                console.log(divCardWrapper);
                $('#gifs').append(divCardWrapper);
            }
            
          } else {
            alert('There was a problem with the request.');
          }
        }
      }
}




/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map