/*jslint sub : true */
/*global EventEmitter, ui, domInterface, domInterface*/

ui.DetailedList = function (element, properties) {
    'use strict';
    properties = properties || {};
    this.element = element;
    this.properties = properties;
    this.model = properties['model'] || null;


    this.preBindHandlers();


    this.render();


    this.attachHandlers();
    this.attachDomHandlers();
};



ui.DetailedList.prototype = Object.create(EventEmitter.prototype);
ui.DetailedList.prototype.constructor = ui.DetailedList;




ui.DetailedList.prototype.removeItemClass = 'list__remove-item';
ui.DetailedList.prototype.detailsButtonClass = 'list__detail-button';
ui.DetailedList.prototype.listItemClass = 'list__item';
ui.DetailedList.prototype.detailsClosedClass = 'list__item_details-closed';
ui.DetailedList.prototype.listItemsBoxClass = 'list__items-box';
ui.DetailedList.prototype.hiddenClass = 'list_hidden';
ui.DetailedList.prototype.element = null;
ui.DetailedList.prototype.properties = null;
ui.DetailedList.prototype.model = null;

ui.DetailedList.templates = {
    'main' : '<div class="list list_hidden">' +
                '<ul class="list__items-box">{{listItems}}</ul>' +
              '</div>',
    'li' : '<li class="list__item list__item_details-closed">' +
                '<span class="list__item-caption">{{listItemCaption}}</span>' +
                    '<span class="list__remove-item">✕</span>' +
                    '<button class="button list__detail-button">' +
                        '<div class="button__caption">' +
                            'Detail' +
                        '</div>' +
                    '</button>' +
                '<ul class="list__detail">' +
                    '{{detailsList}}' +
                '</ul>' +
            '</li>',
    'detailItem' : '<li class="list__detail-item">{{caption}}: {{value}}</li>',
    'detailAvararItem' : '<li class="list__detail-item">{{caption}} : <img class="list__detail-item-image" src="{{value}}" /></li>'
};

ui.DetailedList.prototype.getList = function () {
    'use strict';
    return this.element.querySelector('.list');
};

ui.DetailedList.prototype.hide = function () {
    'use strict';
    domInterface.addClass(this.getList(), this.hiddenClass);
};

ui.DetailedList.prototype.show = function () {
    'use strict';
    domInterface.removeClass(this.getList(), this.hiddenClass);
};

ui.DetailedList.prototype.setModel = function (newModel) {
    'use strict';
    if (this.model !== newModel) {
        this.model = newModel;
        this.render();
        this.attachHandlers();
    }
};

ui.DetailedList.prototype.preBindHandlers = function () {
    'use strict';
    this.onAddItemHandler        = this.onAddItemHandler.bind(this);
    this.onDeleteItemHandler     = this.onDeleteItemHandler.bind(this);
    this.removeItemClickHandler  = this.removeItemClickHandler.bind(this);
    this.showDetailsClickHandler = this.showDetailsClickHandler.bind(this);
    this.getItemHtml             = this.getItemHtml.bind(this);
};

ui.DetailedList.prototype.attachHandlers = function () {
    'use strict';
    var model = this.model;
    if (model) {
        model.removeListener('deleteItem', this.onDeleteItemHandler);
        model.removeListener('addItem', this.onAddItemHandler);
        model.on('deleteItem', this.onDeleteItemHandler);
        model.on('addItem', this.onAddItemHandler);
    }
};

ui.DetailedList.prototype.removeItemClickHandler = function (event) {
    'use strict';
    var target   = event.target,
        listItem = domInterface.getClosestByClass(target, this.listItemClass),
        index    = domInterface.getIndexOf(listItem);
    this.model.removeItemByIndex(index);
};

ui.DetailedList.prototype.showDetailsClickHandler = function (event) {
    'use strict';
    var target   = event.target,
        listItem = domInterface.getClosestByClass(target, this.listItemClass);

    domInterface.toggleClass(listItem, this.detailsClosedClass);
};

ui.DetailedList.prototype.attachDomHandlers = function () {
    'use strict';
    var self = this;
    domInterface.onClick(this.element, function (event) {
        var target = event.target;
        if (domInterface.getClosestByClass(target, self.removeItemClass)) {
            self.removeItemClickHandler(event);
        } else if (domInterface.getClosestByClass(target, self.detailsButtonClass)) {
            self.showDetailsClickHandler(event);
        }
    });
};

ui.DetailedList.prototype.getItemsBox = function () {
    'use strict';
    return this.element.querySelector('.' + this.listItemsBoxClass);
};

ui.DetailedList.prototype.onAddItemHandler = function (event) {
    'use strict';
    var index    = event.index,
        itemData = event.itemData;
    domInterface.appendByIndex(this.getItemsBox(), index, this.getItemHtml(itemData));
};

ui.DetailedList.prototype.onDeleteItemHandler = function (event) {
    'use strict';
    var index    = event.index,
        itemsBox = this.getItemsBox();
    itemsBox.removeChild(itemsBox.childNodes[index]);
};

ui.DetailedList.prototype.getItemHtml = function (itemData) {
    'use strict';
    var templates = ui.DetailedList.templates,
        model = this.model,
        titleBy = model.getTitleBy(),
        detailAvararItem,
        liHtml,
        detailsList = '';

    liHtml = templates.li;
    liHtml = liHtml.replace('{{listItemCaption}}', itemData[titleBy]);
    Object.keys(itemData).forEach(function (key, index) {
        var caption = model.getCaptionByName(key),
            detailItem;
        if (key !== 'id') {
            if (model.getTypeByName(key) === 'avatarUri') {
                detailItem = templates.detailAvararItem;
            } else {
                detailItem = templates.detailItem;
            }
            detailItem = detailItem.replace("{{caption}}", caption);
            detailItem = detailItem.replace("{{value}}", itemData[key]);
            detailsList += detailItem;
        }
    });
    liHtml = liHtml.replace('{{detailsList}}', detailsList);
    return liHtml;
};

ui.DetailedList.prototype.render = function () {
    'use strict';
    var templates = ui.DetailedList.templates,
        data,
        model,
        listItemsHtml,
        html;

    html           = templates.main;
    listItemsHtml = '';

    if (this.model) {
        model = this.model;
        data = model.getListData();
        if (data instanceof Array) {
            listItemsHtml = data.map(this.getItemHtml).join('');
        }
    }
    html = html.replace("{{listItems}}", listItemsHtml);

    this.element.innerHTML = html;
};