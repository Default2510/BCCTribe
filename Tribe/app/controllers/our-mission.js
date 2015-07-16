'use strict';

/**
 * @ngdoc function
 * @name tribeApp.controller:OurMissionCtrl
 * @description
 * # OurMissionCtrl
 * Controller of the tribeApp
 */
(function(angular) {
	
	function OurMissionCtrl($rootScope, $scope, $window, $location, $routeParams) { 
		$rootScope.$broadcast("refreshHeader", {});
		$window.ga('send', 'pageview', { page: $location.url() });
		$scope.type = $routeParams.type;
	}
	
	tribeApp.controller('OurMissionCtrl', ['$rootScope', '$scope', '$window', '$location', '$routeParams', OurMissionCtrl]);

})(angular);