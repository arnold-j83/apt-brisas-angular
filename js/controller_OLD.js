angular.module('formControllers',[])
  //create controller module called formsControllers, we don't have any dependencies to inject so [] indicates a blank array
  //each route has a controller as defined in the app.js  
  .controller('AboutController', function($scope) {
  //we always pass in the $scope object
    $scope.title = "About Apartment Brisas";
    $scope.maps = [{
        
      address: 'Brisas Del Mar, Av. Reina Sofia, Formentera del Segura, spain',
      zoom: 16,
      width: 1000      
      },
      {
      address: 'Guardamar del Segura beach, Guardamar del Segura, Spain',
      zoom: 16,
      width: 1000      
      },
      {
      address: 'La Marina, Guardamar del Segura, Spain',
      zoom: 16,
      width: 1000      
    }];
    $scope.map = $scope.maps[0];
  //map location for the map custom directive
  })
  
  .controller('availabilityController', function($scope) {
    $scope.title = "Availability";
  })

  .controller('availabilityController_OLD', function($scope) {
      
    $scope.title = "Availability";

    //Angular Form Below
    $scope.register = {};
    //sets submitted status to false
    $scope.submitted = false;
    //sets  uniqueusername and uniqueemail so form can validate on submit
    $scope.uniqueusername = true;
    $scope.uniqueemail = true;
    $scope.titles = ['Mr','Mrs','Miss','Ms', 'Dr', 'Sir'];
    //adds options to the select box in the form
    $scope.selectedTitle = $scope.title[1];
    $scope.adults = [1,2,3,4,5,6];
    $scope.selectedAdults = $scope.adults[1];
    $scope.children = [0,1,2,3,4,5,6];
    $scope.selectedChildren = $scope.children[1];
    $scope.date = new Date();
    $scope.dateTo =  $scope.date;
    //registerForm
    $scope.registerForm = function(registerForm) {
    //$scope.submitForm = function(){
      $scope.date = new Date();
      $scope.submitted = false;
      $scope.uniqueusername = true;
      $scope.uniqueemail = true;
      var URL = "http://arnoldj-rest.herokuapp.com/enqs/";
      $scope.registrationUser = {};  
      if (registerForm.$valid) {
      //continue with form processing
        $scope.registrationUser.title = $scope.register.selectedTitle;
        $scope.registrationUser.fullname = $scope.register.fullname;

        console.log($scope.registrationUser);

      $scope.submitted = false;
      //continue with form processing
      alert("Form Valid: " + $scope.register.fullname + " " +  $scope.register.email);
        //$scope.register = {}; //reset the form
        //return; // return from function
        //use a service to check for validity of username
        $scope.uniquefullname = true; 
        //use a service to check for validity of email
        $scope.uniqueemail = true;
          if ($scope.uniquefullname &&
            $scope.uniqueemail ) {
        }
      }
      else {
        console.log("form is invalid");
        $scope.submitted = true;
      }
      
    };
    
  })

  .controller('activitiesController', function($scope) {
    $scope.title = "Activities";
  })

  .controller('pricesController', function($scope, MyService) {

    $scope.title = "Rental Rates";
    var URL = "js/price.json";
    $scope.prices = {}; 
    MyService.getPrice(URL).then(function(results) {
      $scope.prices = results.data;
    }).catch(function(err) {
      console.log(err);
    });
  })

  .controller('weatherController', function($scope, MyService){
    
    $scope.title = "Weather";
    var URL = "http://api.openweathermap.org/data/2.5/forecast/city?q=alicante&APPID=4dd1460040170cc990568caae91e18ca&units=metric";
    //var URL = "http://api.openweathermap.org/data/2.5/forecast?q=Alicante,ES&appid=4dd1460040170cc990568caae91e18ca";
    $scope.weathers = {};
    MyService.getPrice(URL).then(function(results) {
      $scope.weathers = results.data;
    }).catch(function(err) {
          console.log(err);
    }); 
  });