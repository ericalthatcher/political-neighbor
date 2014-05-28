/* global $ */
'use strict';

var titleElement,
    titleRender,
    elementIds = ['ushd1', 'ushd2', 'ushd3', 'ushd4', 'ushd5'],
    elementFacts = ['ushdF1', 'ushdF2', 'ushdF3', 'ushdF4', 'ushdF5'],
    apiKey = 'apikey=6e58b9075b9f4244aea471ee0e066e19',
    chamberURL = 'legislators?chamber=house&state=OR&',
    committeeURL = 'committees?member_ids=',
    memberIds = ['B001278&', 'W000791&', 'S001180&', 'D000191&', 'B000574&'],
    baseUrl = 'https://congress.api.sunlightfoundation.com/';

  for (var i = 0, totalElements = elementIds.length; i < totalElements; i++) {
      (function (i) {
        var myUrl = baseUrl + chamberURL + apiKey;
        $.ajax({
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

  for (var i = 0, totalCommittees = memberIds.length; i < totalCommittees; i++) {
      (function (i) {
        var myUrlTwo = baseUrl + committeeURL + memberIds[i] + apiKey;
        $.ajax({
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