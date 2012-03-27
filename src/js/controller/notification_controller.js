$(document).ready(UISetup);

// TODO: show default forrst photo if notification doesnt contain user's thumbnail url
function UISetup() {

//	setTimeout(function() {
//	    window.close();
//	}, 10000);
	
	var index = parseInt($.url(document.URL).param("i"));
	var notification = chrome.extension.getBackgroundPage().getNotification(index);
	
	$("#thumbnail").attr("src", notification.data.photo);
	$("#title").text(notification.behavior.replace("_"," ") + ' - ' + notification.object_type);
	$("#body").text('@' + notification.data.actor);

}