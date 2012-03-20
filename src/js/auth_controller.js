chrome.extension.onRequest.addListener(requestHandler);

function requestHandler(request, sender, sendResponse) {
	if(request.type == "auth"){
		
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
				var storageDao = new RangrStorageDao();
				storageDao.saveToken(response.resp.token);
			}
		});
	}
}