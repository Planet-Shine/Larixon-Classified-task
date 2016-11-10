/*jslint todo : true, sub : true*/
/*globals EventEmitter, typeHash */


var Model = function () {
    'use strict';
};



Model.prototype = Object.create(EventEmitter.prototype);
Model.prototype.constructor = Model;


Model.prototype.isValidList = function (targetList, type) {
    'use strict';
    var self = this,
        result = true;
    targetList.forEach(function (target) {
        result = (result && self.isValidItem(target, type));
    });
    return result;
};

Model.prototype.isValidItem = function (target, type) {
    'use strict';
    var result = true;
    if (type['structure']) {
        if (type['structure'].length !== Object.keys(target).length) {
            result = false;
        } else {
            result = type['structure'].every(function (filedDescription) {
                var name      = filedDescription['name'],
                    filedType = filedDescription['type'],
                    value     = new typeHash[filedType](target[name]);
                return value.isValid();
            });
        }
    } else {
        result = new typeHash[type](target).isValid();
    }
    return result;
};

Model.prototype.isValidStateOfItem = function (target, type) {
    'use strict';
    var result = {};
    type['structure'].forEach(function (filedDescription) {
        var name      = filedDescription['name'],
            filedType = filedDescription['type'],
            value     = new typeHash[filedType](target[name]);
        result['name'] = value.isValid();
    });
    return result;
};