/*jslint todo : true, sub : true*/
/*global types */

types.Integer = function (value) {
    'use strict';
    this.value = value;
};

types.Integer.typeName = 'integer';

types.Integer.prototype.value = null;

types.Integer.prototype.isValid = function () {
    'use strict';
    return parseInt(this.value, 10) === this.value;
};