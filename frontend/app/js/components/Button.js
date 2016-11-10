/*jslint sub : true */
/*global EventEmitter, ui, domInterface, domInterface*/


ui.Button = function (element, properties) {
    'use strict';
    properties = properties || {};
    this.element = element;
    this.properties = properties;


    this.render();


    this.button = element.querySelector('.button');
    this.element.parentNode.replaceChild(this.button, this.element);


    this.element         = this.button;


    this.attachHandlers();
};



ui.Button.prototype = Object.create(EventEmitter.prototype);
ui.Button.prototype.constructor = ui.Select;



ui.Button.prototype.button = null;

ui.Button.prototype.hiddenClass = 'button_hidden';

ui.Button.prototype.show = function () {
    'use strict';
    domInterface.removeClass(this.button, this.hiddenClass);
};

ui.Button.prototype.hide = function () {
    'use strict';
    domInterface.addClass(this.button, this.hiddenClass);
};

ui.Button.prototype.onClickHandler = function () {
    'use strict';
    this.emit('clicked');
};

ui.Button.prototype.attachHandlers = function () {
    'use strict';
    this.onClickHandler = this.onClickHandler.bind(this);
    domInterface.onClick(this.button, this.onClickHandler);
};

ui.Button.prototype.render = function () {
    'use strict';
    var caption = this.properties.caption || '',
        mainTemplate = ui.Button.templates.main,
        html = mainTemplate.replace('{{caption}}', caption);
    this.element.innerHTML = html;
};


ui.Button.templates = {
    'main' : '<button class="button">' +
                '<div class="button__caption">{{caption}}</div>' +
             '</button>'
};
