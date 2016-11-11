/*jslint todo : true, sub : true*/
/*global types */

types.Phone = function (value) {
    'use strict';
    this.value = value;
};

types.Phone.typeName = 'phone';

types.Phone.prototype.testRegular = /^(:?(\+?\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{2}[\s.-]\d{2})|(:?\+?\d{1,11})$/;

types.Phone.prototype.value = null;

types.Phone.prototype.isValid = function () {
    'use strict';
    return this.testRegular.test(this.value) && this.value && this.value.length;
};