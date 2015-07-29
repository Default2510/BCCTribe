'use strict';

/**
 * @ngdoc function
 * @name tribeApp.controller:DevotionsCtrl
 * @description
 * # DevotionsCtrl
 * Controller of the tribeApp
 */
(function(angular) {
	
	function DevotionsCtrl($rootScope, $scope, $window, $location, $routeParams) { 
		$rootScope.$broadcast("refreshHeader", {});
		$window.ga('send', 'pageview', { page: $location.url() });
		
		$scope.values = ['ashamed','everyday-worship','fear','needing-rest','promising-perspective','uncertain-day','victorious'];
		
		$scope.feeling = $routeParams.feeling;
		$scope.audio = {};
		
		if ($scope.feeling && $scope.values.indexOf($scope.feeling) >= 0) {
			$scope.audio.path = "./app/assets/audio/devo-" + $scope.feeling + ".mp3";
		}
	}
	
	tribeApp.controller('DevotionsCtrl', ['$rootScope', '$scope', '$window', '$location', '$routeParams', DevotionsCtrl]);

})(angular);