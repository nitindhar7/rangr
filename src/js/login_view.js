$(document).ready(function(){
	
	UISetup();
	
	$("#login .submit").live('click', function() {
		var data = {
			type: "auth",
			email_or_username: $("#login .box:first").val(),
			password: $("#login .box:last").val()
		}
		
		chrome.extension.sendRequest(data, function(response) {
			alert("sent request");
			if(response.error != null) {
				$("#login .hide").removeClass("hide");
			}
		});
	});
	
});

function UISetup() {
	UIFocusSetup();
}

function UIFocusSetup() {
	$("#login .box:first").focus();
}