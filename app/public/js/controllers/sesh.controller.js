
app.controller('SeshController', ['$http', function($http) {
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
    .success(function(data) {
      vm.submissions = data;
      vm.submissions.delete(id);
    })
    .error(function(data) {
      console.log('Error ' + data);
    });
  };


  // vm.deleteSesh = function(id) {
  //   $http.delete('/users/submissions/' + id)
  //     .success(function(data) {
  //       vm.submissions = data;
  //       vm.submissions.splice(id, 1);
  //     })
  //     .error(function(data) {
  //       console.log('Error: ' + data);
  //     })
  // }
}]);