const removeDelay = 1500; //ms

//Load data
$(document).ready(() =>
    createListFromFile("#overview-list", ".template > li", "overviewList.json")
);

//Click listeners for switching off devices
$(document).on("click", "input", evt => removeListEntryAfterDelay(evt.target));

function removeListEntryAfterDelay(inputElement) {
    var $input = $(inputElement);
    var switchOn = isSwitchOn($input);

    //This is called before switching off, so check for switch on
    if (switchOn)
        setTimeout(() => {
            if (isSwitchOn($input)) //Was it switched on again?
                return;
            $input.closest(".mdl-list__item").remove();
        }, removeDelay);
}

function isSwitchOn(inputElement) {
    var $input = inputElement instanceof jQuery ? inputElement : $(inputElement);
    var $label = $input.closest(".mdl-switch");

    return $label.hasClass("is-checked");
}
