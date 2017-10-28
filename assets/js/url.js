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


