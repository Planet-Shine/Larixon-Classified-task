/*jslint todo : true, sub : true*/
/*global types */

types.Time = function (value) {
    'use strict';
    this.value = value;
};

types.Time.typeName = 'time';

types.Time.prototype.parseRegular = /^(\d+)\/(\d+)\/(\d+) (\d+):(\d+)$/;

types.Time.prototype.value = null;

types.Time.prototype.isValid = function () {
    'use strict';
    var result       = false,
        parseRegular = this.parseRegular,
        matchResult,
        date;

    if (!(this.value && this.value.length)) {
        return false;
    }
    matchResult = this.value.match(parseRegular);

    if (matchResult !== null) {
        date = matchResult.slice(1).map(function (value) {
            return parseInt(value, 10);
        });
        date = new Date(date[2], date[1], date[1], date[3], date[4]);
        if (Object.prototype.toString.call(date) === "[object Date]") {
            result = true;
        }
    }
    return result && this.value && this.value.length;
};