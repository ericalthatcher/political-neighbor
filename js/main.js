/* global $ */
'use strict';

var p, 
    t, 
    frag, 
    foo;
// TODO: Make 1 call, not 5.  Iterate over array of element ids
//  and url numbers.
$.ajax({
  url: 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/house/OR/1/current.json?api-key=6a4c73c2adc542140983b625c9dcf477:18:68003148',
  type: 'GET',
  dataType: 'json',

  success: function (data) {
    foo = data;
    p = document.getElementById('sb');
    t = document.createTextNode(foo.results[0].name + ' - District ' + foo.results[0].district );
    p.appendChild(t);
  }

});

$.ajax({
  url: 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/house/OR/2/current.json?api-key=6a4c73c2adc542140983b625c9dcf477:18:68003148',
  type: 'GET',
  dataType: 'json',

  success: function (data) {
    foo = data;
    p = document.getElementById('gw');
    t = document.createTextNode(foo.results[0].name + ' - District ' + foo.results[0].district );
    p.appendChild(t);
  }

});

$.ajax({
  url: 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/house/OR/3/current.json?api-key=6a4c73c2adc542140983b625c9dcf477:18:68003148',
  type: 'GET',
  dataType: 'json',

  success: function (data) {
    foo = data;
    p = document.getElementById('eb');
    t = document.createTextNode(foo.results[0].name + ' - District ' + foo.results[0].district );
    p.appendChild(t);
  }

});

$.ajax({
  url: 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/house/OR/4/current.json?api-key=6a4c73c2adc542140983b625c9dcf477:18:68003148',
  type: 'GET',
  dataType: 'json',

  success: function (data) {
    foo = data;
    p = document.getElementById('pd');
    t = document.createTextNode(foo.results[0].name + ' - District ' + foo.results[0].district );
    p.appendChild(t);
  }

});

$.ajax({
  url: 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/house/OR/5/current.json?api-key=6a4c73c2adc542140983b625c9dcf477:18:68003148',
  type: 'GET',
  dataType: 'json',

  success: function (data) {
    foo = data;
    p = document.getElementById('ks');
    t = document.createTextNode(foo.results[0].name + ' - District ' + foo.results[0].district );
    p.appendChild(t);
  }

});
