/*jslint sub : true */
/*global EventEmitter, ui, domInterface, domInterface, types*/

ui.UniversalForm = function (element, properties) {
    'use strict';
    var self = this;
    properties = properties || {};
    this.element = element;
    this.properties = properties;
    this.model = properties['model'] || null;

    this.render();
    this.prebindHandlers();


    this.form = element.querySelector('.form');


    this.attachHandlers();
    this.attachDomHandlers();
};



ui.UniversalForm.prototype = Object.create(EventEmitter.prototype);
ui.UniversalForm.prototype.constructor = ui.Select;



ui.UniversalForm.templates = {
    'main'     : '<div class="form"><div class="form__only-form-fields-box">{{formFields}}</div></div>',
    'img'      : '<div class="form__add-image form__add-image_сlosed form__field">' +
                    '<div class="form__add-image-caption">{{caption}}</div>' +
                    '<div class="form__add-current-image {{choosedClass}}">' +
                        '<div class="form__square-figure"></div>' +
                        '<div class="form__cycle-figure"></div>' +
                        '<div class="form__empty-caption">+</div>' +
                    '{{value}}</div>' +
                    '<div class="form__add-image-popup">' +
                        '<div class="form__add-image-popup-items">' +
                            '<ul>{{imageList}}</ul>' +
                        '</div>' +
                    '</div>' +
                 '</div>',
    'img-value'  : '<img class="form__add-current-image-img" src="{{value}}" />',
    'img-list-item' : '<li class="form__add-image-item"><img class="form__add-image-item-img" src="{{value}}" /></li>',
    'img-list-item-none' : '<li class="form__add-image-item form__add-image-item-none">none</li>',
    'input'    : '<div class="form__input-box form__field">' +
                    '<div class="form__input-caption">{{caption}}</div>' +
                    '<input class="form__input" type="text" value="{{value}}" />' +
                 '</div>',
    'textarea' : '<div class="form__textarea-box form__field">' +
                    '<div class="form__textarea-caption">{{caption}}</div>' +
                    '<textarea class="form__textarea">{{value}}</textarea>' +
                 '</div>'
};

ui.UniversalForm.prototype.form = null;

ui.UniversalForm.prototype.formInputClass      = 'form__input';
ui.UniversalForm.prototype.formTextareaClass   = 'form__textarea';
ui.UniversalForm.prototype.formFieldClass      = 'form__field';
ui.UniversalForm.prototype.addImageFieldClass  = 'form__add-image';
ui.UniversalForm.prototype.notValidClass       = 'form__field_not-valid';
ui.UniversalForm.prototype.addImageClosedClass = 'form__add-image_сlosed';
ui.UniversalForm.prototype.imageChoosedClass   = 'form__add-current-image_choosed';
ui.UniversalForm.prototype.imagePopupClass     = 'form__add-image-popup';


ui.UniversalForm.prototype.onClickHandler = function (event) {
    'use strict';
    var target = event.target;
    if (domInterface.getClosestByClass(target, 'form__add-image') && !domInterface.getClosestByClass(target, 'form__add-image-popup')) {
        this.toggleAvatarHandler(event);
    } else if (domInterface.hasClass(target, "form__add-image-item-img") || domInterface.getClosestByClass(target, 'form__add-image-item-none')) {
        this.chooseAvatarHandler(event);
    }
};


ui.UniversalForm.prototype.getFieldIndex = function (target) {
    'use strict';
    var fieldIndex,
        fields = this.element.querySelectorAll('.' + this.formFieldClass),
        currentField = domInterface.getClosestByClass(target, this.formFieldClass);
    fieldIndex = [].slice.apply(fields).indexOf(currentField);
    return fieldIndex;
};

ui.UniversalForm.prototype.toggleAvatarHandler = function (event) {
    'use strict';
    var target = event.target,
        field  = domInterface.getClosestByClass(target, 'form__field');

    domInterface.toggleClass(field, this.addImageClosedClass);

};

ui.UniversalForm.prototype.onKeyDownHandler = function (event) {
    'use strict';
    var self = this,
        target = event.target,
        formField,
        fieldIndex;


    formField = domInterface.getClosestByClass(target, this.formFieldClass);
    fieldIndex = this.getFieldIndex(target);


    setTimeout(function () {
        if (self.model.isValueNew(fieldIndex, target.value)) {
            domInterface.removeClass(formField, self.notValidClass);
            self.model.setValue(fieldIndex, target.value);
        }
    }, 0);
};

ui.UniversalForm.prototype.onClickOutsizeImgListHandler = function (event) {
    'use strict';
    var self = this,
        target = event.target,
        fields = this.element.querySelectorAll('.' + this.addImageFieldClass),
        closestField;

    fields = [].slice.apply(fields);

    closestField = domInterface.getClosestByClass(target, this.addImageFieldClass);
    if (closestField) {
        fields.splice(fields.indexOf(closestField), 1);
    }
    fields.forEach(function (field) {
        domInterface.addClass(field, self.addImageClosedClass);
    });
};

