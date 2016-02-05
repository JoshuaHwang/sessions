
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

  vm.likeClick = function(id) {
   $http({
      method: 'GET',
      url:    '/users/submissions/' + id + '/likes'
    })
  }
}]);