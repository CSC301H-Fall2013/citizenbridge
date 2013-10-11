( function() {
	
	/**
	 * A parsing function that parses the JSON data from the
	 * parliamentData API and appends a table to the html
	 * 
	 * parseReps(data)
	 * 
	 *	@param	JSON	data
	 * 					representative JSON data from the parliamentData
	 * 					API 
	 */
	var parseBills = function(data) {
		//Create the table and the header
		var html = "<table id='bill-table' class='wet-boew-tables'><thead><tr role='row'><th>Title</th><th>Type</th><th>Sponsor</th><th>Updated</th></tr></thead><tbody>";

		// Create a row for each bill
		for (var i = 0; i < data.results.length; i++) {

			// Get all the required data from the JSON
			var result, title, updated, temptype, type, sponsor;

			result = data.results[i];
			title = result.short_title.EN;
			if (title == null) { //shot_title may not always be available.
				title = result.title.EN;
			};

			updated = result.last_updated;
			temptype = result.type;
			if(temptype == 1){
				type = "House bill";
			};
			if(temptype == 2){
				type = "Senate bill";
			};
			if(temptype == 3){
				type = "Senate public bill";
			};
			if(temptype == 4){
				type = "Senate private bill";
			};
			if(temptype == 5){
				type = "Private member’s bill";
			};
			sponsor = result.sponsor;

			// Create the row
			html += "<tr>";
			html += "<td>" + title + "</td>";
			html += "<td>" + type + "</td>";
			html += "<td>" + sponsor + "</td>";
			html += "<td>" + updated + "</td>";
			html += "</tr>";
		}

		// Close the table
		html += "</tbody></table>";
		
		// Append the html to the web page
		$("#main").append(html);
		
		// Make the table sortable, searchable and customizable using
		// the WET framework
		$(document).ready( function () {
			$('#bill-table').dataTable()
		});

	}
	ParlData.bbls(parseBills);
}());