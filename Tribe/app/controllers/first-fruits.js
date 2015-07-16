'use strict';

/**
 * @ngdoc function
 * @name tribeApp.controller:FirstFruitsCtrl
 * @description
 * # FirstFruitsCtrl
 * Controller of the tribeApp
 */
(function(angular) {
	
	function FirstFruitsCtrl($scope, $http, $window, $location, $routeParams) {
		$window.ga('send', 'pageview', { page: $location.url() });
		// model for policy data
		$scope.date = new Date($routeParams.date);
		$scope.bibleGatewayURL = "https://www.biblegateway.com/passage/";
		$scope.dailyDevotion = {};
		
		var earliestDate = new Date("2015/04/01");	// No first fruits available prior to this date
		if (!isDateValid($scope.date) || $scope.date < earliestDate) {
			$scope.date = new Date();	// set date to today
		}
		
		// Load data in from json files using services
		$http.get(firstFruitsPath($scope.date)).
		success(function(data, status, headers, config) {
			// This callback will be called asynchronously when the response is available
			var devotions = data.devotions;
			for (var i = 0; i < devotions.length; ++i) {
				// Set the daily devotion to the one that matches closest to (but before) the date
				var devotionDate = new Date(devotions[i].date);
				var requestedDate = $scope.date;
				var today = new Date();
				// Do not allow them to see future devotions
				if (requestedDate > today) {
					requestedDate = today;
				}
				if (devotionDate <= requestedDate) {
					// Stop parsing the .json file and set the dailyDevotion to the current devotion
					console.log("Set dailyDevotion to " + $scope.date);
					$scope.dailyDevotion = devotions[i];
					break;
				}
			}
			// Setup passages to empty array
			$scope.dailyDevotion.passages = [];
			
			// Load the verse of the day from Bible.org
			var bibleURL = 'https://labs.bible.org/api/?passage=' + $scope.dailyDevotion.passageLookup + '&formatting=full&type=json&callback=JSON_CALLBACK';
			console.log("Lookup Bible verse on Bible.org: " + bibleURL);
			$http.jsonp(bibleURL).
			success(function(data, status, headers, config, myFunction) {
				// this callback will be called asynchronously when the response is available
				for (var i = 0; i < data.length; ++i) {
					// Insert superscript verse number
					var index = data[i].text.search('<p class="bodytext">');
					if (index >= 0) {
						var beforeTag = data[i].text.substring(0, index);
						var tag = data[i].text.substr(index, 20);
						var afterTag = data[i].text.substr(index+20);
						data[i].text = beforeTag + tag + "<sup>" + data[i].verse + "</sup>" + afterTag;
					} else {
						data[i].text = "<sup>" + data[i].verse + "</sup>" + data[i].text;
					}
					
					// Merge verses into one passage if they are adjacent
					if (i > 0 && (data[i].bookname == data[i-1].bookname) && (data[i].chapter == data[i-1].chapter) && ((data[i].verse-1) == data[i-1].verse)) {
						// Update the reference value
						var length = $scope.dailyDevotion.passages.length;
						var index = $scope.dailyDevotion.passages[length-1].reference.lastIndexOf("-");
						if (index > 0) {
							var newReference = $scope.dailyDevotion.passages[length-1].reference.substr(0,index+1) + data[i].verse;
							$scope.dailyDevotion.passages[length-1].reference = newReference;
						} else {
							$scope.dailyDevotion.passages[length-1].reference += "-" + data[i].verse;
						}
						$scope.dailyDevotion.passages[length-1].text += " " + data[i].text;
					} else {
						$scope.dailyDevotion.passages.push({
							"reference": data[i].bookname + " " + data[i].chapter + ":" + data[i].verse,
							"text": data[i].text
						});
					}
				}
				console.log("Bible.org data: " + data);
			}).
			error(function(data, status, headers, config) {
				alert("Help! Error loading Bible.org data");
				// called asynchronously if an error occurs or server returns response with an error status.
			});
		}).
		error(function(data, status, headers, config) {
			alert("Help! Error loading first fruits data");
			// called asynchronously if an error occurs or server returns response with an error status.
		});
	}
	
	tribeApp.controller('FirstFruitsCtrl', ['$scope', '$http', '$window', '$location', '$routeParams', FirstFruitsCtrl]);

})(angular);