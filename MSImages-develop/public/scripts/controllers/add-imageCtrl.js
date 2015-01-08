app.controller('add-imageCtrl',['$scope','$location','imageService','fileReader',
    function ($scope, $location, imageService, fileReader) {

        $scope.save = function () {
            var tags;
            $scope.submitted = true;
            if($scope.name && $scope.file && $scope.tags) {
               imageService.create($scope.name, $scope.description, $scope.defaultContributorSelected, $scope.tags, $scope.file, $scope.defaultAlbumSelected)
                   .success(function (data, status, headers, config) {
                          $location.path('/images');
                    })
                    .error(function (current, status, headers, config) {
                        console.log(current.err);
                    });
            }
        };


        $scope.cancel = function () {
            $location.path("/images");
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

        $scope.init = function () {
            $scope.titleView = "Upload new image";
            $scope.addContrib = false;
            $scope.addAlbum = false;
            $scope.size = false;
            $scope.submitted = false;
            $scope.showimageSrc = true;
            $scope.defaultContributorSelected = undefined;
            $scope.defaultAlbumSelected = undefined;
            imageService.getContributors()
                .success(function(data){  $scope.contributors = data } );
            imageService.getAlbums()
            .success(function(data){  $scope.albums = data } );

        };

        //Initialization
        $scope.init();
    }]);