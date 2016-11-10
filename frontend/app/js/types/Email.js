/*jslint todo : true, sub : true*/
/*global types */

types.Email = function (value) {
    'use strict';
    this.value = value;
};

types.Email.typeName = 'email';

types.Email.prototype.testRegular = /^[a-zA-Z0-9\._\-]+@[a-zA-Z0-9\-]+\.(?:[a-zA-Z0-9\-\.]+)+$/i;

types.Email.prototype.maxLength = 100;

types.Email.prototype.value = null;

types.Email.prototype.isValid = function () {
    'use strict';
    return this.testRegular.test(this.value) && this.value && this.value.length
        this.value.length <= this.maxLength;
};