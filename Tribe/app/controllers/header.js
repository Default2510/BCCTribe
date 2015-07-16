'use strict';

/**
 * @ngdoc function
 * @name svcMacApp.controller:Header
 * @description
 * # Header
 * Controller of the svcMacApp
 */
(function(angular) {
	
	function HeaderCtrl($scope, $location) {
		$scope.collapseMobileNav = true;
		
		$scope.resetCollapseMobileNav = function() {
			$scope.collapseMobileNav = true;
		};
		
		$scope.$on("refreshHeader", function (event, args) {
			$scope.resetCollapseMobileNav();
		});
	};
	
	tribeApp.controller('HeaderCtrl', ['$scope', '$location', HeaderCtrl]);

})(angular);