
app.controller('SeshController', ['$http', function($http) {
  var vm = this;  

  $http({
    method: 'GET',
    url: '/users/submissions'
  })
  .success(function(data) {
    vm.submissions = data;
  })
  .error(function(data) {
    console.log('Error ' + data);
  });

  vm.deleteSesh = function() {
    $http({
      method: 'DELETE', 
      url: '/users/submissions',
    })
    .success(function(data) {
      vm.submissions = data;
      vm.submissions.splice(data, 1);
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  }
}]);