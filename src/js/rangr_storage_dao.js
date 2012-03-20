function RangrStorageDao() {
	
	var RANGR_ACCESS_TOKEN_KEY = "rangr_access_token";
	
	this.getToken = function() {
	    return localStorage.getItem(RANGR_ACCESS_TOKEN_KEY);
	};
	
	this.saveToken = function(accessToken) {
	    localStorage.setItem(RANGR_ACCESS_TOKEN_KEY, accessToken);
	};
	
	this.removeToken = function(accessToken) {
	    localStorage.removeItem(RANGR_ACCESS_TOKEN_KEY);
	};
	
}