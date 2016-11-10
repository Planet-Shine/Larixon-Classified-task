/*jslint sub : true, todo: true*/
/*globals dataTypes*/

var dataTypesHash = (function () {
    'use strict';
    var dataTypesHash = {};
    dataTypes.forEach(function (item) {
        dataTypesHash[item['name']] = item;
    });
    return dataTypesHash;
}());