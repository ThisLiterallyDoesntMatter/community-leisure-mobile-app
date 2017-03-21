//THIS WILL BE THE MAIN JAVASCRIPT FILE FOR THE APP

/*function getListViewItems() {
    var list = "";

    for(subject in subjects) {
        list += "<li id='" + subjects[subject] + "'>" + subject + "</li>";
    }
    return list;
}*/

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


        //Can't get the <select> to go back to the default option when resetting
        if(document.getElementById('category').value == "vSport" || "vMeetups" || "vEvents" || "vNews") {
            $('category').prop('selectedIndex', 0);
        }
    });



    /*  HOME and BACK button on Add Event page
        When either the Home and Back button is pressed within the Add Event page, the fields on the page will be cleared/
        reset as previously the user would go back to the area and it would be full of the previous data.
     */
    $("#eventHome").on("click", function() {
        clear();
    });
    $("#eventBack").on("click", function() {
        clear();
    });



    $("#submit").on("click", function() {
        var topicElement = document.getElementById('topic'),
            categoryElement = document.getElementById('category'),
            activityElement = document.getElementById('activity'),
            locationElement = document.getElementById('location'),
            timeElement = document.getElementById('time'),
            additionalInfoElement = document.getElementById('additionalInfo'),
            topic = topicElement.value,
            category = categoryElement.value,
            activity = activityElement.value,
            location = locationElement.value,
            time = timeElement.value,
            additionalInfo = additionalInfoElement.value;
        if(topic && category && activity && location && time && additionalInfo) {
            postMessage(topic, category, activity, location, time, additionalInfo);
        }

        //Tests to see if the console message will appears which IT DOES!!!
        if(document.getElementById('category').value == "vSport") {
            console.log("Hello there my name is Sports!");
        }

        if (document.getElementById('category').value == "vMeetups") {
            console.log("Hello there my name is Meet-Ups!");
        }

        if (document.getElementById('category').value == "vEvents") {
            console.log("Hello there my name is Events!");
        }

        if (document.getElementById('category').value == "vNews") {
            console.log("Hello there my name is News!");
        }

        categoryElement.value="";
    });

});
