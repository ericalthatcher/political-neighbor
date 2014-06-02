/* global $ */
'use strict';

var titleElement,
    titleRender,
    myUrl,
    myUrlTwo,
    nameCall,
    committeeCall,
    elementIds = ['ushd1', 'ushd2', 'ushd3', 'ushd4', 'ushd5'],
    elementFacts = ['ushdF1', 'ushdF2', 'ushdF3', 'ushdF4', 'ushdF5'],
    apiKey = 'apikey=6e58b9075b9f4244aea471ee0e066e19',
    chamberURL = 'legislators?chamber=house&state=OR&',
    committeeURL = 'committees?member_ids=',
    memberIds = ['B001278&', 'W000791&', 'S001180&', 'D000191&', 'B000574&'],
    baseUrl = 'https://congress.api.sunlightfoundation.com/';

for (var i = 0, totalElements = elementIds.length; i < totalElements; i++) {
    (function (i) {
      myUrl = baseUrl + chamberURL + apiKey;
      nameCall = $.ajax({
            url: myUrl,
            dataType: 'json',

            success: function (data) {
              console.log('\nSUCCESS: ' + myUrl);
              titleElement = document.getElementById(elementIds[i]);        
              titleRender = document.createTextNode(data.results[i].title + '. ' + 
                data.results[i].first_name + ' ' + data.results[i].last_name + 
                ' - District ' + data.results[i].district );
              titleElement.appendChild(titleRender);
            },

            error: function (data) {
              console.log('\nFAIL: ' + myUrl);
            }
          })
    })(i);
}
$.noConflict();
jQuery(document).ready(function($) {
  
  //  Hides and Shows button on toggle
  $('.js-toggle-hidden-facts').click(function () {
      $(this).toggleClass('visible');
      if ($(this).hasClass('visible')) {
          $(this).text('Hide facts');
      }
      else {
        $(this).text('Get facts');
      }
      $('.columnContainer').toggleClass('hide');
  })
});  

for (var i = 0, totalCommittees = memberIds.length; i < totalCommittees; i++) {
      (function (i) {
        myUrlTwo = baseUrl + committeeURL + memberIds[i] + apiKey;
        committeeCall = $.ajax({
                            url: myUrlTwo,
                            dataType: 'json',

                            success: function (data) {
                              console.log('\nSUCCESS: ' + myUrlTwo);
                              titleElement = document.getElementById(elementFacts[i]);        
                              titleRender = document.createTextNode('Committees: ' + '\n' + data.results[i].name);
                              titleElement.appendChild(titleRender);
                            },

                            error: function (data) {
                              console.log('\nFAIL: ' + myUrlTwo);
                            }
                          })
      })(i);
}