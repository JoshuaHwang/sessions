
app.controller('SeshController', ['$http', function($http) {
  var vm = this;  

  $http({
    method: 'GET',
    url: '/users'
  })
  .success(function(data) {
    vm.submissions = data;
    console.log(data);
  })
  .error(function(data) {
    console.log('error');
  });

}]);
