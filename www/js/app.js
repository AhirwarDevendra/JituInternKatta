// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('internkatta', ['ionic','ngRoute'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('').previousTitleText(false);//.text('').icon('ion-arrow-left-c');
  $stateProvider
  
     .state('login', {
                url: '/login/:eventId',
                templateUrl: "templates/login.html",
                controller:"loginController"
     })
    .state('home',{
      url:'/home',
      templateUrl:'templates/home.html',
      controller:"HomeController"
    })
    .state('find',{
      url:'/find',
      templateUrl:'templates/find.html',
      controller:'findController'
    })    
    .state('internshiplist',{
      url:'/internshiplist',
      templateUrl:'templates/internshiplist.html',
      controller:'listController'
    })
    .state('findinternship',{
      url:'/findinternship/:InternshipID',
      templateUrl:'templates/findinternship.html',
      controller:'view'
    })
   $urlRouterProvider.otherwise("/login/135");

})


.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
  $scope.exitapp = function () {  
    //document.addEventListener("backbutton",onBackKeyDown,false);
    //function onBackKeyDown(){
      //alert('fsd');
      //ionic.Platform.exitApp();
        navigator.notification.confirm(
          'Exit Internkatta ?'
        , function(button) {
              if (button == 2) {
                  navigator.app.exitApp();
              } 
          }
        , 'Exit'
        , 'No,Yes'
        );  
      //}
  };
})

.controller('HomeController', function($scope,$ionicPlatform, $ionicSideMenuDelegate) {
  //alert('hi');loginController
  $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="home"){
      navigator.app.exitApp();
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);
})

.controller('loginController', function($scope,$state, $ionicSideMenuDelegate) {
  //alert('hi');
    setTimeout(function () {    
      $state.go('home');// = '#home'; 
    },3800); // 3.8 seconds  
})

.controller('findController', function($scope,$http, $timeout,$state, $ionicModal,$ionicPopover, $ionicSideMenuDelegate) {
  $scope.onPop = function($event) {
    $scope.popover.show($event);
  };
      $http.get("jsondata/city.json")
      .success(function (response) 
      {
       $scope.city = response;
      });  
      $http.get("jsondata/functionalarea.json")
      .success(function (response) 
      {
       $scope.functionalarea = response;
      });  
      $http.get("jsondata/category.json")
      .success(function (response) 
      {
       $scope.category = response;
      });  

      $scope.frm = {};

      $scope.findInternss = function($param){
        var optionsCSV = '';
        $scope.category.forEach(function(option) {

          if (option.value) {

            // If this is not the first item
            if (optionsCSV) {
              optionsCSV += ','
            }
            optionsCSV += option.Category_Name;
          }

        })
        // Save the csv to your db (replace alert with your code)
        alert($param.CityName+' '+$param.FunctionalArea+' '+optionsCSV);
        $state.go('internshiplist');
            /*var request = $http({
                method: "post",
                url: "php/findIntern.php",
                data: {
                    CityName: $param.CityName,
                    FunctionalArea: $param.FunctionalArea,
                    options : optionsCSV
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. *
            request.success(function (data) {
                $scope.message = "From PHP file : "+data;
                //window.location.href('findinternshipresult.html');
            });        
            $log.info($param);
            $http.post('php/findIntern.php',{'city':$param.city,'selectedArea':$param.selectedArea,'Category_Name':optionsCSV})
            .success(function(data){
              alert('success'+$param.city);
            })
            .error(function(err){
              alert('failure');
            });*/
      }
})

.controller('listController', function($scope, $ionicSideMenuDelegate) {
        console.log("Home Controller");

      $scope.InternshipList = 
        [
                  {
                    "InternshipID": "1",
                    "InternshipTitle": "Java Developer",
                    "PostedDate": "2016-01-01",
                    "StartDate": "2016-01-03",
                    "LastDate": "2016-01-12",
                    "ShortDesc": "Internship for MBA,MCA",
                    "LongDesc": "Internship for MBA,MCA,BE",
                    "CompanyDesc": "Dreamwood Information Technology",
                    "CompanyName": "Dreamwood Information Technology Pvt Ltd",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  },
                  {
                    "InternshipID": "2",
                    "InternshipTitle": "Dot Net Developer",
                    "PostedDate": "2016-01-08",
                    "StartDate": "2016-01-09",
                    "LastDate": "2016-01-10",
                    "ShortDesc": "Internship for MBA,MCA,BE",
                    "LongDesc": "Internship for MBA,MCA",
                    "CompanyDesc": "Dreamwood Information Technology",
                    "CompanyName": "Dreamwood Information Technology Pvt Ltd",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  },
                  {
                    "InternshipID": "3",
                    "InternshipTitle": "PHP Developer",
                    "PostedDate": "2016-01-08",
                    "StartDate": "2016-01-09",
                    "LastDate": "2016-01-10",
                    "ShortDesc": "Internship for MBA,MCA,BE",
                    "LongDesc": "Internship for MBA,MCA",
                    "CompanyDesc": "TechTry Solutions Pvt Ltd",
                    "CompanyName": "TechTry Solutions Pvt Ltd",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  },
                  {
                    "InternshipID": "4",
                    "InternshipTitle": "Dot Net Developer",
                    "PostedDate": "2016-01-08",
                    "StartDate": "2016-01-09",
                    "LastDate": "2016-01-10",
                    "ShortDesc": "Internship for MBA,MCA,BE",
                    "LongDesc": "Internship for MBA,MCA",
                    "CompanyDesc": "Team Unite5",
                    "CompanyName": "Unite5 Developers",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  },
                  {
                    "InternshipID": "5",
                    "InternshipTitle": "Search Engine Optimization",
                    "PostedDate": "2016-01-08",
                    "StartDate": "2016-01-09",
                    "LastDate": "2016-01-10",
                    "ShortDesc": "Internship for MBA,MCA,BE",
                    "LongDesc": "Internship for MBA,MCA",
                    "CompanyDesc": "TechTry Solutions Pvt Ltd",
                    "CompanyName": "TechTry Solutions Pvt Ltd",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  }
            ];

  $scope.Internships = $scope.InternshipList.length;
})

