/*jslint todo : true, sub : true*/
/*globals Model */

var TypifiedItemModel = function (data, dataType, relatedListModel) {
    'use strict';
    data = data || {};
    if (!this.isValidItem(data, dataType)) {
        data = {};
    }
    this.dataType = dataType;
    this.relatedListModel = relatedListModel;
    if (data['id'] === undefined) {
        data['id'] = relatedListModel.getNextId();
    }
    this.data = data;
};



TypifiedItemModel.prototype = Object.create(Model.prototype);
TypifiedItemModel.prototype.constructor = TypifiedItemModel;



TypifiedItemModel.prototype.relatedListModel = null;

TypifiedItemModel.prototype.getData = function () {
    'use strict';
    return this.data;
};

TypifiedItemModel.prototype.isValidByFieldIndex = function (fieldIndex) {
    'use strict';
    var typeIndex        = this.getTypeIndexByFieldIndex(fieldIndex),
        fieldDescription = this.dataType.structure[typeIndex],
        value            = this.data[fieldDescription['name']];

    return this.isValidItem(value, fieldDescription['type']);
};

TypifiedItemModel.prototype.getDataTypeStructure = function () {
    'use strict';
    return this.dataType['structure'];
};

TypifiedItemModel.prototype.getItemData = function () {
    'use strict';
    return this.data;
};
TypifiedItemModel.prototype.isValueNew = function (fieldIndex, value) {
    'use strict';
    return this.data[this.dataType.structure[this.getTypeIndexByFieldIndex(fieldIndex)]['name']] !== value;
};

TypifiedItemModel.prototype.getTypeIndexByFieldIndex = function (fieldIndex) {
    'use strict';
    var typifiedStructure = this.dataType.structure,
        length = typifiedStructure.length,
        index;

    for (index = 0; index < length; index += 1) {
        if (typifiedStructure[index]['name'] === 'id' && index <= fieldIndex) {
            fieldIndex += 1;
            break;
        }
        if (index > fieldIndex) {
            break;
        }
    }
    return fieldIndex;
};

TypifiedItemModel.prototype.setValue = function (fieldIndex, value) {
    'use strict';
    this.data[this.dataType.structure[this.getTypeIndexByFieldIndex(fieldIndex)]['name']] = value;
};

TypifiedItemModel.prototype.isValid = function () {
    'use strict';
    return this.isValidItem(this.data, this.dataType);
};

TypifiedItemModel.prototype.getValidState = function () {
    'use strict';
    return this.isValidStateOfItem(this.data, this.dataType);
};