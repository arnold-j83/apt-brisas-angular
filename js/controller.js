angular.module('formControllers',[])
  //create controller module called formsControllers, we don't have any dependencies to inject so [] indicates a blank array
  //each route has a controller as defined in the app.js  
  .controller('HomeController', function($scope) {
    $scope.title = "Home";
  })

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
  .controller('availabilityController', function($scope, $http, UserAPIService, MyService) {
    $scope.title = "Availability and Booking";
    var apiURL = 'https://www.googleapis.com/calendar/v3/calendars/catkin.order@gmail.com/events?maxResults=15&key=AIzaSyDy4L8f1AMz49DEbNYrsJkn5Jr18lJRDhg';
    

    function parseDate(str) {
    var mdy = str.split('-');
    
    return (mdy[0] + "/" + mdy[1] + "/" + mdy[2]);
    }

    function parseDate2(str) {
    var mdy = str.split('/');
    return (mdy[2] + "-" + mdy[1] + "-" + mdy[0]);
    }

    function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
    } 
    var bookedDates = [];
    $scope.datesBooked = [];

    var googleData = $http.get(apiURL);

    //console.log(googleData);

    getmydata = function() {
    return $http.get(apiURL)
        .success(function(data) 
        {
            var googleBooked = data.items;
            var googleBooedArrLen = googleBooked.length;
            $scope.mydata = data.items;
            $scope.mydatalen = googleBooedArrLen;

            for (var i = 0; i < googleBooedArrLen; i++) {
              var endDate = (googleBooked[i].end.date);
              var startDate = (googleBooked[i].start.date);
              var newStartDate = new Date(parseDate(startDate));
              var newEndDate = new Date(parseDate(endDate));
              var numdays = (daydiff(newStartDate, newEndDate));
        
              d = newStartDate.getDate(),
              m = newStartDate.getMonth(),
              y = newStartDate.getFullYear();
              var todaysDate = new Date().toLocaleFormat("%x");
              for(var j=0; j < numdays; j++){
                var curdate = new Date(y, m, d+j).toLocaleFormat("%x");
                //console.log(curdate + " " + todaysDate);
                bookedDates.push(curdate);  
              }
            }
            $scope.datesBooked = bookedDates;
        });

    }


// do the ajax call
getmydata().then(function(data) {
    // stuff is now in our scope, I can alert it
    //alert($scope.mydata);
    //console.log($scope.datesBooked);
});    

    MyService.getPrice(apiURL).then(function(results) {
      var googleBooked = results.data.items;
      //console.log(googleBooked);
    });
    /*MyService.getPrice(apiURL).then(function(results) {
      var googleBooked = results.data.items;
      var googleBooedArrLen = googleBooked.length;
      $scope.googleBooked = googleBooked;
      $scope.googleBooedArrLen = googleBooedArrLen;
      console.log(googleBooedArrLen);
      for (var i = 0; i < googleBooedArrLen; i++) {
        var endDate = (googleBooked[i].end.date);
        var startDate = (googleBooked[i].start.date);
        var newStartDate = new Date(parseDate(startDate));
        var newEndDate = new Date(parseDate(endDate));
        var numdays = (daydiff(newStartDate, newEndDate));
        //console.log(numdays);
        d = newStartDate.getDate(),
        m = newStartDate.getMonth(),
        y = newStartDate.getFullYear();
        var todaysDate = new Date().toLocaleFormat("%x");
        for(var j=0; j < numdays; j++){
          var curdate = new Date(y, m, d+j).toLocaleFormat("%x");
          //console.log(curdate + " " + todaysDate);
              bookedDates.push(curdate);  
        }
      }
      $scope.datesBooked = bookedDates;
      
    }).catch(function(err) {
          console.log(err);
    });

  */


    function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
    }

    $scope.title = "Availability";

    $scope.register = {};

    $scope.submitted = false;

    $scope.uniqueusername = true;
    $scope.uniqueemail = true;
    $scope.titles = ['Mr','Mrs','Miss','Ms', 'Dr', 'Sir'];
    var todaysDate = new Date().toLocaleFormat("%x");
    var myArray = [];
    
    var date = new Date(),
    d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear();

    for(i=0; i < 366; i++){
    var curdate = new Date(y, m, d+i).toLocaleFormat("%x");
    myArray.push(curdate);
    }

    $scope.datesfrom = myArray;
    $scope.adults = [1,2,3,4,5,6];
    $scope.children = [0,1,2,3,4,5,6];
    var URL = "http://arnoldj-rest.herokuapp.com/enqs/";
    $scope.Enq = {};
    $scope.registerForm = function() {
      var dateFrom = $scope.register.dateFrom;
      var dateTo = $scope.register.dateTo;
        //console.log(dateFrom);
        var newStartDate = new Date(parseDate(parseDate2(dateFrom)));
        var newEndDate = new Date(parseDate(parseDate2(dateTo)));
        var numdays = (daydiff(newStartDate, newEndDate));
        d = newStartDate.getDate(),
        m = newStartDate.getMonth(),
        y = newStartDate.getFullYear();
        dateToBook = [];
        for(var j=0; j <= numdays; j++){
          var curdate = new Date(y, m, d+j).toLocaleFormat("%x");
              dateToBook.push(curdate);  
        }

        getmydata().then(function(data) {
            var newArr = [];
            var dblen = $scope.datesBooked.length;
            var datesalreadyBooked = [];
            for (var ii = 0; ii<dateToBook.length; ii++) {
              var date1 = dateToBook[ii];
              for (var jj = 0; jj <dblen; jj++) {
                var date2 = $scope.datesBooked[jj];
                
                if (date1 == date2){
                  console.log(date1 + " As it is already Booked");
                  newArr.push(date1);
                    
                }
              }
            }

            var uniqueVals = [];
            $.each(newArr, function(i, el){
            if($.inArray(el, uniqueVals) === -1) uniqueVals.push(el);
            });
            if (uniqueVals.length > 0){
              $scope.alreadyBooked = uniqueVals + " are not available, please select alternative dates.  Please refer to calender above for available dates";
              $scope.labAlreadyBooked = true;
              $scope.register_form.$valid = false;
              $scope.register_form.$invalid = true;  
            }
            

            if ($scope.register_form.$valid) {
              $scope.Enq.title = $scope.register.selectedTitle;
              $scope.Enq.fullname = $scope.register.fullname;
              $scope.Enq.emailaddress = $scope.register.email;
              $scope.Enq.telephone = $scope.register.telNumber;
              $scope.Enq.datefrom = $scope.register.dateFrom;
              $scope.Enq.dateto = $scope.register.dateTo;
              $scope.Enq.numberofadults = $scope.register.selectedAdults;
              $scope.Enq.numberofchildren = $scope.register.selectedChildren;
              $scope.labShow = false;
              UserAPIService.registerEnquiry(URL, $scope.Enq).then(function(results) {
                $scope.data = results.data;
                console.log("ENQ Complete");
                $scope.isDisabled = true;
                $scope.labShow = true;
              }).catch(function(err) {
                console.log("something went wrong");
                console.log(err);
                });
            }

            }); 

        console.log($scope.register_form.$valid);
        //getmydata().then(function(data) {
        //console.log($scope.datesBooked);
        //}); 
        
      
    };

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
    $scope.registerForm = function(registerForm) {
      $scope.date = new Date();
      $scope.submitted = false;
      $scope.uniqueusername = true;
      $scope.uniqueemail = true;
        
      if (registerForm.$valid) {
      //continue with form processing
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