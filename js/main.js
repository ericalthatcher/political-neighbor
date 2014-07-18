/* global $ */
'use strict';

//LB: apiURL works for chamber and committee callType,
//  params allow the corrosponding data to be queried - need to further review params
function apiURL (callType, params) {
  var baseUrl = 'https://congress.api.sunlightfoundation.com/';
  var apiKey = 'apikey=6e58b9075b9f4244aea471ee0e066e19';

// TODO: do imputs for params on the UI
// LB: what do chambers and committees need to build the right API call?
  if (callType === ':chamber')
    baseUrl += 'legislators?chamber=' + params.chamber + '&state=' + params.state;
  else if (callType === ':committees')
    baseUrl += 'committees?member_ids=' + params.id;
  else
    console.error('ERROR: Bad API URL!');
  
  return baseUrl + apiKey;
}



var titleElement,
    titleRender,
    myUrl,
    myUrlTwo,
    nameCall,
    committeeCall,
    elementIds = ['ushd1', 'ushd2', 'ushd3', 'ushd4', 'ushd5'],
    elementFacts = ['ushdF1', 'ushdF2', 'ushdF3', 'ushdF4', 'ushdF5'],
    memberIds = ['B001278&', 'W000791&', 'S001180&', 'D000191&', 'B000574&'],

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