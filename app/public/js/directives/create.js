
app.directive('file-model', [$parse, function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.file-model);
      var modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0])
        })
      })
    }
  }
}]);

// using the parse service to look at our attributes specifically our file model
// value of it is myFile
// directive is watching that element for any kind of changes
// will find that attr in the context
