class HomeCtrl {
  constructor(Marvel, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;  
    $scope.current = this;
    this.characters = null;
    this.getCharacters = function(){
      Marvel.getCharacters().then(function(data){
        $scope.current.characters = data;
      });
    }

    this.characterInfo = null;
    this.getCharacterInfo = function(id){
      Marvel.getCharacterInfo(id).then(function(data){
        $scope.current.characterInfo = data;
      });
    }
  }
}

export default HomeCtrl;
