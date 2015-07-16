'use strict';

/**
 * @ngdoc overview
 * @name tribeApp
 * @description
 * # tribeApp
 *
 * Main module of the application.
 */
var appId = 'tribeApp';
var tribeApp = angular
	.module('tribeApp', [
		'ngAnimate',
		'ngAria',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ui.bootstrap'
	])
	
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl:	'app/views/main.html',
				controller:	 'MainCtrl'
			})
			.when('/our-mission/:type', {
				templateUrl:	'app/views/our-mission.html',
				controller:	 'OurMissionCtrl'
			})
			.when('/devotions', {
				templateUrl:	'app/views/devotions.html',
				controller:	 'DevotionsCtrl'
			})
			.when('/devotions/:feeling', {
				templateUrl:	'app/views/devotions.html',
				controller:	 'DevotionsCtrl'
			})
			.when('/small-groups', {
				templateUrl:	'app/views/small-groups.html',
				controller:	 'SmallGroupsCtrl'
			})
			.when('/our-leaders', {
				templateUrl:	'app/views/our-leaders.html',
				controller:	 'DevotionsCtrl'
			})
			.when('/events', {
				templateUrl:	'app/views/events.html',
				controller:	 'EventsCtrl'
			})
			.when('/influence-assessment', {
				templateUrl:	'app/views/influence-assessment.html',
				controller:	 'InfluenceAssessmentCtrl'
			})
			.when('/missions', {
				templateUrl:	'app/views/missions.html',
				controller:	 'MissionsCtrl'
			})
			.when('/first-fruits/', { 
				templateUrl:	'app/views/first-fruits.html',
				controller:	 'FirstFruitsCtrl'
			})
			.when('/first-fruits/:date', { 
				templateUrl:	'app/views/first-fruits.html',
				controller:	 'FirstFruitsCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});