export default class User {
  constructor(JWT,AppConstants, $http, $state) {
    'ngInject';
    
    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this.current = null;

  }

  getCharacters(){
    return this._$http({
      url:  this._AppConstants.api + '/marvel/characters',
      method: 'GET'
    }).then(
      (res) => {
        return res.data.characters;
      }
    )  
  }

  getCharacterInfo(id){
    return this._$http({
      url:  this._AppConstants.api + '/marvel/characters',//+id,
      method: 'GET'
    }).then(
      (res) => {
        //console.log(res.data.characters[0]);
        return res.data.characters[0];
      }
    )  
  }
}
