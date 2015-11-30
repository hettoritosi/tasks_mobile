angular.module('starter')


//Mypanel
.directive('mypanel', function($state) {

var link = function(scope){
      scope.home = function(){
                $state.go('improvements')
        };
      scope.newtask = function(){
                $state.go('newtask')
        };
      scope.graveyard = function(){
                $state.go('graveyard')
        };
      scope.usuarios = function(){
                $state.go('whoareyou')
        };
	  scope.logout = function(){
      window.localStorage.removeItem("profile");
                $state.go('login', {}, {reload:true});
        };
    scope.allimprovements = function(){
                $state.go('allimprovements')
        };

  };

  return{
  	link: link,
  	scope: {
  		selected: '@',
      userAdmin: '='
  	},
    templateUrl: "js/partials/mypanel.html"
    			        
  };

})

//----------------------------------------------------------

//More Button
.directive('morebutton', function($state, $http, $stateParams) {
var link = function(scope){
     scope.more = function(improvement) {
        $state.go('more', {improvement_id: improvement.id})
    }

  };
  return {
    link:link,
    template: '<i class="icon ion-information-circled space" style="float: right" ng-click="more(improvement)"> Info</i>'
  }

})

//----------------------------------------------------------

//Mypanelall
.directive('mypanelall', function($state, $ionicHistory) {

var link = function(scope){
      scope.home = function(){
                $state.go('improvements')
        };

    scope.allimprovements = function(){
                $state.go('allimprovements')
        };

    scope.myGoBack = function() {
              window.history.back();
          };

  };

  return{
    link: link,
    scope: {
      selected: '@'
    },
    templateUrl: "js/partials/mypanelall.html"
                  
  };

})

//----------------------------------------------------------

//Graveyard Button
.directive('graveyardbutton', function($state, $http, $stateParams,$ionicPopup,mybaseurl,$ionicLoading) {

var link = function(scope){
   scope.grave = function(improvement,scope) {


   var confirmPopup = $ionicPopup.confirm({
     title: 'Cemitério',
     template: 'Tem certeza que deseja colocar a Tarefa '+'<b>'+ improvement.title +'</b>'+ ' no Cemitério?'
   });
   confirmPopup.then(function(res) {
     if(res) {

               improv = improvement;
    $http({
            method: 'GET',
            url: 'https://studiare-tasks.herokuapp.com/' + "improvements/mobile/" + improv.id,
            params: {status_id: '3'}  // Finished Status
    })
      .success(function(retorno) {
            $state.go('graveyard')
            var alertPopup = $ionicPopup.alert({
                title: 'Graveyard!',
                template: 'Now Your Task is in the Graveyard'
            });
        })
      .error(function(erro) {
           $ionicLoading.hide();
           $state.go('graveyard')
            var alertPopup = $ionicPopup.alert({
                title: 'Cemitério!',
                template: 'Agora Sua Tarefa está no Cemitério'
            });
        });
    }
     else {
       console.log('You are not sure');
     }
   });
};

  };
  return {
    link:link,
    template: '<i class="icon ion-social-snapchat space" ng-click="grave(improvement)"> Cemitério</i>'
  }

})



