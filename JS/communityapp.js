//THIS WILL BE THE MAIN JAVASCRIPT FILE FOR THE APP

function getListViewItems() {
    var list = "";

    for(subject in subjects) {
        list += "<li id='" + subjects[subject] + "'>" + subject + "</li>";
    }
    return list;
}

function clear() {
    //This function will allow the user to clear all fields in the Add Entry page and start from scratch!

    /*
        What has to be reset:
            Topic ✓
            Category X - Can't get the <select> tag to reset, even after using appropriate code
            Activity ✓
            Location ✓
            Time ✓
            Additional Information ✓
     */

    $("#topic").val("");
    $("#activity").val("");
    $("#location").val("");
    $("#time").val("");
    $("#additionalInfo").val("");

}

$(document).ready(function() {
    /*
        When the CLEAR button is pressed on the Add Entry page, it will reset all the current fields allowing the user
        to start from scratch!
     */
    $("#clear").on("click", function() {
        clear();
    });

});
