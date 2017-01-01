/* Nano Templates - https://github.com/trix/nano */
function nano(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
        var keys = key.split("."),
            v = data[keys.shift()];
        for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
        return (typeof v !== "undefined" && v !== null) ? v : "";
    });
}
/*End Nano Templates */


//THX to http://stackoverflow.com/a/6860916
function guidGenerator(noTrailingUnderscore) {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    var guid = (noTrailingUnderscore ? "" : "_") + (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    return guid;
}

function createListFromFile(listSelector, templateSelector, dataFilePath) {
    return readDataFile(dataFilePath)
        .then(result => createListFromData(listSelector, templateSelector, result));
}

function createListFromData(listSelector, templateSelector, data) {
    var listElement = $(listSelector);
    var templateElement = $(templateSelector);

    if (templateElement == null || !templateElement.length)
        return; //No element found

    var templateStr = templateElement[0].outerHTML;

    for (let element of data) {
        //MDL needs an unique id for each inpute element. Create a random GUID
        element.templateId = guidGenerator();

        let filledTemplate = nano(templateStr, element);
        listElement.append(filledTemplate);
    }
}

function readDataFile(dataFilePath) {
    return new Promise(function (resolve, reject) {
        $.getJSON(dataFilePath).done(resolve).fail(reject);
    });
}

function getListItems(listSelector, emptyListSelector) {
    if (emptyListSelector == null)
        emptyListSelector = ".empty-list";

    return $(listSelector).find(".mdl-list__item:not(" + emptyListSelector + ")");
}

//Filtering
function filterList(text, listSelector, itemTextFunction, emptyListSelector) {
    if (itemTextFunction == null)
        itemTextFunction = (x => x.text());

    text = text.toLowerCase();

    var listItems = getListItems(listSelector, emptyListSelector);
    for (let i = 0; i < listItems.length; i++) {
        let item = listItems.eq(i);
        let itemText = itemTextFunction(item);
        let includes = itemText.toLowerCase().includes(text);
        if (includes) {
            item.show();
        } else {
            item.hide();
        }
    }
}

//Sorting
function sortByName(listSelector, textSelector) {
    if (textSelector == null)
        textSelector = ".name";

    sortList(listSelector, (x, y) => {
        return $(x).find(textSelector).text().toLowerCase().localeCompare($(y).find(textSelector).text().toLowerCase());
    })
}

function sortList(listSelector, comparerFunction) {
    var elements = getListItems(listSelector);
    elements.sort(comparerFunction);

    //Sorting is done via flexbox "order" attribute
    for (let i = 0; i < elements.length; i++) {
        let element = elements.eq(i);
        element.css("order", i);
    }
}