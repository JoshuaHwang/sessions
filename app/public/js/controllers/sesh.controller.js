
app.controller('SeshController', ['subs', function(subs) {
  var vm = this;  

  subs.getSubmissions().then(function(submissions) {
    vm.submissions = submissions;
  });
}]);
