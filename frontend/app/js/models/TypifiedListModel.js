/*jslint todo : true, sub : true*/
/*globals Model */

var TypifiedListModel = function (data, dataType) {
    'use strict';
    data = data || [];
    if (!this.isValidList(data, dataType)) {
        data = [];
    }
    this.data = data;
    this.dataType = dataType;
};



TypifiedListModel.prototype = Object.create(Model.prototype);
TypifiedListModel.prototype.constructor = TypifiedListModel;



TypifiedListModel.prototype.data = null;
TypifiedListModel.prototype.dataType = null;



TypifiedListModel.prototype.getNextId = function () {
    'use strict';
    var ids = this.data.map(function (item) {
            return item.id;
        }),
        maxId = ids.length ? Math.max.apply(null, ids) : 0;
    return maxId + 1;
};

TypifiedListModel.prototype.getListData = function () {
    'use strict';
    return this.data;
};

TypifiedListModel.prototype.getTypeByName = function (name) {
    'use strict';
    var structure = this.dataType.structure,
        length = structure.length,
        index;

    for (index = 0; index < length; index += 1) {
        if (structure[index]['name'] === name) {
            return structure[index]['type'];
        }
    }
};

TypifiedListModel.prototype.getCaptionByName = function (targetName) {
    'use strict';
    var result = this.dataType['structure'].filter(function (item) {
        return item['name'] === targetName;
    });
    if (result && result.length) {
        return result[0]['caption'];
    }
};

TypifiedListModel.prototype.getTitleBy = function () {
    'use strict';
    return this.dataType['titleBy'];
};

TypifiedListModel.prototype.addNewElement = function (newElement, index) {
    'use strict';
    var data = this.data;
    if (this.isValidItem(newElement, this.dataType)) {
        if (typeof index !== 'number') {
            index = data.length;
        }
        data.splice(index, 0, newElement);
        this.emit('addItem', {
            'index' : index,
            'itemData' : newElement
        });
    }
};

TypifiedListModel.prototype.removeItemByIndex = function (index) {
    'use strict';
    this.data.splice(index, 1);
    this.emit('deleteItem', {
        'index' : index
    });

};