.controller('view', function($scope,$routeParams,$ionicModal,$stateParams, $ionicSideMenuDelegate) {
  $ionicModal.fromTemplateUrl('models/mapview.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {

    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.showspin = function(){
    document.getElementById('spin').style.display = "block";
  }
//alert('hi view '+$stateParams.InternshipID);
  console.log($stateParams.InternshipID);
    $scope.InternshipList = 
    [
                  {
                    "InternshipID": "1",
                    "InternshipTitle": "Java Developer",
                    "PostedDate": "2016-01-01",
                    "StartDate": "2016-01-03",
                    "LastDate": "2016-01-12",
                    "ShortDesc": "Internship for MBA,MCA",
                    "LongDesc": "Internship for MBA,MCA,BE",
                    "CompanyDesc": "Dreamwood Information Technology",
                    "CompanyName": "Dreamwood Information Technology Pvt Ltd",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  },
                  {
                    "InternshipID": "2",
                    "InternshipTitle": "Dot Net Developer",
                    "PostedDate": "2016-01-08",
                    "StartDate": "2016-01-09",
                    "LastDate": "2016-01-10",
                    "ShortDesc": "Internship for MBA,MCA,BE",
                    "LongDesc": "Internship for MBA,MCA",
                    "CompanyDesc": "Dreamwood Information Technology",
                    "CompanyName": "Dreamwood Information Technology Pvt Ltd",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  },
                  {
                    "InternshipID": "3",
                    "InternshipTitle": "PHP Developer",
                    "PostedDate": "2016-01-08",
                    "StartDate": "2016-01-09",
                    "LastDate": "2016-01-10",
                    "ShortDesc": "Internship for MBA,MCA,BE",
                    "LongDesc": "Internship for MBA,MCA",
                    "CompanyDesc": "TechTry Solutions Pvt Ltd",
                    "CompanyName": "TechTry Solutions Pvt Ltd",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  },
                  {
                    "InternshipID": "4",
                    "InternshipTitle": "Dot Net Developer",
                    "PostedDate": "2016-01-08",
                    "StartDate": "2016-01-09",
                    "LastDate": "2016-01-10",
                    "ShortDesc": "Internship for MBA,MCA,BE",
                    "LongDesc": "Internship for MBA,MCA",
                    "CompanyDesc": "Team Unite5",
                    "CompanyName": "Unite5 Developers",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  },
                  {
                    "InternshipID": "5",
                    "InternshipTitle": "Search Engine Optimization",
                    "PostedDate": "2016-01-08",
                    "StartDate": "2016-01-09",
                    "LastDate": "2016-01-10",
                    "ShortDesc": "Internship for MBA,MCA,BE",
                    "LongDesc": "Internship for MBA,MCA",
                    "CompanyDesc": "TechTry Solutions Pvt Ltd",
                    "CompanyName": "TechTry Solutions Pvt Ltd",
                    "CityID": "Mumbai",
                    "CategoryID": "IT and Computers"
                  }
    ];

  $scope.getID = $stateParams.InternshipID ;

  console.log($scope.getID);
  $scope.InternshipID = 0;
  var i = null;
    for (i = 0; $scope.InternshipList.length > i; i += 1) {
        if ($scope.InternshipList[i].InternshipID === $scope.getID) {
            $scope.InternshipID = i;
            break;
        }
    }

    $scope.InternshipData = $scope.InternshipList[$scope.InternshipID];

})

.controller('HomeTabCtrl', function($scope) {
}); 




/*angular.module('internkatta.controllers', [])

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('HomeTabCtrl', function($scope) {
})*/
