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
			
			// Template for representative rows
			var template = "<tr class='row' onclick='loadRep({{repId}})'><td style='background-position: center 35%; background-size: cover; margin: -5px; background-image: url({{imgUrl}})'></td><td>{{given}}</td><td>{{family}}</td><td class='center'>{{caucus}}</td><td class='center'>{{constituency}}</td></tr>";
			
			// Create the table and header
			var html = "<table id='rep-table' class='wet-boew-tables'><thead><tr role='row'><th>Photo</th> <th>Given Name</th><th>Family Name</th><th>Caucus</th><th>Constituency</th></tr></thead><tbody>";
			
			// Create a row for each representative
			for (var i = 0; i < data.results.length; i++) {
				
				// Get all the required data from the JSON
				var result, given, family, constituency, caucus;
				result = data.results[i];

					repId = result.id;
					given = result.name.given;
					family = result.name.family;
					constituency = result.constituency.name.en;
					caucus = result.constituency.caucus.name.en;

					imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id;

				html += template
					.replace("{{repId}}", repId)
					.replace("{{imgUrl}}", imgUrl)
					.replace("{{given}}", given)
					.replace("{{family}}", family)
					.replace("{{caucus}}", caucus)
					.replace("{{constituency}}", constituency);
					
				/* JOHN-----Old Code
				// Create the row
				/*html += "<tr class='row' onclick='loadRep(" + repId + ")'>";
				html += "<td style='background-position: center 35%; background-size: cover; margin: -5px; background-image: url(" + imgUrl + imgID + ")'>" + "</td>"; 
				html += "<td>{{given}}</td>";
				html += "<td>" + family + "</td>";
				html += "<td class='center'>" + caucus + "</td>";
				html += "<td class='center'>" + constituency + "</td>";
				html += "</tr>";*/
			}
			
			html += "</tbody></table>";
			
			
			
			// Close the table
			//html += "</tbody></table>";
			
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
			 * parliamentData API and loads the information of a single representative. 
			 * 
			 * parseReps(data)
			 * 
			 *	@param	JSON	data
			 * 					representative JSON data from the parliamentData
			 * 					API 
			 */
			var parseReps = function(data) {
				/* John -- Old Code
				
				// Create the table and header

				result = data.results[0];

				//alert(JSON.stringify(result))

				repImg = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id; 
				given = result.name.given;
				family = result.name.family;

				html = "<button onclick='loadRepList()'> Back </button><br>"

				html += "<div class='span-1'> <img src=" + repImg + "> </img> </div>";
				html += "<div class='span-5'>" 
					html += '<b>Name: </b>'  + given +  " " +  family + "    ";

					//handle titles
					html += '<b>&nbsp;&nbsp;&nbsp;&nbsp;Titles   </b>'
					for (i in result.name.suffixes) 
					{
						html += result.name.suffixes[i] + "&nbsp;,&nbsp;";
					}
					html += "<br>";

					/////////Current Consitiuency
					//En name 
					constEnName = result.constituencies[0].name.en;
					electDate = new Date(parseInt(result.constituencies[0].date_elected + "100"));

					html += "<b> Constituency: </b> " + constEnName;
					html += "&nbsp;&nbsp;&nbsp; <b>Election date: </b>" +  electDate.toLocaleDateString() + "<br>";

					//caucus
					caucusName = result.constituencies[0].caucus.name.en;
					html += "<b>Caucus: </b>" + caucusName + "<br>"

					//Links
					//html += JSON.stringify(result.links);
					for (i in result.links)
					{
						tmpLink = result.links[i]
						html += '<a href="' + tmpLink + '"><b>' + i + "</b></a><br>"
					}



				html += "</div>";*/
				
							
				template = "<button onclick='loadRepList()'>Back</button><br><div class='span-1'><img src={{imgUrl}}></img></div><div class='span-5'><b>Name: </b>{{given}} {{family}}<b>&nbsp;&nbsp;&nbsp;&nbsp;Titles   </b>{{suffix}}<br><b> Constituency: </b>{{constituency}}&nbsp;&nbsp;&nbsp; <b>Election date: </b>{{election}}<br><b>Caucus: </b>{{caucus}}<br></div>"
				
				result = data.results[0];

				imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id; 
				given = result.name.given;
				family = result.name.family;
				constituency = result.constituencies[0].name.en;
				electDate = new Date(parseInt(result.constituencies[0].date_elected + "100"));
				caucus = result.constituencies[0].caucus.name.en;
				suffixes = "";
				for (i in result.name.suffixes) 
				{
						suffixes += result.name.suffixes[i] + ",&nbsp;";
				}
				links = "";
				for (i in result.links)
				{
					links += '<a href="' + result.links[i] + '"><b>' + i + "</b></a><br>";
				}
				
				
				html = template
					.replace("{{imgUrl}}", imgUrl)
					.replace("{{given}}", given)
					.replace("{{family}}", family)
					.replace("{{suffix}}", suffixes)
					.replace("{{constituency}}", constituency)
					.replace("{{election}}", electDate.toLocaleDateString())
					.replace("{{caucus}}", caucus)
					.replace("{{link}}", links);
					

				//Replace the content of the webpage with new html. 
				$("#main").html(html);
				
			}
			ParlData.reps(repID, "all", parseReps);
			
	}

	//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Auto_execution_start.
	loadRepList();
	//loadRep(78554); //http://api.parliamentdata.ca/representatives/78554/all
	//loadRep(128110)  //http://api.parliamentdata.ca/representatives/128110/all
	
















//SCRIPT END>
}());
