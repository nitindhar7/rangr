/* GA TRACKING START */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-17328502-6']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
/* GA TRACKING END */

chrome.extension.onRequest.addListener(requestHandler);

var NOTIFICATION_TIMEOUT_MILLIS = 1000 * 60 * 15;

var notifications = [];
var notificationsCount = 0;

function requestHandler(request, sender, sendResponse) {
	
	if(request.type == "auth") {
		actionNotify();
		self.setInterval("actionNotify()", NOTIFICATION_TIMEOUT_MILLIS);
	}
	
}

// TODO: refactor me
function actionNotify() {

	var NOTIFICATIONS_GROUP_THRESHOLD = 2;
	
	var storageDao = new RangrStorageDao();
	var token = storageDao.getToken();
	
	notifications = [];
	notificationsCount = 0;

	if(token != null) {
		$.ajax({
			data: {access_token: token, grouped: true},
			dataType: "json",
			type: "get",
			url: "https://forrst.com/api/v2/notifications",
			success: function(response) {
				// TODO: what happens when there is no notification?
				// TODO: refactor me
				for(item in response.resp.items) {
					for(notification in response.resp.items[item]) {
						notifications.push(response.resp.items[item][notification]);
						notificationsCount++;
					}
				}

				if(notificationsCount == 0 || notificationsCount > NOTIFICATIONS_GROUP_THRESHOLD) {
					webkitNotifications.createHTMLNotification('notification_view.html?type=group&i=' + i + '&count=' + notificationsCount).show();
				}
				else {
					for(var i = 0; i < notificationsCount; i++) {
						webkitNotifications.createHTMLNotification('notification_view.html?type=single&i=' + i + '&count=' + notificationsCount).show();
					}
				}
			},
			error: function() {
				// TODO: handle me
			}
		});
	}
	else {
		// FIXME: handle more gracefully
		alert("You are not logged in!");
	}
	
}

// TODO: document me
// TODO: test me
function writeToLog(data) {
	console.log(data);
}

// TODO: document me
// TODO: test me
function getNotification(i) {
	return notifications[i];
}

function getNotificationsCount() {
	return notificationsCount;
}