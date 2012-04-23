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

$(document).ready(UISetup);

var BASE_URI = "http://forrst.com";
var storageDao = new RangrStorageDao();

function UISetup() {
	UIDisplaySetup();
	UIFocusSetup();
	UIBindingSetup();
}

function UIDisplaySetup() {
	if(storageDao.hasToken()) {
		$("#nav-button-logout").show();
		$("#content").hide();
		$("#login").css('height', '70px');
	}
	else {
		$("#nav-button-signup").show();
		$("#byline").show();
		$("#login-form").show();
	}
}

function UIFocusSetup() {
	if(storageDao.hasToken()) {
	}
	else {
		$("#login .box:first").focus();
	}
}

function UIBindingSetup() {
	if(storageDao.hasToken()) {
		$("#nav-button-logout").live('click', actionLogout);
		actionTriggerNotify();
	}
	else {
		$("#login .submit").live('click', actionLogin);
		$("#nav-button-signup").live('click', actionSignup);
	}
}

function showMessage(text) {
	$("#message").show();
	$("#message").text(text);
}

function actionLogout() {
	$("#nav-spinner").show();
	
	var logout = {
		type: "logout"
	}
	
	// TODO: close any open notification windows
	
	chrome.extension.sendRequest(logout, function(response) {
		if(response.error != null)
			showMessage(response.error);
		else {
			window.close();
		}
	});
}

function actionLogin() {
	$("#nav-spinner").show();
	
	var data = {
		type: "login",
		email_or_username: $("#login .box:first").val(),
		password: $("#login .box:last").val()
	}
	
	chrome.extension.sendRequest(data, function(response) {
		$("#nav-spinner").hide();
		if(response.error != null)
			showMessage(response.error);
		else {
			chrome.extension.sendRequest({type: "auth"}, function(response) {
				
			});
			window.close();
		}
	});
}

function actionSignup() {
	chrome.tabs.create({
		url: BASE_URI + "/signup"
	});
}

function actionTriggerNotify() {
	chrome.extension.sendRequest({type: "auth"}, function(response) {
		if(response.error != null)
			showMessage(response.error);
		else {
			window.close();
		}
	});
}