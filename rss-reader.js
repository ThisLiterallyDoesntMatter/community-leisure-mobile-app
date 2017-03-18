/**
 * Created by B00291854 on 16/03/2017.
 */

//For the Feed to receive local news, at the moment, the app will be default to the Glasgow area.

$("#newsFeed").bind('click', function() {   //RSS Feed supplied from ENTER HERE
    getFeed("http://feeds.skynews.com/feeds/rss/uk.xml", "newsTitle", "newsList", showFeedItems);   //"http://feeds.bbci.co.uk/news/world/rss.xml");//,
    //"newsTitle", "newsList", showFeedItems);
});

//Following is used to collect the information from the RSS Feeds

function getFeed(url, titleID, listID){
    if(window.navigator.onLine) {
        $.jGFeed(url, function(feeds) {
            // Check for errors
            if(!feeds){
                // there was an error
                return false;
            } else {
                localStorage.setItem(url, JSON.stringify(feeds));
                showFeedItems(titleID, listID, feeds.title, feeds.entries);
            }
        }, 10);
    } else {
        // Get the fall-back...
        var feed = JSON.parse(localStorage.getItem(url));
        if(feed && feed.length > 0) {
            showFeedItems(titleID, listID, feeds.title, feeds.entries);
        }
    }
}

function showFeedItems(titleID, listID, title, items){
    $("#"+titleID).text(title);
    var list = $("#"+listID);
    list.empty();
    for(var index = 0; index < items.length; index += 1) {
        list.append(formatItem(items[index]));
    }
    list.listview("refresh");
}

function formatItem(item) {
    var listItem = document.createElement("li"),
        aa = document.createElement("a");
    aa.setAttribute("href", item.link);
    aa.innerText = item.title;
    listItem.innerHTML = aa.outerHTML;
    return listItem.outerHTML;
}