var gateway = require('../gateway/marvel');

exports.findById = function(id) {
    return new Promise(function(resolve, reject){
        gateway.getCharacter(id, resolve);
    });
    // .then(function())
    // return { 
    //     characters: [{
    //         id:'121',
    //         name:'Iron Man'
    //     }]
    // } ;
}

exports.find = function() {
    return new Promise(function(resolve, reject){
        gateway.getCharacters(resolve);
    });
    // Promise.call(gateway.getCharacter(id))
    // .then(function())
    // return { 
    //     characters: [
    //         {
    //             id:'121',
    //             name:'Iron Man'
    //         },
    //         {
    //             id:'121',
    //             name:'Iron Man'
    //         },
    //         {
    //             id:'121',
    //             name:'Iron Man'
    //         },
    //     ]
    // } ;
}