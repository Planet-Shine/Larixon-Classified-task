/*jslint todo : true, sub : true*/
/*global types */

types.Text = function (value) {
    'use strict';
    this.value = value;
};

types.Text.typeName = 'text';

types.Text.prototype.maxLength = 500;

types.Text.prototype.value = null;

types.Text.prototype.isValid = function () {
    'use strict';
    return (typeof this.value === 'string') &&
        this.value &&
        this.value.length &&
        (this.value.length <= this.maxLength);
};