/* global $ */
'use strict';

var title_element,
    title_render,
    element_ids = ['ushd1', 'ushd2', 'ushd3', 'ushd4', 'ushd5'],
    apiKey = 'apikey=6e58b9075b9f4244aea471ee0e066e19',
    chamberURL = 'chamber=house&state=OR&',
    baseUrl = 'https://congress.api.sunlightfoundation.com/legislators?';

  for (var i = 0, total_elements = element_ids.length; i < total_elements; i++) {
      (function (i) {
        var myUrl = baseUrl + chamberURL + apiKey;

        $.ajax({
          url: myUrl,
          dataType: 'json',

          success: function (data) {
            console.log('\nSUCCESS: ' + myUrl);
            title_element = document.getElementById(element_ids[i]);        
            title_render = document.createTextNode(data.results[i].title + '. ' + data.results[i].first_name + ' ' + data.results[i].last_name + ' - District ' + data.results[i].district );
            title_element.appendChild(title_render);
          },

          error: function (data) {
            console.log('\nFAIL: ' + myUrl);
          }
        })
      })(i);
  }