chrome.extension.onRequest.addListener(requestHandler);

var notifications = [];

function requestHandler(request, sender, sendResponse) {
	
	if(request.type == "auth") {
		actionNotify();
	}
	
}

// TODO: refactor me
function actionNotify() {

	var NOTIFICATIONS_GROUP_THRESHOLD = 2;
	
	var storageDao = new RangrStorageDao();
	var token = storageDao.getToken();
	var notificationsCount = 0;
	
	notifications = [];

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
				
				notificationsCount = 2;

				if(notificationsCount == 0 || notificationsCount > NOTIFICATIONS_GROUP_THRESHOLD) {
					// TODO: refactor me - same call, but with different 'type=group'
					var notification = new Notification('images/ajax-loader.gif', '', notificationsCount + ' notifications found').build();
					notification.show();
				}
				else {
					for(var i = 0; i < notificationsCount; i++) {
//								   'post_url=' + notifications[key].data.object_url;

						webkitNotifications.createHTMLNotification('notification_view.html?type=single&i=' + i).show();
						break;
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
		alert("not logged in!");
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