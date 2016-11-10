/*jslint todo : true, sub : true */
/*globals global, ui, console, dataTypesHash, document, TypifiedListModel, initializingData, DetailedList, dataTypes,
  imagesType, XMLHttpRequest, XDomainRequest, TypifiedItemModel, types */

(function () {
    'use strict';
    function ready() {
        var detailedList,
            listModel,
            itemModel,
            addButton,
            showListButton,
            dataTypeSelect,
            selectDataTypes,
            universalForm,
            currentDataType,
            newItemHash = {},
            listData = initializingData;

        global.appData = {
            newItemHash : newItemHash,
            listData    : listData
        };

        selectDataTypes = dataTypes.map(function (typeItem) {
            return {
                'value'   : typeItem['name'],
                'caption' : typeItem['caption']
            };
        });

        dataTypeSelect = new ui.Select(document.querySelector('.data-type-select'), {
            'options'        : selectDataTypes,
            'defaultCaption' : 'Choose data type'
        });

        function applyItemEdit() {
            itemModel = new TypifiedItemModel(newItemHash[currentDataType], dataTypesHash[currentDataType], listModel);
            universalForm.setModel(itemModel);
        }

        function clearItemEdit() {
            newItemHash[currentDataType] = {};
            applyItemEdit();
        }

        function createDetailedList() {
            detailedList = new ui.DetailedList(document.querySelector('.current-data-type-list'), {
                'model' : listModel
            });
        }
        function updateDetailedList() {
            detailedList.setModel(listModel);
        }

        dataTypeSelect.on('changed', function (event) {
            var value = event.value;

            currentDataType = value;

            listModel = new TypifiedListModel(listData[value], dataTypesHash[value]);

            showListButton.toShowMode();
            if (value) {
                showListButton.show();
                addButton.show();
            } else {
                showListButton.hide();
                addButton.hide();
            }
            if (detailedList) {
                detailedList.hide();
            }

            if (!newItemHash[currentDataType]) {
                newItemHash[currentDataType] = {};
            }
            applyItemEdit();
        });

        addButton = new ui.Button(document.querySelector('.add-record-button'), {
            'caption' : 'Add'
        });
        addButton.on('clicked', function () {
            var data;

            if (itemModel.isValid()) {
                data = itemModel.getItemData();
                listModel.addNewElement(data);
                clearItemEdit();
            } else {
                universalForm.showAllNotValid();
            }

        });
        addButton.hide();



        showListButton = new ui.DisplayButton(document.querySelector('.show-list-button'), {
            'showCaption' : 'Show list',
            'hideCaption' : 'Hide list'
        });
        showListButton.on('clicked', function (event) {
            if (event['action'] === 'show') {
                if (!detailedList) {
                    createDetailedList();
                }
                updateDetailedList();
                detailedList.show();
                showListButton.toHideMode();
            } else if (event['action'] === 'hide') {
                detailedList.hide();
                showListButton.toShowMode();
            }
        });
        showListButton.hide();

        universalForm = new ui.UniversalForm(document.querySelector(".typified-current-data-type-form"), {
            'model'  : null
        });

    }

    document.addEventListener("DOMContentLoaded", ready);
}());