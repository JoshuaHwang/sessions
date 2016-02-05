var app = angular.module('sessionApp', []);

app.controller('SeshController', ['$http', '$window', function($http, $window) {
  var vm = this;  

  $http({
    method: 'GET',
    url:    '/users/submissions'
  })
  .success(function(data) {
    vm.submissions = data;
  })
  .error(function(data) {
    console.log('Error ' + data);
  });

  vm.deleteSesh = function(id) {
    $http({
      method: 'DELETE',
      url:    '/users/submissions/' + id
    })
    .success(function() {
      $window.location.reload();
    })
    .error(function(data) {
      console.log('Error ' + data);
    })
  }
}]);

app.factory('SubmissionsService', function($resource) {
  return $resource('/users/submissions/');
});

app.factory('subs', ['$q', '$http', function($q, $http) {
  var submissions = [];
  var service     = {};

  service.getSubmissions = function() {
    var defer = $q.defer();
    if(submissions.length > 0) {
      defer.resolve(data);
    } else {
        $http.get('./public/submissions.json').success(function(data) {
          submissions = data;
          defer.resolve(data);
        });
      }
      return defer.promise;
    }
  return service;
}]);