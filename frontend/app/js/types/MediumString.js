/*jslint todo : true, sub : true*/
/*global types */

types.MediumString = function (value) {
    'use strict';
    this.value = value;
};

types.MediumString.typeName = 'mediumString';

types.MediumString.prototype.value = null;

types.MediumString.prototype.maxLength = 70;

types.MediumString.prototype.isValid = function () {
    'use strict';
    return (typeof this.value === 'string') &&
        this.value.length &&
        (this.value.length <= this.maxLength);
};