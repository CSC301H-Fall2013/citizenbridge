//SCRIPT START
( function() 
{



	//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  sh__Load_representatives_onto_main_page
	loadRepList = function() 
	{
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
			var html = "<table id='rep-table' class='wet-boew-tables'><thead><tr role='row'><th>Photo</th> <th>Given Name</th><th>Family Name</th><th>Caucus</th><th>Constituency</th></tr></thead><tbody>";
			
			// Create a row for each representative
			for (var i = 0; i < data.results.length; i++) {
				
				// Get all the required data from the JSON
				var result, given, family, constituency, caucus;
				result = data.results[i];

					given = result.name.given;
					family = result.name.family;
					constituency = result.constituency.name.en;
					caucus = result.constituency.caucus.name.en;

					imgID = result.image_id; //for image.
					imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=";

				// Create the row
				html += "<tr>";
				html += "<td style='background-position: center 35%; background-size: cover; margin: -5px; background-image: url(" + imgUrl + imgID + ")'>" + "</td>"; 
				html += "<td>" + given + "</td>";
				html += "<td>" + family + "</td>";
				html += "<td class='center'>" + caucus + "</td>";
				html += "<td class='center'>" + constituency + "</td>";
				html += "</tr>";
			}
			
			// Close the table
			html += "</tbody></table>";
			
			// Append the html to the web page
			$("#main").html(html);
			
			// Make the table sortable, searchable and customizable using
			// the WET framework
			$(document).ready( function () {
				$('#rep-table').dataTable()
			});
		}


		ParlData.reps(parseReps);
	}


	//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  sh__Load_Rep_info
	loadRep = function(repID) 
	{
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

				result = data.results[0];

				//alert(JSON.stringify(result))

				repImg = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id; 


				given = result.name.given;
				family = result.name.family;

				html = "<div id='repBlock'>"
					html += "<img id='repImg' src=" + repImg + "> </img>";
					html += '<div id="repInfoBox">'
						html += '<b>Name: </b>'  + given +  " " +  family + "    ";
						html += '<b>Titles </b>'
						for (i in result.name.suffixes) 
						{
							html += result.name.suffixes[i] + "  ";
						}
						html += "<br>";


						html += "</div>";

				html += "</div>"



				// var html = "<table id='rep-table' class='wet-boew-tables'><thead><tr role='row'><th>Photo</th> <th>Given Name</th><th>Family Name</th><th>Caucus</th><th>Constituency</th></tr></thead><tbody>";
				
				// // Create a row for each representative
				// for (var i = 0; i < data.results.length; i++) 
				// {
					
				// 	// Get all the required data from the JSON
				// 	var result, given, family, constituency, caucus;
				// 	result = data.results[i];

				// 		given = result.name.given;
				// 		family = result.name.family;
				// 		constituency = result.constituency.name.en;
				// 		caucus = result.constituency.caucus.name.en;

				// 		imgID = result.image_id; //for image.
				// 		imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=";

				// 	// Create the row
				// 	html += "<tr>";
				// 	html += "<td style='background-position: center 35%; background-size: cover; margin: -5px; background-image: url(" + imgUrl + imgID + ")'>" + "</td>"; 
				// 	html += "<td>" + given + "</td>";
				// 	html += "<td>" + family + "</td>";
				// 	html += "<td class='center'>" + caucus + "</td>";
				// 	html += "<td class='center'>" + constituency + "</td>";
				// 	html += "</tr>";
				// }
				
				// // Close the table
				// html += "</tbody></table>";
				
				// Append the html to the web page
				$("#main").html(html);
				
				// Make the table sortable, searchable and customizable using
				// the WET framework
				// $(document).ready( function () {
				// 	$('#rep-table').dataTable()
				// });
			}
			ParlData.reps(repID, "all", parseReps);
			
	}
	



	//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Auto_execution_start.
	//loadRepList();
	//loadRep(78554); //http://api.parliamentdata.ca/representatives/78554/all
	loadRep(128110)
	
















//SCRIPT END>
}());
