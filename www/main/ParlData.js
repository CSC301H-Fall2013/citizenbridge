/****************************************************************
 * 																*
 * The source of this file is http://parliamentdata.ca/example/	*
 * 																*
 ****************************************************************/


// Create the global variable for calling anywhere
var ParlData = ParlData || {};

(function () {
    "use strict";

	// Begin creation of the object and it’s methods. You may add to this where you see appropriate
	// All of which would in turn use the apiCall method to do the request but would require far less coding
	// later when requiring all the other requests.
    ParlData = function () {
    
	    // A little self referencing for internal functionality
    	self = this;
    	
    	this.apiURI = 'http://api.parliamentdata.ca/';

		/***
		 * apiCall
		 * ParlData.apiCall( url, onSuccess [, onError] )
		 *
		 *	@param		str		url			
		 *						The external URL to call
		 *						
		 *	@param		fun		onSuccess(response)
		 *						Callback to perform on success. The variable response is the object
		 *						returned from the API call.
		 *
		 *	@param		fun		onError		(Optional) Callback to perform on loading error
		 */
        this.apiCall = function (url, onSuccess, onError) {
        
        	// Set a couple of callback defaults for testing purposes and getting started
        	onSuccess	= onSuccess	|| function (resonse) { console.log(resonse); };
        	onError		= onError	|| function (resonse) { console.log(resonse); };
        
        	// Set a base callback function that will be unique based upon the timestamp
            var callbackName = 'callback' + new Date().getTime(),
            
            	// Create a new script tag to use as a loading container
                crossSiteDOM = document.createElement('script');

			// Set the new callback function to the global object to match that of what was requested
            self[callbackName] = onSuccess;
			
			// Set an event listener to the script loading that will remove the DOM element from the body as well as from
			// the javascript DOM
            crossSiteDOM.onload = function () {
                crossSiteDOM.parentNode.removeChild(crossSiteDOM);
                delete self[callbackName];
            };

			// Set the event listener to the error callback
            crossSiteDOM.onerror = onError;

			// If the URL already contains GET variables, only an ampersand is required
            url += (url.indexOf('?') >= 1) ? '&' : '?';

			// Append the callback to the URI as a GET variable (often used in external API calls)
            crossSiteDOM.src = url += 'callback=ParlData.' + callbackName;

			// Append the script element to the body of the document.
            document.getElementsByTagName('body')[0].appendChild(crossSiteDOM);
           
        };
        
        this.specificCall = function (type, requestIDs, customData, onSuccess, onError) {
	        
	        // Setup the request URL variable
        	var requestURL;

			// Update the custom data request if it was provided, otherwise, use the custom data as a callback if it was a function
        	switch (typeof customData) {
        	case 'function':
	        	onError = onSuccess;
	        	onSuccess = customData;
	        	customData = null;
	        	break;

	        // If the customData is undefined and there are billIDs, set the data to all in order to capture all the bill data
	        case 'undefined':
	        	if(requestIDs && typeof requestIDs !== 'function') customData = 'all';
        	}
        
			// Update the callbacks based upon the type of the billIDs type, functions become the callback
	        switch (typeof requestIDs) {
	        case 'function':
	        	onSuccess = requestIDs;
	        	requestIDs = null;
	        break;
		    case 'object':
		    case 'array':
		    	requestIDs = requestIDs.join(',');
		    	break;
	        }
	        
	        // Set the URL to the appropriate method class
	        requestURL = self.apiURI + type;
	        
	        // Add the billIDs if they are set
	        requestURL += (requestIDs) ? '/' + requestIDs : '';
	        
	        // Set the variable if they are set
	        requestURL += (customData) ? '/' + customData : '';
	        
	        // Perform the request using the provided callbacks
	        self.apiCall(requestURL, onSuccess, onError);
	        
        };
        
        // Simplified method for capturing the bills, both singular and multiple
        this.bbls = this.bills = function (billIDs, customData, onSuccess, onError) {
        
        	self.specificCall('bills', billIDs, customData, onSuccess, onError);
	        
        };
        
        // Simplified method for capturing the representatives, both singular and multiple
        this.reps = this.representatives = function (repIDs, customData, onSuccess, onError) {
        
        	self.specificCall('representatives', repIDs, customData, onSuccess, onError);

        };

    };

	// Create the object using itself as the variable name
    ParlData = new ParlData();

}());
