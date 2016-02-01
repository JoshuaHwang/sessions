
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