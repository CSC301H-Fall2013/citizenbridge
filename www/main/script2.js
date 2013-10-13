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
		var html = "<table id='bill-table' class='wet-boew-tables'><thead><tr role='row'><th>Bill</th><th>Language</th><th>Title</th><th>Type</th><th>Status</th><th>Sponsor</th><th>Updated</th></tr></thead><tbody>";

		// Create a row for each bill
		for (var i = 0; i < data.results.length; i++) {

			// Get all the required data from the JSON
			var result, prefixnum, title, updated, type, sponsor, status, lang;

			result = data.results[i];
			prefixnum = result.prefix + result.number;
			lang = result.language;
			title = result.short_title.EN;
			if (title == null) { //short_title may not always be available.
				title = result.title.EN;
			};

			updated = result.last_updated;
			switch (result.type){
				case 1: type = "House bill"; break;
				case 2: type = "Senate bill"; break;
				case 3: type = "Senate public bill"; break;
				case 4: type = "Senate private bill"; break;
				case 5: type = "Private member’s bill"; break;
				default: type = "Unknown"; break;
			}

			sponsor = result.sponsor; //TODO: Link to a name/pic/something that isn't just a number. 

			switch(result.status){
				case 0: status = "Bill defeated / not proceeded with"; break;
				case 1: status = "Pre-study of the commons bill"; break;
				case 2: status = "Introduction and first reading"; break;
				case 3: status = "Second Reading and/or debate at second reading"; break;
				case 4: status = "Referral to committee"; break;
				case 5: status = "Committee report presented / debate at condisteration of committee report"; break;
				case 6: status = "Debate at report stage"; break;
				case 7: status = "Concurrence at report stage"; break;
				case 8: status = "Committee report adopted, 3rd reading and/or debate at 3rd reading"; break;
				case 9: status = "Placed in order of precedence / message sent to the House of Commons"; break;
				case 10: status = "Jointly seconded by or concurrence in the Senate amendments"; break;
				case 20: status = "Royal assent / completed";break;
				default: status = "Unknown"; break;
			}

			// Create the row
			html += "<tr>";
			html += "<td>" + prefixnum + "</td>";
			html += "<td>" + lang + "</td>";
			html += "<td>" + title + "</td>";
			html += "<td>" + type + "</td>";
			html += "<td>" + status + "</td>";
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