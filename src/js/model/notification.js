//chrome.tabs.create({url: 'http://forrst.com' + this.notificationUrl});

function Notification(notificationUrl, iconUrl, title, body) {
	
	this.notificationUrl = notificationUrl;
    this.iconUrl = iconUrl;
    this.title = title;
    this.body = body;
    
    this.push = push;
    this.hide = hide;

    this.notification = window.webkitNotifications.createNotification(
		this.iconUrl,
		this.title,
		this.body
    );
    
    this.notification.ondisplay = onPostDisplay(this);
}

function onPostDisplay(obj) {
}

function push() {
	this.notification.show();
}

function hide() {
	this.notification.cancel();
}