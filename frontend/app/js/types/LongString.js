/*jslint todo : true, sub : true*/
/*global types */

types.LongString = function (value) {
    'use strict';
    this.value = value;
};

types.LongString.typeName = 'longString';

types.LongString.prototype.value = null;

types.LongString.prototype.maxLength = 200;

types.LongString.prototype.isValid = function () {
    'use strict';
    return (typeof this.value === 'string') &&
        this.value.length &&
        (this.value.length <= this.maxLength);
};