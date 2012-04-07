$(document).ready(UISetup);

var BASE_URI = "http://forrst.com";

function UISetup() {
	
	// TODO: check if user logged in and show appropriate UI based on that
	
	$("#login .submit").live('click', actionLogin);
	$("#nav-button-signup").live('click', actionSignup);
	
	UIFocusSetup();
}

function UIFocusSetup() {
	$("#login .box:first").focus();
}

function showMessage(text) {
	$("#message").show();
	$("#message").text(text);
}

function actionLogout() {
	var logout = { type: "logout" }
	chrome.extension.sendRequest(logout, function(response) {
		if(response.error != null)
			showMessage(response.error);
		else {
			$("#logout").hide();
			showMessage(response.msg);
		}
	});
}

// FIXME: change UI if user already logged in
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