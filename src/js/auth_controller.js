var storageDao = new RangrStorageDao();

chrome.extension.onRequest.addListener(requestHandler);

function requestHandler(request, sender, sendResponse) {

	if(request.type == "login") {
		
		// TODO: ajax spinner
		
		console.debug("AuthController: " + request.email_or_username);
		console.debug("AuthController: " + request.password);
		
		$.ajax({
			data: {email_or_username: request.email_or_username, password: request.password},
			dataType: "json",
			type: "post",
			url: "https://forrst.com/api/v2/users/auth",
			success: function(response) {
				console.debug(response)
				storageDao.saveToken(response.resp.token);
				sendResponse({msg: "Successfully logged in!", error: null});
			},
			error: function() {
				sendResponse({msg: null, error: "Invalid email/username or password"});
			}
		});
	}
	
	else if(request.type == "logout") {
		storageDao.removeToken();
		sendResponse({msg: "Successfully logged out!", error: null});
	}

}