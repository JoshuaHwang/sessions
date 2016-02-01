
app.service('multipartForm', ['$http', function($http) {
  vm = this;

  vm.post = function(uploadUrl, data) {
    var fd = new FormData();
    for(var key in data)
      fd.append(key, data[key]);

    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    })
  }
}]);