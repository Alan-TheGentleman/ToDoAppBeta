app.controller('contributorCtrl',['$scope',
function($scope){
    $scope.titleView = "List of Contributors";
    $scope.sidebar = false;
    $scope.contributors = [
        {name : 'Rosario mensi',  description:'Description of image 3'},
        {name : 'Celeste Senoseain',  description:'Description '},
        {name : 'Juan Diego Raimondi',   description:'Description '}
    ]
}])
