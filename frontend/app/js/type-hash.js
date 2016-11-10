/*jslint todo : true, sub : true*/
/*global document, types */


var typeHash = (function () {
    'use strict';
    var typeHash = {};
    Object.keys(types).forEach(function (key) {
        var type     = types[key],
            typeName = type.typeName;
        typeHash[typeName] = type;
    });
    return typeHash;
}());