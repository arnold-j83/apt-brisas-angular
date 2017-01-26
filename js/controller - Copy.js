angular.module('formControllers',[])
  //create controller module called formsControllers, we don't have any dependencies to inject so [] indicates a blank array
    .controller('RegisterController',function($scope, $location) {
        $scope.register = {};
        //sets submitted status to false
        $scope.submitted = false;
        //sets  uniqueusername and uniqueemail so form can validate on submit
        $scope.uniqueusername = true;
        $scope.uniqueemail = true;

        $scope.registerForm = function(registerForm) {
            $scope.submitted = false;
            $scope.uniqueusername = true;
            $scope.uniqueemail = true;
             
           
                if (registerForm.$valid) {
                   //continue with form processing
                    $scope.submitted = false;
                     //continue with form processing
                     alert("Form Valid: " + $scope.register.username + " " +  $scope.register.email);
                     $scope.register = {}; //reset the form
                     return; // return from function

                     //use a service to check for validity of username
                       $scope.uniqueusername = true; 
                       //use a service to check for validity of email
                       $scope.uniqueemail = true;
                    if ($scope.uniqueusername &&
                         $scope.uniqueemail ) {
                         // proceed to process form via backend service
                      }
           }
                else {
                      console.log("form is invalid");
                      $scope.submitted = true;
                    }
        
    };




})

    .controller('AboutController', function($scope) {
    $scope.title = "About Apartment Brisas";
    $scope.maps = [{
        
        address: 'Brisas Del Mar, Formentera del Segura, spain',
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
  })

    .controller('option1Controller', function($scope) {
    $scope.loading = true;
    $scope.title = "Apartment Brisas location";
    $scope.maps = [{
        
        address: 'Brisas Del Mar, Formentera del Segura, spain',
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
    })

    .controller('availabilityController', function($scope, store) {
    $scope.loading = true;

    var authStorage = {
            name: "StorageTest"
        };
 
        store.set('obj', authStorage);
        
    $scope.title = "Availability";
    $scope.maps = [{
        
        address: 'Brisas Del Mar, Formentera del Segura, spain',
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
       
       $scope.register = {};
        //sets submitted status to false
        $scope.submitted = false;
        //sets  uniqueusername and uniqueemail so form can validate on submit
        $scope.uniqueusername = true;
        $scope.uniqueemail = true;
        $scope.titles = ['Mr','Mrs','Miss','Ms', 'Dr', 'Sir'];
        $scope.selectedTitle = $scope.title[1];
        $scope.adults = [1,2,3,4,5,6];
        $scope.selectedAdults = $scope.adults[1];
        $scope.children = [0,1,2,3,4,5,6];
        $scope.selectedChildren = $scope.children[1];
        $scope.date = new Date();
        $scope.registerForm = function(registerForm) {
            $scope.date = new Date();
            $scope.submitted = false;
            $scope.uniqueusername = true;
            $scope.uniqueemail = true;
             
           
                if (registerForm.$valid) {
                   //continue with form processing
                    $scope.submitted = false;
                     //continue with form processing
                     alert("Form Valid: " + $scope.register.username + " " +  $scope.register.email);
                     $scope.register = {}; //reset the form
                     return; // return from function

                     //use a service to check for validity of username
                       $scope.uniqueusername = true; 
                       //use a service to check for validity of email
                       $scope.uniqueemail = true;
                    if ($scope.uniqueusername &&
                         $scope.uniqueemail ) {
                         // proceed to process form via backend service
                      }
           }
                else {
                      console.log("form is invalid");
                      $scope.submitted = true;
                    }
        
    };
    })

    .controller('activitiesController', function($scope) {
    $scope.loading = true;
    $scope.title = "Activities";

    $scope.maps = [{
        
        address: 'Brisas Del Mar, Formentera del Segura, spain',
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
  })

    .controller('pricesController', function($scope) {

    $scope.loading = true;
    $scope.title = "Menu Option 3";
    $scope.maps = [{
        
        address: 'Brisas Del Mar, Formentera del Segura, spain',
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
})

    .controller('weatherController', function($scope){
      $scope.title = "Weather";
    })

    .controller('galleryController', function($scope){
      $scope.title = "Gallery";
    })