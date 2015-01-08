app.controller('detailed-imageCtrl', ['$scope','$location','$routeParams','imageService','fileReader',
        function ($scope, $location, $routeParams, imageService, fileReader) {


            $scope.getFile = function () {
                $scope.progress = 0;
                fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
            };

            $scope.cancel = function () {
                $location.path("/");
            };

            $scope.init = function () {
                $scope.titleView = "Detail View";
                $scope.size = 'true';
                imageService.getByImageId($routeParams.imageId)
                    .success(function(data){
                        $scope.current = data;
                        $scope.name = $scope.current.name;
                        $scope.description = $scope.current.description;
                        $scope.size = $scope.current.size;
                        $scope.defaultContributorSelected = $scope.current.contributor;
                        $scope.defaultAlbumSelected = $scope.current.album;
                        imageService.getContributors()
                            .success(function(data){  $scope.contributors = data } );
                        $scope.tags = $scope.current.tags;
                        $scope.imageSrc = $scope.current.path;
                        $scope.id = $routeParams.imageId;

                        } );
                imageService.getImages()
                .success(function(data){
                    $scope.images = data;
                }
                )

             };

            //Initialization
            $scope.init();
        }
]);
