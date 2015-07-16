'use strict';

/**
 * @ngdoc function
 * @name tribeApp.controller:SmallGroupsCtrl
 * @description
 * # SmallGroupsCtrl
 * Controller of the tribeApp
 */
(function(angular) {
	
	function SmallGroupsCtrl($rootScope, $window, $location) { 
		$rootScope.$broadcast("refreshHeader", {});
		$window.ga('send', 'pageview', { page: $location.url() });
	}
	
	tribeApp.controller('SmallGroupsCtrl', ['$rootScope', '$window', '$location', SmallGroupsCtrl]);

})(angular);