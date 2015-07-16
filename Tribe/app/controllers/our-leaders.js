'use strict';

/**
 * @ngdoc function
 * @name tribeApp.controller:OurLeadersCtrl
 * @description
 * # OurLeadersCtrl
 * Controller of the tribeApp
 */
(function(angular) {
	
	function OurLeadersCtrl($rootScope, $window, $location) { 
		$rootScope.$broadcast("refreshHeader", {});
		$window.ga('send', 'pageview', { page: $location.url() });
	}
	
	tribeApp.controller('OurLeadersCtrl', ['$rootScope', '$window', '$location', OurLeadersCtrl]);

})(angular);