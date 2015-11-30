angular.module('starter')

//Login
.service('LoginService', function($q) {
 
//Login
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'studiare' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

//----------------------------------------------------------

.factory('improvementservice', function(){
    improvementservice = {};
    improvementservice.title = '';
    improvementservice.category = '';
    improvementservice.content = '';
    improvementservice.user = '';
    improvementservice.responsible = '';
    improvementservice.created_at = '';
    improvementservice.updated_at = '';
    improvementservice.status = '';
    improvementservice.id = '';
    improvementservice.user.id = '';
    improvementservice.responsible.id = '';
    return improvementservice
})

//----------------------------------------------------------

//Get All Tasks
//.factory('GetAllTasksService', function($http, $q, mybaseurl) {
//  var deffered = $q.defer();
//  var improvements = [];  
//  var getalltasks = {};
//  myurlsite = mybaseurl.mywebsite;

//  getalltasks.async = function() {
//    $http.get( myurlsite + 'improvements.json')
//    .success(function (d) {
//      improvements = d;
//      console.log(d);
//      deffered.resolve();
//    });
//    return deffered.promise;
//   };
//   getalltasks.improvements = function() { return improvements; };
//
//  return getalltasks;
// })

//----------------------------------------------------------

//Base Url
.service('mybaseurl', function() {

  var mywebsite = 'https://studiare-tasks.herokuapp.com/'
  
  return { mywebsite: mywebsite}
})



