/*jslint todo : true, sub : true*/
/*global types */

types.Person = function (value) {
    'use strict';
    this.value = value;
};

types.Person.typeName = 'person';

types.Person.prototype.value = null;

types.Person.prototype.maxLength = 50;

types.Person.prototype.testRegular = /^[\wА-Яа-я\s]+$/;

types.Person.prototype.isValid = function () {
    'use strict';
    return (this.testRegular.test(this.value)) && this.value && this.value.length &&
        (this.value.length <= this.maxLength);
};