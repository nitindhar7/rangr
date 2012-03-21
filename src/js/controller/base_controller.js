actionSetup();

function actionSetup() {

	var NOTIFICATIONS_GROUP_THRESHOLD = 2;
	
	var storageDao = new RangrStorageDao();
	var token = storageDao.getToken();
	var notifications = [];
	var notificationsCount = 0;

	if(token != null) {
		$.ajax({
			data: {access_token: token, grouped: true},
			dataType: "json",
			type: "get",
			url: "https://forrst.com/api/v2/notifications",
			success: function(response) {
				// TODO: what happens where there is no notification?
				for(item in response.resp.items) {
					for(notification in response.resp.items[item]) {
						notifications.push(response.resp.items[item][notification]);
						notificationsCount++;
					}
				}
				
				notificationsCount = 2;

				if(notificationsCount == 0 || notificationsCount > NOTIFICATIONS_GROUP_THRESHOLD) {
					var notification = new Notification('images/ajax-loader.gif', '', notificationsCount + ' notifications found').build();
					notification.show();
				}
				else {
					var i = 0;
					for(key in notifications) {
						i++; if (i > 2) break;
						
						// TODO: show default forrst photo if notification doesnt contain user's thumbnail url
						var notification = new Notification(notifications[key].data.photo, 
															notifications[key].object_type + ' ' + notifications[key].behavior, 
															' @' + notifications[key].data.actor
															).build();
						notification.onclick = function() {
							chrome.tabs.create({url: 'http://forrst.com' + notifications[key].data.object_url})
							notification.cancel();
						};
						notification.show();
						console.log(notifications[key]);
					}
				}
			},
			error: function() {
			}
		});
	}
	else {
		alert("not logged in!");
	}
	
}