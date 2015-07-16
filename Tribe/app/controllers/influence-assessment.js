'use strict';

/**
 * @ngdoc function
 * @name tribeApp.controller:InfluenceAssessmentCtrl
 * @description
 * # InfluenceAssessmentCtrl
 * Controller of the tribeApp
 */
(function(angular) {
	
	function InfluenceAssessmentCtrl($window, $location) { 
		$window.ga('send', 'pageview', { page: $location.url() });
	}
	
	tribeApp.controller('InfluenceAssessmentCtrl', ['$window', '$location', InfluenceAssessmentCtrl]);

})(angular);