//Sets up the JavaScript so that it runs only when the webpage has loaded first.
$(document).ready(function() {
  $('#sections').on('change', function() {
    $('#articles').empty();
    $('.grid').html(
      '<img src="http://preloaders.net/preloaders/287/Filling%20broken%20ring.gif"> loading...'
    );
    var choice = $('#sections option:selected').val();
    var url = `https://api.nytimes.com/svc/topstories/v2/${choice}.json`;
    url +=
      '?' +
      $.param({
        'api-key': '2025e19d83a34f72b6fdab001a7b971a'
      });

    $.ajax({
      url: url,
      method: 'GET'
    })

      .then(function(res) {
        $('header').css('height', '20vh');
        $('.image-logo').css('align-items', 'flex-start');
        $('.image-logo').css('height', '70%');
        $('.section-selector').css('padding-left', '4rem');

        if ($(window).width() < 900) {
          $('.section-selector').css('align-items', 'center');
          $('.image-logo').css('margin-left', '15%');
        }

        // if ($(window).width() <= 600){
        // $("header").css("height", "100vh");
        // $(".image-logo").css("align-items", "center");
        // $("#dropDownMenu").css({"margin-left":"0%"});
        // $(".image-logo").css({"margin-top":"10%"});
        // $("#logoDropDownContainer").css({"margin-bottom":"15%"});
        // $(".image-logo").css("height", "60%");
        // }
        var filteredArray = res.results.filter(function(result) {
          if (result.abstract && result.multimedia.length > 0) {
            return true;
          } else {
            return false;
          }
        });
        $('.grid').empty();
        var newArray = filteredArray.slice(0, 12);
        for (var article of newArray) {
          $('.grid').append(
            `<div class='article'>
              <p>${article.abstract}</p>
              <img src='${article.multimedia[3].url}'>
            </div>`
          );
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  $('.article').hover(function() {
    console.log('hi');
  });
});
