angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

  // --------------------- Pie Chart Configuration -----------------------------
  $scope.pieLabels = ["FB", "Twitter", "Instagram"];
  $scope.pieData = [300, 500, 100];

  // --------------------- Line Chart Configuration ----------------------------
  $scope.lineSeries = ['Active', 'Inactive'];
  $scope.lineLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  $scope.lineData = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  // --------------------- animation for green color .badge-notification icon---
  anime({
    targets: ['.badge-notify'],
    scale: [1.2, 1],
    delay: 1800,
    duration: 2000,
  });

  // --------------------- animation for blue  color .badge --------------------
  anime({
    targets: ['.badge'],
    rotate: {
      value: 720,
      delay: 300,
      duration: 1500,
      easing: 'easeInOutQuad'
    },
    direction: 'normal'
  });

})

.controller('LoginController', function($scope, $rootScope, $http, $state, accountService) {
  $scope.user = {username: '', password: ''};
    $scope.messageRes = "";

    $scope.login = function () {
        accountService.authenticateAccount($scope.user).then(function (response) {
            if (response.data.status) {
                console.log('login successful');
                $scope.failedLogin = false;
                $rootScope.account = response.data.account;
                $rootScope.authentication = true;
                // Authentication.setLoginCredentials($scope.user);
                // Authentication.setCredentials(response.data.account);
                // socketService.emit('LoginUser', $rootScope.account);
                // $rootScope.$emit('CheckSuggestion', {});
                $state.go('tab.dash');
            }
            else {
                $scope.failedLogin = true;
                $scope.messageRes = response.data.message;
            }
        }, function (err) {
            //$scope.failedLogin = true;
            //$scope.messageRes = err.data.message;
        });
    }
})

.controller('ProjectFrequency', function($scope, $rootScope, accountService, projectService) {
  $scope.labels = [];
    $scope.data = [];

    $scope.year = 2017;
    $scope.sectors = [];
    $scope.reqSector = [];
    $scope.chosenSector = "";

    $scope.getSectorByYear = function(){
        projectService.getSectorByYear($scope.year, $rootScope.account._id).then(function(response){
            if(response.data.status){

                console.log(JSON.stringify(response.data.sectors));

                $scope.reqSector = response.data.sectors;

                for(i = 0; i < $scope.reqSector.length; i++){
                    var sectors = $scope.reqSector[i].sector;
                    for(j = 0; j < sectors.length; j++){
                        var sector = sectors[j];
                        if($scope.sectors.indexOf(sector.type) < 0){
                            $scope.sectors.push(sector.type);
                        }
                    }
                }
            }
            else{
                $scope.reqSector = [];
                $scope.sectors = [];
                $scope.computeSubSecFrequency();
            }
        })
    };

    $scope.computeSubSecFrequency = function(chosenSec){
        $scope.labels = [];
        $scope.data = [];

        console.log('compute freq executed');

        var chosenSector = chosenSec;
        var SubSecFrequency = {};
        for(i = 0; i < $scope.reqSector.length; i++){
            var sectors = $scope.reqSector[i].sector;
            for(j = 0; j < sectors.length; j++) {
                var sector = sectors[j];
                if (sector.type == chosenSector) {
                    if (SubSecFrequency.hasOwnProperty(sector.subsector)) {
                        SubSecFrequency[sector.subsector].count += 1;
                    }
                    else {
                        SubSecFrequency[sector.subsector] = {};
                        SubSecFrequency[sector.subsector].count = 1;
                    }
                }
            }

        console.log('compute freq executed');    
        }

        for(var i in SubSecFrequency){
            $scope.labels.push(i);
            $scope.data.push(SubSecFrequency[i].count);

            console.log('compute subsec freq executed');   
        }

        console.log($scope.labels);
        console.log($scope.data);
    }
})

.controller('ProjectStatus', function($scope, $rootScope, accountService, projectService) {
  $scope.choice = "";
    $scope.year = 2017;

    $scope.labels = ['Cancelled', 'Completed', 'Ongoing', 'On-hold'];
    /*series: ['Series A', 'Series B'],*/
    $scope.colours = ["#d9534f", "#5bc0de", "#5cb85c", "#f0ad4e"];

    $scope.getStatOfProject = function(choice){
        console.log('get stat executed');
        projectService.getStatOfProject($rootScope.account._id, $scope.year, choice).then(function(response){
            if(response.data.status){
                var projectCount = response.data.projectCount;
                $scope.data = [projectCount.cancelled, projectCount.completed, projectCount.ongoing, projectCount.onhold];
            }
            else{
                $scope.data = [];
            }
        });
    }
})

.controller('ResourceStatistics', function($scope, $rootScope, accountService, projectService) {
  $scope.year = 2017;
    $scope.projects = [];
    $scope.selectedProject = {};

    $scope.projectReport = {};
    $scope.projectBarChartData = {};

    $scope.chartSeries = ["Actual", "Expected"];
    $scope.chartLabel = [];

    $scope.data = [];

    $scope.getResourceStat = function(){
        console.log('project: '+$scope.selectedProject);
        projectService.getResourceStatistics($scope.selectedProject.project._id).then(function(response){
            if(response.data.status){
                $scope.projectReport = response.data.project;
                $scope.projectBarChartData = {};
                $scope.chartLabel = [];
                $scope.data = [];

                for(i = 0; i < $scope.projectReport.resources.length; i++){
                    var resource = $scope.projectReport.resources[i];
                    //$scope.projectBarChartData[resource.type] = {};
                    if(resource.description){
                        $scope.projectBarChartData[resource.description] = {};
                        //$scope.projectBarChartData[resource.type][resource.description] = {};
                        $scope.projectBarChartData[resource.description].expected = resource.qty;
                        $scope.projectBarChartData[resource.description].actual = resource.inhand;
                    }
                    else{
                        $scope.projectBarChartData[resource.type] = {};
                        $scope.projectBarChartData[resource.type].expected = resource.qty;
                        $scope.projectBarChartData[resource.type].actual = resource.inhand;
                    }


                    //var currentActual = $scope.projectBarChartData[resource.type].overAllActual ? $scope.projectBarChartData[resource.type].overAllActual : 0;
                    //var currentExpected = $scope.projectBarChartData[resource.type].overAllExpected ? $scope.projectBarChartData[resource.type].overAllExpected : 0;
                    //$scope.projectBarChartData[resource.type].overAllActual = currentActual + resource.inhand;
                    //$scope.projectBarChartData[resource.type].overAllExpected = currentActual + resource.qty;
                }

                var actualResources = [];
                var expectedResources = [];

                for(var i in $scope.projectBarChartData){
                    $scope.chartLabel.push(i);
                    //actualResources.push($scope.projectBarChartData[i].overAllActual);
                    //expectedResources.push($scope.projectBarChartData[i].overAllExpected);
                    actualResources.push($scope.projectBarChartData[i].actual);
                    expectedResources.push($scope.projectBarChartData[i].expected);
                }

                $scope.data.push(actualResources);
                $scope.data.push(expectedResources);
            }
            else{
                $scope.chartLabel = [];
                $scope.data = [];
            }
        });
    }

    $scope.filterProjects = function(){
        projectService.getProjectByYear($rootScope.account._id, $scope.year).then(function(response){
            if(response.data.status){
                $scope.projects = response.data.projects;
            }
            else{
                $scope.projects = [];
                $scope.chartLabel = [];
                $scope.data = [];
            }
        });
    }
});
