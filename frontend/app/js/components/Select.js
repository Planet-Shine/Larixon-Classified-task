/*jslint sub : true */
/*global EventEmitter, ui, domInterface, domInterface*/

ui.Select = function (element, properties) {
    'use strict';
    properties = properties || {};
    this.properties = properties;
    this.element = element;


    this.render();


    this.select          = this.element.querySelector('.select');
    this.element.parentNode.replaceChild(this.select, this.element);
    this.element         = this.select;


    this.caption         = this.element.querySelector('.select__caption');
    this.selectedCaption = this.element.querySelector('.' + this.selectedCaptionClass);
    this.optionList      = this.element.querySelector('.select__options');

    this.prebindHandlers();
    this.attachHandlers();
};



ui.Select.prototype = Object.create(EventEmitter.prototype);
ui.Select.prototype.constructor = ui.Select;



ui.Select.prototype.value = null;

ui.Select.prototype.closedClass = 'select_closed';

ui.Select.prototype.itemClass = 'select__item';

ui.Select.prototype.selectedCaptionClass = 'select__selected';

ui.Select.prototype.selectedCaptionShowClass = 'select_shown-selected';

ui.Select.prototype.defaultCaptionShowClass = 'select_shown-default';

ui.Select.prototype.selectedItemClass = 'select__item_selected';

ui.Select.prototype.element = null;

ui.Select.prototype.select = null;

ui.Select.prototype.caption = null;

ui.Select.prototype.options = null;

ui.Select.prototype.properties = null;

ui.Select.prototype.getValue = function () {
    'use strict';
    return this.value;
};

ui.Select.prototype.toSelectedShownMode = function () {
    'use strict';
    domInterface.addClass(this.select, this.selectedCaptionShowClass);
    domInterface.removeClass(this.select, this.defaultCaptionShowClass);
};

ui.Select.prototype.onOptionListClickHandler = function (event) {
    'use strict';
    var target          = event.target,
        closestListItem = domInterface.getClosestByClass(target, this.itemClass),
        selectedItem,
        value,
        oldValue;
    if (closestListItem) {
        selectedItem = this.optionList.querySelector('.' + this.selectedItemClass);
        if (selectedItem) {
            domInterface.removeClass(selectedItem, this.selectedItemClass);
        }
        domInterface.addClass(closestListItem, this.selectedItemClass);


        oldValue = this.value;
        value = this.properties.options[domInterface.getIndexOf(closestListItem)]['value'];

        this.value = value;
        this.selectedCaption.innerHTML = closestListItem.innerHTML;
        this.toSelectedShownMode();
        this.toggleClosed();
        if (oldValue !== value) {
            this.emit('changed', {
                'oldValue' : oldValue,
                'value'    : value
            });
        }
    }
};

ui.Select.prototype.toggleClosed = function () {
    'use strict';
    domInterface.toggleClass(this.select, this.closedClass);
};

ui.Select.prototype.onCaptionClickHandler = function () {
    'use strict';
    this.toggleClosed();
};

ui.Select.prototype.onOutsideClickHandler = function () {
    'use strict';
    domInterface.addClass(this.select, this.closedClass);
};

ui.Select.prototype.prebindHandlers = function () {
    'use strict';
    this.onCaptionClickHandler    = this.onCaptionClickHandler.bind(this);
    this.onOptionListClickHandler = this.onOptionListClickHandler.bind(this);
    this.onOutsideClickHandler    = this.onOutsideClickHandler.bind(this);
};

ui.Select.prototype.attachHandlers = function () {
    'use strict';
    domInterface.onClick(this.caption, this.onCaptionClickHandler);
    domInterface.onClick(this.optionList, this.onOptionListClickHandler);
    domInterface.onOutsideClick(this.select, this.onOutsideClickHandler);
};

ui.Select.prototype.render = function () {
    'use strict';
    var templates      = ui.Select.templates,
        defaultCaption = this.properties.defaultCaption || '',
        options        = this.properties.options,
        html = '',
        listItems;

    listItems = options.map(function (option) {
        var li = templates.li;
        li = li.replace("{{caption}}", option['caption']);
        return li;
    }).join('');

    html += templates.main;
    html = html.replace("{{defaultCaption}}", defaultCaption);
    html = html.replace("{{listItems}}", listItems);

    this.element.innerHTML = html;
};

ui.Select.templates = {
    'main' : '<div class="select select_closed select_shown-default select_medium">' +
                '<div class="select__caption">' +
                    '<div class="select__selected-default">{{defaultCaption}}</div>' +
                    '<div class="select__selected">' +
                    '</div>' +
                    '<div class="select__caption-icon"></div>' +
                '</div>' +
                '<ul class="select__options">{{listItems}}' +
                '</ul>' +
             '</div>',
    'li' : '<li class="select__item">{{caption}}</li>'
};

ui.Select.prototype.selectByItemId = function () {
    'use strict';
    return;
};


