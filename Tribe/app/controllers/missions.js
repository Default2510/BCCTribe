'use strict';

/**
 * @ngdoc function
 * @name tribeApp.controller:MissionsCtrl
 * @description
 * # MissionsCtrl
 * Controller of the tribeApp
 */
(function(angular) {
	
	function MissionsCtrl($rootScope, $window, $location) { 
		$rootScope.$broadcast("refreshHeader", {});
		$window.ga('send', 'pageview', { page: $location.url() });
	}
	
	tribeApp.controller('MissionsCtrl', ['$rootScope', '$window', '$location', MissionsCtrl]);

})(angular);