$(document).ready(UISetup);

var BASE_URI = "http://forrst.com";

// TODO: show default forrst photo if notification doesnt contain user's thumbnail url
function UISetup() {

	setTimeout(function() {
	    window.close();
	}, 10000);
	
	var type = $.url(document.URL).param("type");
	var index = parseInt($.url(document.URL).param("i"));
	var count = parseInt($.url(document.URL).param("count"));
	
	var notification = chrome.extension.getBackgroundPage().getNotification(index);
	
	if(type == "single") {
		$("#thumbnail").attr("src", notification.data.photo);
		
		$("#actor_name").text("@" + notification.data.actor);
		$("#actor_name").live("click", function() {
			chrome.tabs.create({
				url: BASE_URI + notification.data.actor_url
			});
		});
		
		$("#behavior").text(notification.behavior.replace("_"," "));
		
		$("#date").text("( " +  getNotificationTimestamp(notification.timestamp) + ")");
		
		$("#view").text("View " + notification.object_type);
		$("#view").live("click", function() {
			chrome.tabs.create({
				url: BASE_URI + notification.data.object_url
			});
		});
	}
	else if(type == "group") {
		$("#thumbnail").attr("src", "images/forrst-default.jpg");
		
		$("#actor_name").text(count + " Notifications");

		$("#view").text("View Notifications");
		$("#view").live("click", function() {
			chrome.tabs.create({
				url: BASE_URI + "/feed"
			});
		});
	}
	
	$("#dismiss").live("click", function() {
		window.close();
	});

}

// TODO: document me
// TODO: test me
function getNotificationTimestamp(timestamp) {
	var tokens = new Date( timestamp * 1000.0 ).toUTCString().split(" ");
	return tokens[1] + " " + tokens[2];
}