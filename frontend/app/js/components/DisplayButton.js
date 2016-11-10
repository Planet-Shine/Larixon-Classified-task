/*jslint sub : true */
/*global Button, EventEmitter, ui, domInterface, domInterface*/

ui.DisplayButton = function (element, properties) {
    'use strict';
    properties = properties || {};
    this.element = element;
    this.properties = properties;


    this.render();


    this.button = element.querySelector('.button');
    this.element.parentNode.replaceChild(this.button, this.element);


    this.element = this.button;


    this.attachHandlers();
};


ui.DisplayButton.prototype = Object.create(ui.Button.prototype);
ui.DisplayButton.prototype.constructor = ui.DisplayButton;
ui.DisplayButton.prototype.mode = 'show';
ui.DisplayButton.prototype.hideClass = 'button_hide';
ui.DisplayButton.prototype.showClass = 'button_show';

ui.DisplayButton.prototype.onClickHandler = function () {
    'use strict';
    this.emit('clicked', {
        'action' : this.mode
    });
};

ui.DisplayButton.prototype.toShowMode = function () {
    'use strict';
    this.mode = 'show';
    domInterface.addClass(this.button, this.showClass);
    domInterface.removeClass(this.button, this.hideClass);
};

ui.DisplayButton.prototype.toHideMode = function () {
    'use strict';
    this.mode = 'hide';
    domInterface.addClass(this.button, this.hideClass);
    domInterface.removeClass(this.button, this.showClass);
};

ui.DisplayButton.prototype.render = function () {
    'use strict';
    var showCaption = this.properties.showCaption || '',
        hideCaption = this.properties.hideCaption || '',
        mainTemplate = ui.DisplayButton.templates.main,
        html = mainTemplate.replace('{{showCaption}}', showCaption);

    html = html.replace('{{hideCaption}}', hideCaption);


    this.element.innerHTML = html;
};

ui.DisplayButton.templates = {
    'main' : '<button class="button button_show">' +
                '<div class="button__caption button__caption-show">{{showCaption}}</div>' +
                '<div class="button__caption button__caption-hide">{{hideCaption}}</div>' +
             '</button>'
};



