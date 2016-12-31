/* Nano Templates - https://github.com/trix/nano */
function nano(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
        var keys = key.split("."), v = data[keys.shift()];
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

//Filtering
function filterList(text, listSelector, emptyListSelector) {
    if (emptyListSelector == null)
        emptyListSelector = ".empty-list";

    text = text.toLowerCase();

    var listItems = $(listSelector).find(".mdl-list__item:not(" + emptyListSelector + ")");
    for (let i = 0; i < listItems.length; i++) {
        let item = listItems.eq(i);
        let includes = item.text().toLowerCase().includes(text);
        if (includes) {
            item.show();
        } else {
            item.hide();
        }
    }
}