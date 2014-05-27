/* global $ */
'use strict';

var title_element,
    title_render,
    element_ids = ['ushd1', 'ushd2', 'ushd3', 'ushd4', 'ushd5'],
    district_numbers = ['1', '2', '3', '4', '5'],
    apiKey = 'api-key=6a4c73c2adc542140983b625c9dcf477:18:68003148',
    baseUrl = 'https://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/house/OR/';

  for (var i = 0, total_districts = district_numbers.length; i < total_districts; i++) {
      (function (i) {
        var myUrl = baseUrl + district_numbers[i] + '/current.json?' + apiKey;

        $.ajax({
          url: myUrl,
          dataType: 'json',

          success: function (data) {
            console.log('\nSUCCESS: ' + myUrl);
            title_element = document.getElementById(element_ids[i]);        
            title_render = document.createTextNode(data.results[0].name + ' - District ' + data.results[0].district );
            title_element.appendChild(title_render);
          },

          error: function (data) {
            console.log('\nFAIL: ' + myUrl);
          }
        })
      })(i);
  }