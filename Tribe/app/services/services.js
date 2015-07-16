'use strict';
tribeApp.service('VersionDataService', function($http) { 
    var versionData = null;
    var promise = $http.get('data/version.json').success(function (data) {
      versionData = data;
    });
    return {
      promise:  promise,
      loadData: function () { 
        return versionData;
      }
    };
});

