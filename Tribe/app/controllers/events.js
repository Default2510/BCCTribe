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
		$scope.maxEvents = 6;
		$scope.seekFirstEvents = [];
		$scope.eventToday = false;
		
		// Load data in from json files using services
		$http.get("app/data/events.json").
		success(function(data, status, headers, config) {
			// This callback will be called asynchronously when the response is available
			$scope.today = new Date();
			$scope.today.setHours(0,0,0,0);	// Need to set hours to 00:00:00:00 for comparison of dates
			// Add the events
			var events = data.events;
			for (var i = 0; i < events.length; ++i) {
				// Add events that are equal to or greater than today and not further out than 30 days
				var event = events[i];
				var eventDate = new Date(event.date + "T00:00:00");
				event.today = false;
				if (eventDate >= $scope.today) {
					// Add notification to event if the event is today
					if (+eventDate == +$scope.today) {
						event.today = true;
						$scope.eventToday = true;
					}
					// Add notification to event if it is a Corporate gathering/service (Note: getDay() == 3 is Wednesday)
					if (eventDate.getDay() == 3 && event.time == "7pm" && event.place == "Bellevue Christian Center") {
						event.service = true;
					}
					$scope.events.push(event);
					if ($scope.events.length >= $scope.maxEvents) {
						break;
					}
				}
			}
			// Add the Seek First events (For days of the week Sunday: 0, Monday: 1, etc.)
			var seekFirstEvents = data.seekFirst;
			for (var i = 0; i < seekFirstEvents.length; ++i) {
				var event = seekFirstEvents[i];
				// Only show 1 weeks worth at a time
				for (var j = 0; j < 7; ++j) {
					var date = new Date($scope.today);
					date.setDate($scope.today.getDate()+j);
					// If the day of the week matches the event's day of the week add the event to the array
					if (date.getDay() == event.day) {
						event = $scope.findNextAvailableSeekFirst(event, date);
						$scope.seekFirstEvents.push(event);
						break;
					} else {
						continue;
					}
				}
			}
		}).
		error(function(data, status, headers, config) {
			alert("Help! Error loading events data");
			// called asynchronously if an error occurs or server returns response with an error status.
		});
		
		// function to get the next Available Seek First Date for the given day of the week
		$scope.findNextAvailableSeekFirst = function(event, date) {
			var dateString = date.toISOString().slice(0, 10);
			if (event.exclude.indexOf(dateString) < 0) {
				event.date = date;
				
				// Add notification to event if the event is today
				if (+date == +$scope.today) {
					event.today = true;
					$scope.eventToday = true;
				}
			} else {
				date.setDate(date.getDate()+7);
				$scope.findNextAvailableSeekFirst(event, date);
			}
			return event;
		};
	}
	
	tribeApp.controller('EventsCtrl', ['$rootScope', '$scope', '$http', '$window', '$location', EventsCtrl]);

})(angular);