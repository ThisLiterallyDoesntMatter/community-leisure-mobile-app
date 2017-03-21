// Initialize Firebase
var config = {
        apiKey: "AIzaSyBtj7RK9kAz0d-kxziBY5TmokHuc-Hv-vQ",
        authDomain: "community-leisure-mobile-app.firebaseapp.com",
        databaseURL: "https://community-leisure-mobile-app.firebaseio.com",
        storageBucket: "community-leisure-mobile-app.appspot.com",
        messagingSenderId: "718224208663"
    };
firebase.initializeApp(config);


/*var fb = new Firebase("https://community-leisure-mobile-app.firebaseio.com/"),
    fbMessages = fb.child("/messages");
messages_area = document.getElementById("messages");

if (fb) {
    //This gets a reference to the 'location' node.
    var fbMessages = fb.child("/messages");
    //Now we can install event handlers for nodes added, changed and removed.
    fbMessages.on('child_added', function(snapshot){
        var data = snapshot.val();
        console.dir({'added': data});
    });
}

function postMessage(topic, category, activity, location, time, additionalInfo) {
    fbMessages.push({
        topic: topic,
        category: category,
        activity: activity,
        location: location,
        time: time,
        additionalInfo: additionalInfo,
        timestamp: Firebase.ServerValue.TIMESTAMP
    });
}

function showMessage(key, data){
    messages_area.appendChild(formatMessage(key, data));
}

//COME BACK HERE TO APPROPRIATELY FORMAT THE OUTPUT
function formatMessage(key, data){
    var li = document.createElement("li");
    li.innerHTML = "<h3>" + data.topic + "</h3><p>" + data.activity + "</p>";
    //li.innerHTML = "<h1>" + data.topic + "</h1><p>" + data.category + data.activity + data.location + data.time + data.additionalInfo + "</p>" + "</li>";
    //li.innerHTML = "<h3>" + data.message + "</h3><p>Posted by:" + data.topic + "</p>";
    li.setAttribute("id", key);
    return li;
}

fbMessages.on('child_added', function (snapshot) {
    var data = snapshot.val(),
        key = snapshot.key();
    console.dir({'added': data});
    messages[key] = data;
    showMessage(key, data);
});*/

/*document.getElementById('btnSubmit').addEventListener('click', function() {
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
    categoryElement.value="";
});*/
