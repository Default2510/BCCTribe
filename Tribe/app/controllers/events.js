'use strict';

/**
 * @ngdoc function
 * @name tribeApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the tribeApp
 */
(function(angular) {
	
	function EventsCtrl($rootScope, $scope, $http, $window, $location) { 
		$rootScope.$broadcast("refreshHeader", {});
		$window.ga('send', 'pageview', { page: $location.url() });
		$scope.events = [];
		$scope.recurringEvents = [];
		$scope.eventToday = false;
		$scope.today = new Date();
		
		// $scope.today.setHours(0,0,0,0);
		
		// Load data in from Google Calendar in json format
		var myKey = 'AIzaSyCR0TCWzOYEldfv3W_4cUvlyOjtXiNr6m0';
		var calendarId = 'bcctribe@gmail.com';
		var timeMin = $scope.today.toISOString();
		var singleEvents = true;
		var orderBy = "startTime";
		var maxResults = 20;
		var calendarBaseURL = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId+ '/events?key=' + myKey + '&timeMin=' + timeMin + '&singleEvents=' + singleEvents + '&orderBy=' + orderBy + '&maxResults=' + maxResults;
		$http.get(calendarBaseURL).
		success(function(data, status, headers, config) {
			var events = data.items;
			for (var i = 0; i < events.length; ++i) {
				var event = events[i];
				// If the event's summary contains "Tribe Gathering" add the service flag
				if (event.summary.indexOf("Tribe Gathering") > -1) {
					event.service = true;
				}
				// If the event is today add the today flags
				if ($scope.isToday(event.start.dateTime)) {
					event.today = true;
					$scope.eventToday = true;
				}
				// Only add events that do NOT have "Weekly" in the description field
				if (event.description != "Weekly") {
					$scope.events.push(event);
				}
			}
		}).
		error(function(data, status, headers, config) {
			alert("Help! Error loading events data from Google API");
			// called asynchronously if an error occurs or server returns response with an error status.
		});
		
		// Load data in from Google Calendar in json format for recurring events (Have "Weekly" in the event description)
		var q = "Weekly";
		$http.get(calendarBaseURL + '&q=' + q).
		success(function(data, status, headers, config) {
			var summarylist = [];
			var events = data.items;
			for (var i = 0; i < events.length; ++i) {
				var event = events[i];
				// If the event is today add the today flags
				if ($scope.isToday(event.start.dateTime)) {
					event.today = true;
					$scope.eventToday = true;
				}
				// Only add events that are NOT already on the summary list
				if (summarylist.indexOf(event.summary) < 0) {
					$scope.recurringEvents.push(event);
					summarylist.push(event.summary);
				}
			}
		}).
		error(function(data, status, headers, config) {
			alert("Help! Error loading recurring events data from Google API");
			// called asynchronously if an error occurs or server returns response with an error status.
		});
			
		// function to determine if a given date is today
		$scope.isToday = function(event) {
			var todayDate = new Date($scope.today).setHours(0, 0, 0, 0);
			var eventDate = new Date(event).setHours(0, 0, 0, 0);
			
			if (todayDate == eventDate) {
				return true;
			} else {
				return false;
			}
		};
	}
	
	tribeApp.controller('EventsCtrl', ['$rootScope', '$scope', '$http', '$window', '$location', EventsCtrl]);

})(angular);