/* global $ */
'use strict';

/**
* TODO: review params
* apiURL works for chamber and committee callType,
*/

function apiURL (callType, params) {
  var baseUrl = 'https://congress.api.sunlightfoundation.com/';
  var apiKey  = '&apikey=6e58b9075b9f4244aea471ee0e066e19';

/**
* TODO: do imputs for params on the UI to scale beyond Oregon
* what chambers and committees need to build the right API call
*/  
  if (callType === ':chamber')
    baseUrl += 'legislators?chamber='+ params.chamber +'&state=' + params.state;
  else if (callType === ':committees')
    baseUrl += 'committees?member_ids=' + params.id;
  else
    console.error('ERROR: Bad API URL');

  return baseUrl + apiKey;
}

/**
* Sets up member function that holds name, id, and committee
* information.  
*/
var Member = function (first, last, id) {
  this.first      = first;
  this.last       = last;
  this.id         = id;
  this.name       = this.first + ' ' + this.last;
  this.shortname  = (this.last + this.first[0]).toLowerCase();
  this.committees = [];
};

Member.prototype.setCommittees = function(committees) {
  this.committees = committees.sort(sortAlpha);
  
  function sortAlpha(a,b){
    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
  };

};


/**
* placeOnPage - inserts html structure onto page.  
*/
Member.prototype.placeOnPage = function() {
  var template = '<div class="columnContainer hide"> <div class="column"> <h3 class="title" id="'+ this.shortname +'">'+ this.name +'</h3> <div class="row"> <div class="large-6 columns"><img id="politican" src="img/'+ this.shortname +'.jpg" data-name="'+ this.name +'"><h5 class="list-header"><u>Committees</u></h5><p class="facts" id="'+ this.shortname +'"> '+ this.committees.join(" <br> ") +' </p></div></div><hr /></div> </div>';

  $(function(){
    $('#member-list').append(template);
  });
};

/**
* toggleGetFactsButton - shows facts!
*/

var toggleGetFactsButton = function(){
  $('.js-toggle-hidden-facts').click(function () {
    var $btn = $(this);
    $btn.toggleClass('visible');

    if ($btn.hasClass('visible'))
      $btn.text('Hide facts');
    else
      $btn.text('Get facts');

    $('.columnContainer').toggleClass('hide');
  });
};

/**
* getMembers - sets up ajax call with custom chamber and state
*/
function getMembers (chamber, state) {
  $.ajax({url: apiURL(':chamber', {chamber: chamber, state: state}), dataType: 'json'})
   .error(function(data){ console.error('ERROR in getMembers'); })
   .success(function (data) {
      var members = $.map(data.results, function(e, i){
        return new Member(e.first_name, e.last_name, e.bioguide_id);
      });
      getCommitteesFor(members);
  });
}

function getCommitteesFor (members) {
  for (var i in members)
    getCommittees(members[i]);
}

/**
* getCommittees - gets committee data for given member
*/
function getCommittees (member) {
  $.ajax({url: apiURL(':committees', {id: member.id}), dataType: 'json'})
   .error(function(data){ console.error('ERROR in getCommittees'); })
   .success(function (data) {
      var coms = $.map(data.results, function(e, i){ return e.name; });
      member.setCommittees(coms);
      member.placeOnPage();
  });
}

$(document).ready(function() {
  toggleGetFactsButton();
  getMembers('house', 'OR');
});
