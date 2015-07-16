'use strict';

/**
 * @ngdoc function
 * @name tribeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tribeApp
 */
(function(angular) {
	
	function MainCtrl($rootScope, $scope, $http, $window, $location) { 
		$rootScope.$broadcast("refreshHeader", {});
		$window.ga('send', 'pageview', { page: $location.url() });
		$scope.version = {};

		// load data in from json files using services
		$http.get('app/data/version.json').
	  	success(function(data, status, headers, config) {
	  		// this callback will be called asynchronously when the response is available
	  		$scope.version = data.version;
	 	  	console.log(appId+" version is: "+$scope.version.number+" dated: "+$scope.version.date);
	  	}).
	  	error(function(data, status, headers, config) {
	  		alert("Help! Error loading version data");
	  		// called asynchronously if an error occurs or server returns response with an error status.
	  	});
	}
	
	tribeApp.controller('MainCtrl', ['$rootScope', '$scope', '$http', '$window', '$location', MainCtrl]);

})(angular);