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
	var parseReps = function(data) {
		// Create the table and header
		var html = "<table id='rep-table' class='wet-boew-tables'><thead><tr role='row'><th>Given Name</th><th>Family Name</th><th>Caucus</th><th>Constituency</th></tr></thead><tbody>";
		
		// Create a row for each representative
		for (var i = 0; i < data.results.length; i++) {
			
			// Get all the required data from the JSON
			var result, given, family, constituency, caucus;
			result = data.results[i];
			given = result.name.given;
			family = result.name.family;
			constituency = result.constituency.name.en;
			caucus = result.constituency.caucus.name.en;
			
			// Create the row
			html += "<tr>";
			html += "<td>" + given + "</td>";
			html += "<td>" + family + "</td>";
			html += "<td class='center'>" + caucus + "</td>";
			html += "<td class='center'>" + constituency + "</td>";
			html += "</tr>";
		}
		
		// Close the table
		html += "</tbody></table>";
		
		// Append the html to the web page
		$("#main").append(html);
		
		// Make the table sortable, searchable and customizable using
		// the WET framework
		$(document).ready( function () {
			$('#rep-table').dataTable()
		});
	}
	ParlData.reps(parseReps);
}());


