/*jslint todo : true, sub : true*/
/*global types */

types.Date = function (value) {
    'use strict';
    this.value = value;
};

types.Date.typeName = 'date';

types.Date.prototype.parseRegular = /^(\d+)\/(\d+)\/(\d+)$/;

types.Date.prototype.value = null;

types.Date.prototype.isValid = function () {
    'use strict';
    var result       = false,
        parseRegular = this.parseRegular,
        matchResult,
        date;

    if (!(this.value && this.value.length)) {
        return false;
    }
    matchResult  = this.value.match(parseRegular)

    if (matchResult !== null) {
        date = matchResult.slice(1).map(function (value) {
            return parseInt(value, 10);
        });
        date = new Date(date[2], date[1], date[1]);
        if (Object.prototype.toString.call(date) === "[object Date]") {
            result = true;
        }
    }
    return result;
};