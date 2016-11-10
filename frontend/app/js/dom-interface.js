/*jslint todo : true, sub : true*/
/*global document, Modernizr */

var domInterface = (function () {
    'use strict';
    var domInterface = {},
        isTouch      = Modernizr.touchevents;

    domInterface.getIndexOfElementContains = function (elements, target, className) {
        var index,
            length = elements.length,
            capturedByClass;


        for (index = 0; index < length; index += 1) {
            capturedByClass = elements[index].querySelector('.' + className);
            if (capturedByClass === target) {
                break;
            }
        }
        return index;
    };

    domInterface.getElementFormHtml = function (html) {
        var element = document.createElement('div');
        element.innerHTML = html;
        return element.firstChild;
    };

    domInterface.appendByIndex = function (listBox, index, itemHtml) {
        var item,
            nextSibling;
        if (!listBox.childNodes.length) {
            listBox.innerHTML = itemHtml;
        } else {
            nextSibling = listBox.childNodes[index];
            item = domInterface.getElementFormHtml(itemHtml);
            if (nextSibling) {
                listBox.insertBefore(item, nextSibling);
            } else {
                listBox.appendChild(item);
            }
        }
    };

    domInterface.getIndexOf = function (element) {
        var index = 0;
        while ((element = element.previousSibling) !== null) {
            index += 1;
        }
        return index;
    };

    domInterface.removeClass = function (element, removeClass) {
        if (domInterface.hasClass(element, removeClass)) {
            element.className = element.className.replace(removeClass, '').trim();
        }
    };

    domInterface.addClass = function (element, addClass) {
        if (!domInterface.hasClass(element, addClass)) {
            element.className += ' ' + addClass;
        }
    };

    domInterface.toggleClass = function (element, toggleClass) {
        var currentClass   = element.className,
            toggleClassReg = new RegExp(toggleClass),
            newClass;
        if (domInterface.hasClass(element, toggleClass)) {
            newClass = currentClass.replace(toggleClassReg, '').trim();
        } else {
            newClass = (currentClass + ' ' + toggleClass).trim();
        }
        element.className = newClass;
    };

    domInterface.hasClass = function (element, className) {
        var classNameReg = new RegExp("(:?\\s|^)" + className + "(:?\\s|$)");
        return classNameReg.test(element.className);
    };

    domInterface.getClosestByClass = function (element, className) {
        while (element) {
            if (domInterface.hasClass(element, className)) {
                break;
            }
            element = element.parentNode;
        }
        return element;
    };

    domInterface.getClosestByElement = function (element, factorElement) {
        while (element) {
            if (element === factorElement) {
                break;
            }
            element = element.parentNode;
        }
        return element;
    };


    domInterface.onClick = function (element, callback) {
        if (isTouch) {
            (function () {
                var target = null;
                element.addEventListener('touchstart', function (event) {
                    target = event.target;
                }, false);
                element.addEventListener('touchend', function (event) {
                    if (event.target === target) {
                        callback(event);
                    }
                    target = null;
                }, false);
            }());
        } else {
            element.addEventListener('click', callback, false);
        }
    };

    domInterface.onOutsideClick = function (element, callback) {
        if (isTouch) {
            (function () {
                var target = null;
                document.addEventListener('touchstart', function (event) {
                    target = event.target;
                }, false);
                document.addEventListener('touchend', function (event) {
                    if (event.target === target && !domInterface.getClosestByElement(target, element)) {
                        callback(event);
                    }
                    target = null;
                }, false);
            }());
        } else {
            document.addEventListener('click', function (event) {
                var target = event.target;
                if (!domInterface.getClosestByElement(target, element)) {
                    callback(event);
                }
            }, false);
        }
    };

    return domInterface;
}());