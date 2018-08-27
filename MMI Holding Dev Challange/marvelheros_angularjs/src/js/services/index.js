import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import MarvelService from './marvel.service';
servicesModule.service('Marvel', MarvelService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

export default servicesModule;
