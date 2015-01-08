app.controller('edit-contributorCtrl',['$scope','$location','$routeParams','imageService',
    function($scope, $location,$routeParams,imageService){

        $scope.titleView = "Edit Contributor";
        $scope.current = imageService.getContributorById($routeParams.imageId);
        $scope.name = 'Celeste';//$scope.current.name;
        $scope.description = 'Descripcion'; $scope.current.description;

        $scope.save = function () {
            $scope.submitted = true;
            if($scope.name && $scope.description) {
                imageService.addContributor($scope.name, $scope.description);
                $location.path('/contributor-list');
//                    .success(function (data, status, headers, config) {
//                        $scope.submitted = false;
//                        $location.path('/contributor-list');
//                    })
//                    .error(function (current, status, headers, config) {
//                        console.log("Message error "+current.err); // TODO: Display error on view.
//                    });
            }
        };

        $scope.cancel = function () {
            $location.path("/");
        };


    }
])

