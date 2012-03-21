chrome.extension.onRequest.addListener(requestHandler);

var MSG_LOGIN_SUCCESS = "Successfully logged in!";
var MSG_LOGIN_FAILURE = "Invalid email/username or password";
var MSG_LOGOUT_SUCCESS = "Successfully logged out!";

var storageDao = new RangrStorageDao();

function requestHandler(request, sender, sendResponse) {

	if(request.type == "login") {
		
		// TODO: ajax spinner
		
		$.ajax({
			data: {email_or_username: request.email_or_username, password: request.password},
			dataType: "json",
			type: "post",
			url: "https://forrst.com/api/v2/users/auth",
			success: function(response) {
				storageDao.saveToken(response.resp.token);
				sendResponse({msg: MSG_LOGIN_SUCCESS, error: null});
			},
			error: function() {
				sendResponse({msg: null, error: MSG_LOGIN_FAILURE});
			}
		});
	}
	
	else if(request.type == "logout") {
		storageDao.removeToken();
		sendResponse({msg: MSG_LOGOUT_SUCCESS, error: null});
	}

}