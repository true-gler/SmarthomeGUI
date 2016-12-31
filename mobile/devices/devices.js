//Load data
$(document).ready(() =>
    createListFromFile("#device-list", ".template > li", "devices.json")
);

//Filtering
$("#device-filter").keyup(onFilterChanged);
$("#device-filter").change(onFilterChanged);
function onFilterChanged(evt) {
    var text = $(evt.target).val();
    filterList(text, "#device-list");
}

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