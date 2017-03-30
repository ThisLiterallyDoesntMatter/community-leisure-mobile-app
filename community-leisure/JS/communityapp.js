/**
 * Created by Muthar, Scott & Alan on 19/02/2017.
 */


//THIS WILL BE THE MAIN JAVASCRIPT FILE FOR THE APP

//Any Global Variables
var database;
var messages_node;

//Elements for ADDING
var topic;
var category;
var activity;
var locat;
var time;
var additional_info;

//Elements for EDITING
var edit_topic;
var edit_activity;
var edit_location;
var edit_time;
var edit_additional_info;

var edit = {};
var update_edit = {};


window.onload = function() {
    // Initialize Firebase firebase.google.com
    var config = {
        apiKey: "AIzaSyBtj7RK9kAz0d-kxziBY5TmokHuc-Hv-vQ",
        authDomain: "community-leisure-mobile-app.firebaseapp.com",
        databaseURL: "https://community-leisure-mobile-app.firebaseio.com",
        storageBucket: "community-leisure-mobile-app.appspot.com",
        messagingSenderId: "718224208663"
    };
    firebase.initializeApp(config);
    database = firebase.database();
    messages_node = database.ref('/messages/');

    //Referring to HTML to add elements
    topic = document.getElementById('topic');
    category = document.getElementById('category');
    activity = document.getElementById('activity');
    locat = document.getElementById('location');
    time = document.getElementById('time');
    additional_info = document.getElementById('additionalInfo');

    //Referring to the HTML to EDIT elements, similar to how it's done above for adding
    //Not going to allow the user to edit the category
    edit_topic = document.getElementById('edit_topic');
    edit_activity = document.getElementById('edit_activity');
    edit_location = document.getElementById('edit_location');
    edit_time = document.getElementById('edit_time');
    edit_additional_info = document.getElementById('edit_additional_info');

    /*
        We want to gather that data from the database so that it will give us the ability to post to different sections
        within the categories
     */
    update_mesg_board("football");
    update_mesg_board("basketball");
    update_mesg_board("athletics");
    update_mesg_board("field_hockey");
    update_mesg_board("tennis");
    update_mesg_board("dating");
    update_mesg_board("interests");
    update_mesg_board("holiday_events");
    update_mesg_board("concerts");
    update_mesg_board("celebrity");
    update_mesg_board("politics");

    /*
        When the CLEAR button is pressed on the Add Entry page, it will reset all the current fields allowing the user
        to start from scratch!
     */
    $("#clear").on("click", function() {
        clear();
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
};

function submit () {
    //Pre-cautions for the user, they must enter a certain value in the fields/ select form to continue!
    //In terms of the Additional Information, felt it was appropriate not to add one as the user already has a character limit set

    if (topic.value.length >= 1) {
        alert("Event has been submitted to appropriate category!");
    }


    if (topic.value.length == 0) {
        alert("Enter a Topic.");
        return;
    }

    //unsure about the category element, do I just say
    //if (categoryElement.selectedIndex == 0)?

    if (activity.value.length == 0) {
        alert("Enter an Activity.");
        return;
    }

    if (locat.value.length == 0) {
        alert("Enter a Location.");
        return;
    }

    if (time.value.length != 5) { //The reason this is 'not equal to 5'; when using the type="time" it uses 5 characters
        alert("Enter the Time in appropriate format (HH:MM)");
        return;
    }


    // Convert string to lower case and spaces to underscores for consistency
    var category_value = category.options[category.selectedIndex].text.toLowerCase().replace(/ /g, "_");

    // Get a reference to the relative place we want to submit a record to e.g. /messages/football/
    var category_node = messages_node.child(category_value);

    var eventData = {
        topic: topic.value,
        activity: activity.value,
        location: locat.value,
        time: time.value,
        additionalInfo: additionalInfo.value
    };

    // Send the data to be stored under a random key
    category_node.push(eventData);

    // Update the relative message board
    add_to_msg_board(category_value + "_msg_board", eventData);
}

function clear() {
    //This function will allow the user to clear all fields in the Add Entry page and start from scratch!
    /*
     What has to be reset:
     Topic ✓
     Category ✓/X - This is working and not working at the same time, can't get it to reset when Clear is pressed
     Activity ✓
     Location ✓
     Time ✓
     Additional Information ✓
     */

    //Resets values to null
    $("#topic").val("");
    $("#category").selectedIndex = 0;
    $("#activity").val("");
    $("#location").val("");
    $("#time").val("");
    $("#additionalInfo").val("");
}

function add_to_msg_board(msg_board_name, msg, category, key) {
    // Basically this function adds the event being posted to the message board and in the appropriate layout as displayed below.

    var msg_board = document.getElementById(msg_board_name);

    //Using the header, paragraph and the button this makes it much more efficient when wanting to display the data so it isn't cluttered
    var h_tag_start = "<h2 class='ui-li-heading'>";
    var h_tag_end = "</h2>";

    var p_tag_start = "<p class='ui-li-desc'>";
    var p_tag_end = "</p>";

    var button_delete = "<div class='delete-button' onclick='delete_msg(\"" + category + "\", \"" + key + "\", this);'>Delete Post</div>";

    var button_edit = "<div class='edit-button' onclick='edit_msg(\"" + category + "\", \"" + key + "\", this);'>Edit Post</div>";

    var li = document.createElement("li");
    // Makes the this li element rounded on the bottom
    li.className = "ui-li ui-li-static ui-btn-up-b ui-last-child";
    li.innerHTML += button_delete;
    li.innerHTML += button_edit;
    li.innerHTML += h_tag_start + "Topic" + h_tag_end + p_tag_start + msg.topic + p_tag_end + h_tag_start + "Activity" + h_tag_end + p_tag_start + msg.activity + p_tag_end
                + h_tag_start + "Location" + h_tag_end + p_tag_start + msg.location + p_tag_end + h_tag_start + "Time" + h_tag_end + p_tag_start + msg.time + p_tag_end
                + h_tag_start + "Additional Info" + h_tag_end + p_tag_start + msg.additionalInfo + p_tag_end;

    // Makes the last li element not rounded on the bottom
    if (msg_board.firstChild) {
        msg_board.lastChild.className = "ui-li ui-li-static ui-btn-up-b";
    }
    msg_board.appendChild(li);
}

function update_mesg_board(board_name) {
    // Get the all records under a perticular board node like "football"
    messages_node.child(board_name).once('value').then(function(snapshot) {
        // For each child record add it to the board as list item '<il>'
        snapshot.forEach(function(childSnapshot) {
            add_to_msg_board(board_name + "_msg_board", childSnapshot.key, childSnapshot.val());
        });
    });
}

function delete_msg(category_id, msg_name, button) {
    //First of all, when the delete button is pressed, we want to remove that post from the mobile app AND from Firebase

    //similar to how we done the update I think
    messages_node.child(category_id + "/" + msg_name).remove(); //this should remove the post from Firebase

    var msg = button.parentElement;
    var msg_board = msg.parentElement;

    msg_board.removeChild(msg);
    msg_board.lastChild.className = "ui-li ui-li-static ui-btn-up-b";
    //msg_board.lastElementChild.className = "ui-li ui-li-static ui-btn-up-b"; // wrong state used not lastElementChild...

    //Going to go back to the add_msg_board, to help further implement
}

function edit_msg(category, msg_name, button) {

    edit.category = category;
    edit.msg_name = msg_name;

    //if we get the all the elements that are displayed within the <p> we can then individually split those elements up giving them separate indexes
    var msg_elements = button.parentElement.getElementsByTagName("p");

    edit.topic = msg_elements[0];
    edit.activity = msg_elements[1];
    edit.location = msg_elements[2];
    edit.time = msg_elements[3];
    edit.additional_info = msg_elements[4];

    location.href = "#editEvent";
}

/*
    For when the user wants to re-submit an edit they have made, it's obviously going to be different to the way the
    original submit() works because we want it to replace. The following code be quick repetitive but it works as it should.
 */
function submit_edit() {
    //Same idea as before, first we want to call the precautions for the user so that they aren't leaving any fields blank
    if (edit_topic.value.length == 0) {
        alert("Enter a Topic.");
    }

    if (edit_topic.value.length >= 1) {
        alert("Event has been edited!");
    }

    if (edit_activity.value.length == 0) {
        alert("Enter an Activity.");
        return;
    }

    if (edit_location.value.length == 0) {
        alert("Enter a Location.");
        return;
    }

    if (edit_time.value.length != 5) { //The reason this is 'not equal to 5'; when using the type="time" it uses 5 characters
        alert("Enter the Time in appropriate format (HH:MM)");
        return;
    }

    //Now we want to actually update that edit appropriately
    if (edit_topic.value != edit.topic.innerHTML) {
        update_edit.topic = edit_topic.value;
        edit.topic.innerHTML = edit_topic.value;
    }

    if (edit_activity.value != edit.activity.innerHTML) {
        update_edit.activity = edit_activity.value;
        edit.activity.innerHTML = edit_activity.value;
    }

    if (edit_location.value != edit.location.innerHTML) {
        update_edit.location = edit_location.value;
        edit.location.innerHTML = edit_location.value;
    }

    if (edit_time.value != edit.time.innerHTML) {
        update_edit.time = edit_time.value;
        edit.time.innerHTML = edit_time.value;
    }

    if (edit_additional_info.value != edit.additional_info.innerHTML) {
        update_edit.additional_info = edit_additional_info.value;
        edit.additional_info.innerHTML = edit_additional_info.value;
    }

    /*category_node = messages_node.child(edit.category);
    category_node.child(edit.msg_name).update(update_edit);
    category_node.push(update_edit);*/

    var category_node = messages_node.child(edit.category);
    category_node.child(edit.msg_name).update(update_edit);

    alert("Message Board has been edited!");
}

/*
    For logging in the app, we used the Authenticate section on Firebase where we added a certain email and password
    that allowed us only log in the app with certain credentials.

    The following code is basically validating the data that is being entered, then giving you a message if the data is
    wrong. Please note; code for validation is available on https://firebase.google.com/docs/auth/web/password-auth
 */

function login_attempt() {
    //Get the values of the email and password
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email.length <= 0) {
        alert("Enter an email.");
        return;
    }

    if (password.length <= 0) {
        alert("Enter a password.");
        return;
    }

    //When a user signs in what happens and what happens if it fails
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
        location.href = "#home";
    })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === "auth/wrong-password") {
                alert("Wrong Password.");
            }

            if (errorCode === "auth/invalid-email") {
                alert("Invalid Email.");
            }
        })


}
