app.controller('imageCtrl', ['$scope', '$location','$routeParams','imageService', '$window',
    function($scope, $location, $routeParams,imageService, $window) {

        $scope.init = function () {
            $scope.titleView = "Recently Uploaded Images";
            imageService.getImages()
                .success(function(data){
                  $scope.images = data;
                 }
            )
            $scope.sidebar = true;
            imageService.getTags()
            .success(function(data){  $scope.tags = data } );
            imageService.getContributors()
            .success(function(data){  $scope.contributors = data } );
            imageService.getShapes()
                .success(function(data){  $scope.shapes = data.shape } );
            $scope.id = $routeParams.imageId;
            $scope.defaultAlbumSelected = $scope.album;
        };

        $scope.getFormattedTags = function(tags) {
                var list = [];
                angular.forEach(tags, function(item){
                    list.push(item.text);
                });
               return list.toString();
            };
        $scope.delete = function(id) {

            var confirmMessage = "Are you sure do you want to delete the image?";
            if ($window.confirm(confirmMessage))
                 imageService.deleteImage(id)
                     .success(function (){
                       $location.path('/images');
                    })
                     .error(function(){
                    $scope.errorMessage("Error");
                 });
                };

        $scope.download = function(id) {
          imageService.downloadImage(id)
              .success(function(data, status, headers, config) {
                      var element = angular.element('<a/>');
                      element.attr({
                          href: 'data:attachment/png;charset=utf-8,' + encodeURI(data)


                      })[0].click();
                  }).
                      error(function(data, status, headers, config) {
                      });

        };

        //Init data
        $scope.init();
    }
]);
