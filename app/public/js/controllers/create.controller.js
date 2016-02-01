
app.controller('createController', ['$scope', 'multipartForm', function($scope, multipartForm) {
  $scope.session =
  $scope.Submit = function() {
    var uploadUrl = '/create';
    multipartForm.post(uploadUrl, $scope.theSessions);
  }
}]);