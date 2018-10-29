$(document).ready(function() {
  $('#sections').on('change', function() {
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
        var filteredArray = res.results.filter(function(result) {
          if (result.abstract && result.multimedia.length > 0) {
            return true;
          } else {
            return false;
          }
        });
        var newArray = filteredArray.slice(0, 12);
        for (var article of newArray) {
          $('.abstract').append(`<p>${article.abstract}</p>`);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});
