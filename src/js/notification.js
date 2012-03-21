function Notification(iconUrl, title, body) {
	
	var NOTIFICATION_TIMEOUT = 5000;

	this.notification = null;
    this.iconUrl = iconUrl;
    this.title = title;
    this.body = body;
    
    this.build = function() {
    	return this.notification = window.webkitNotifications.createNotification(
			this.iconUrl,
			this.title,
			this.body
  	    );
	};
	
	this.show = function() {
		this.notification.show();
		// TODO: hide notification after set time using: setTimeout(this.hide(), NOTIFICATION_TIMEOUT);
	}
		
	this.hide = function() {
		this.notification.cancel();
	}

}