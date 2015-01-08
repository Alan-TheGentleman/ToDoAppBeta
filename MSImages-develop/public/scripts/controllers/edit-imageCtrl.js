app.controller('edit-imageCtrl', ['$scope','$location','$routeParams','imageService','fileReader',
        function ($scope, $location, $routeParams, imageService, fileReader) {

            $scope.save = function () {
                $scope.submitted = true;
                if($scope.name) {
                    imageService.updateImage($scope.id, $scope.name, $scope.description, $scope.defaultContributorSelected,$scope.tags, $scope.defaultAlbumSelected)
                        .success(function (data, status, headers, config) {
                           // $scope.submitted = false;
                            $location.path('/images');
                        })
                        .error(function (current, status, headers, config) {
                            console.log(current.err); // TODO: Display error on view.
                        });
                }
            };
            $scope.saveAlbum = function () {
                var album = [];
                $scope.submitted = true;
                if($scope.album) {
                    $scope.defaultAlbumSelected = $scope.album;
                    imageService.getAlbums()
                    .success(function(data){
                        data.push($scope.album);
                        $scope.albums = data;
                    });
                    $scope.addAlbum = false;
                }
            };
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

            $scope.addContributor = function(){
                $scope.addContrib = true;
            };
            $scope.cancelContributor = function(){
                $scope.addContrib = false;
            };
            $scope.addAlbumButton = function(){
                $scope.addAlbum = true;
            };
            $scope.cancelAlbum = function(){
                $scope.addAlbum = false;
            };

            // Save new contributor
            $scope.saveContributor = function () {
                var contributors = [];
                $scope.submitted = true;
                if($scope.nameContributor) {
                    $scope.defaultContributorSelected = $scope.nameContributor;
                    imageService.getContributors()
                    .success(function(data){
                        data.push($scope.nameContributor);
                        $scope.contributors = data;
                    });
                    $scope.addContrib = false;
                }
            };
            $scope.init = function () {
                $scope.titleView = "EDIT Image";
                $scope.sidebar = 'false';
                $scope.size = 'true';
                $scope.addAlbum = false;
                imageService.getByImageId($routeParams.imageId)
                    .success(function(data){  $scope.current = data;
                        $scope.name = $scope.current.name;
                        $scope.description = $scope.current.description;
                        $scope.size = $scope.current.size;
                        $scope.defaultContributorSelected = $scope.current.contributor;
                        imageService.getContributors()
                            .success(function(data){  $scope.contributors = data } );
                        $scope.tags = $scope.current.tags;
                        $scope.defaultAlbumSelected = $scope.current.album;
                        imageService.getAlbums()
                        .success(function(data){  $scope.albums = data;} );
                        $scope.showimageSrc = false;
                        $scope.id = $routeParams.imageId;} );

             };

            //Initialization
            $scope.init();
        }
]);
