$(document).ready(function() { 

  $('#submit').on('click', function (e) {
    e.preventDefault();
    const phrase = document.getElementById('searchBar').value;
    const toLink = encodeURIComponent(phrase);
    let post = "";
    $.ajax({
      type: 'GET',
      url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${toLink}&limit=10&namespace=0&format=json&warningsaserror&callback=?`,
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if (data[1].length) {
          for(let x = 0; x < data[1].length; x++) {      
            post += 
              `<a href="${data[3][x]}" target="_blank">
              <div class = "entry">
              <h3>${data[1][x]}</h3>
              ${data[2][x]}</div></a>`;
          }
          $('#result').html(post);          
        } else {
          $('#result').html('No data found.'); 
        }
      }
    });
  });
});