ui.UniversalForm.prototype.chooseAvatarHandler = function (event) {
    'use strict';
    var target    = event.target,
        field     = domInterface.getClosestByClass(target, 'form__field'),
        templates = ui.UniversalForm.templates,
        imgValue  = templates['img-value'],
        indexOfImage,
        li,
        lis,
        src,
        fieldIndex,
        imageBox,
        image;

    lis = domInterface.getClosestByClass(target, 'form__add-image-popup-items').querySelectorAll('.form__add-image-item');
    li = domInterface.getClosestByClass(target, 'form__add-image-item');
    indexOfImage = [].slice.apply(lis).indexOf(li);

    src = types.AvatarURI.images[indexOfImage] || null;

    this.toggleAvatarHandler(event);
    imageBox = field.querySelector('.form__add-current-image');
    image = imageBox.querySelector('.form__add-current-image-img');

    if (!src) {
        domInterface.removeClass(imageBox, this.imageChoosedClass);
        if (image) {
            image.parentNode.removeChild(image);
        }
    } else {
        domInterface.addClass(imageBox, this.imageChoosedClass);
        if (!image) {
            imgValue = imgValue.replace('{{value}}', src);
            imgValue = domInterface.getElementFormHtml(imgValue);
            imageBox.appendChild(imgValue);
        } else {
            image.setAttribute('src', src);
        }
    }

    fieldIndex = this.getFieldIndex(target);
    if (this.model.isValueNew(fieldIndex, src)) {
        domInterface.removeClass(field, this.notValidClass);
        this.model.setValue(fieldIndex, src);
    }

};

ui.UniversalForm.prototype.onChangeHandler = function (event) {
    'use strict';
    var target     = event.target,
        formField  = domInterface.getClosestByClass(target, this.formFieldClass),
        fieldIndex = this.getFieldIndex(target);

    if (!this.model.isValidByFieldIndex(fieldIndex)) {
        domInterface.addClass(formField, this.notValidClass);
    } else {
        domInterface.removeClass(formField, this.notValidClass);
    }
};

ui.UniversalForm.prototype.prebindHandlers = function () {
    'use strict';
    this.onClickHandler               = this.onClickHandler.bind(this);
    this.onClickOutsizeImgListHandler = this.onClickOutsizeImgListHandler.bind(this);
    this.toggleAvatarHandler          = this.toggleAvatarHandler.bind(this);
    this.chooseAvatarHandler          = this.chooseAvatarHandler.bind(this);
    this.onKeyDownHandler             = this.onKeyDownHandler.bind(this);
    this.onChangeHandler              = this.onChangeHandler.bind(this);
};

ui.UniversalForm.prototype.attachDomHandlers = function () {
    'use strict';
    var self = this;
    domInterface.onClick(this.element, this.onClickHandler);
    domInterface.onOutsideClick(null, this.onClickOutsizeImgListHandler);
    this.element.addEventListener('keydown', this.onKeyDownHandler, false);
    this.element.addEventListener('change', this.onChangeHandler, false);
};

ui.UniversalForm.prototype.showAllNotValid = function () {
    'use strict';
    var self = this,
        fields = this.element.querySelectorAll('.' + this.formFieldClass);

    fields = [].slice.apply(fields);
    fields.forEach(function (formField, fieldIndex) {
        if (self.model.isValidByFieldIndex(fieldIndex)) {
            domInterface.removeClass(formField, self.notValidClass);
        } else {
            domInterface.addClass(formField, self.notValidClass);
        }
    });
};

ui.UniversalForm.prototype.attachHandlers = function () {
    'use strict';
    
};

ui.UniversalForm.prototype.setModel = function (newModel) {
    'use strict';
    if (this.model !== newModel) {
        this.model = newModel;
        this.render();
        this.attachHandlers();
    }
};

ui.UniversalForm.prototype.getAvatarHtml = function (typeItem, dataItem) {
    'use strict';
    var templates = ui.UniversalForm.templates,
        imgHtml   = templates['img'],
        imgValue  = templates['img-value'],
        imageList = '',
        src = dataItem[typeItem['name']],
        imageChoosedClass,
        images;

    if (src) {
        imgValue = imgValue.replace("{{value}}", src);
        imageChoosedClass = this.imageChoosedClass;
    } else {
        imgValue = '';
        imageChoosedClass = '';
    }
    imgHtml = imgHtml.replace("{{choosedClass}}", imageChoosedClass);
    imgHtml = imgHtml.replace("{{caption}}", typeItem['caption']);
    imgHtml = imgHtml.replace("{{value}}", imgValue);

    images = types.AvatarURI.images || [];
    images.forEach(function (value) {
        var imgListItemHtml = templates['img-list-item'];
        imageList += imgListItemHtml.replace("{{value}}", value);
    });
    imageList += templates['img-list-item-none'];

    imgHtml = imgHtml.replace("{{imageList}}", imageList);

    return imgHtml;
};

ui.UniversalForm.prototype.render = function () {
    'use strict';
    var self = this,
        templates = ui.UniversalForm.templates,
        model = this.model,
        fieldTypeMatch = {
            'text'         : 'textarea',
            'integer'      : 'input',
            'date'         : 'input',
            'email'        : 'input',
            'longString'   : 'input',
            'mediumString' : 'input',
            'person'       : 'input',
            'phone'        : 'input',
            'time'         : 'input'
        },
        dataTypeStructure,
        dataItem,
        formFieldsHtml,
        html;

    html = templates.main;
    formFieldsHtml = '';

    if (model) {
        dataTypeStructure = model.getDataTypeStructure();
        dataItem = model.getItemData() || {};
        dataTypeStructure.forEach(function (typeItem) {
            var fieldName = typeItem['name'],
                fieldType = typeItem['type'],
                itemHtml  = templates[fieldTypeMatch[typeItem['type']]],
                value     = dataItem[fieldType] || '',
                caption   = typeItem['caption'];

            if (fieldName !== 'id') {
                if (fieldType === 'avatarUri') {
                    formFieldsHtml += self.getAvatarHtml(typeItem, dataItem);
                } else {
                    itemHtml = itemHtml.replace("{{value}}", value);
                    itemHtml = itemHtml.replace("{{caption}}", caption);
                    formFieldsHtml += itemHtml;
                }
            }

        });
    }

    html = html.replace("{{formFields}}", formFieldsHtml);

    this.element.innerHTML = html;
};