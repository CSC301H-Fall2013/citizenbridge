//SCRIPT START

//NEW AND BETTER CODE

function loadRep(data) {
	templateMain = "<a href='representatives.php'><button onclick='loadRepList()'>Back</button></a><br><div class='span-1'><img src={{imgUrl}}></img></div><div class='span-5'>Overview<b>Name: </b>{{given}} {{family}}<b>&nbsp;&nbsp;&nbsp;&nbsp;Titles   </b>{{suffix}}<br><b> Constituency: </b>{{constituency}}&nbsp;&nbsp;&nbsp; <b>Election date: </b>{{election}}<br><b>Caucus: </b>{{caucus}}<br>{{links}}<br> {{Contacts-tab}} <br> {{Caucus-tab}}</div>";
	
	templateContact = "<details><summary class='background-medium'>Contacts</summary>{{details}}</details>"
	
	result = data.results[0];

	imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id; 
	given = result.name.given;
	family = result.name.family;
	constituency = result.constituency.name.en;
	electDate = new Date(parseInt(result.constituency.date_elected * "100"));
	caucus = result.constituency.caucus.name.en;
	
	// get all the suffixes
	suffixes = "";
	for (i in result.name.suffixes) 
	{
			suffixes += result.name.suffixes[i] + ",&nbsp;";
	}
	// remove last comma
	
	//suffixes = suffixes.substring(0, str.length - 1);
	
	// get all the links
	links = "";
	for (i in result.links)
	{
		links += '<a href="' + result.links[i] + '"><b>' + i + "</b></a><br>";
	}
	
	contacts = "";
	for (i in result.offices)
	{
		for (j in result.offices[i]) 
		{
			//alert(JSON.stringify((result.offices[i])[j]));
			contacts += "<b>" + j + "</b>: " + (result.offices[i])[j] + "<br>";
		}
		
		contacts += "<br>";
		contacts = contacts.replace("_", "&nbsp;");
	}

	contacts = "<details><summary class='background-medium'>Contacts</summary>" + contacts + "</details>";
	
	html = templateMain
		.replace("{{imgUrl}}", imgUrl)
		.replace("{{given}}", given)
		.replace("{{family}}", family)
		.replace("{{suffix}}", suffixes)
		.replace("{{constituency}}", constituency)
		.replace("{{election}}", electDate.toLocaleDateString())
		.replace("{{caucus}}", caucus)
		.replace("{{links}}", links)
		.replace("{{Contacts-tab}}", contacts);
		

	//Replace the content of the webpage with new html. 
	$("#main").html(html);
}

function loadRepList(data) {
	// Template for representative rows
	var template = "<tr class='row'><td style='background-position: center 35%; background-size: cover; margin: -5px; background-image: url({{imgUrl}})'><a href='representatives.php?rep={{repId}}'></a></td><td><a href='representatives.php?rep={{repId}}'>{{given}}</a></td><td><a href='representatives.php?rep={{repId}}'>{{family}}</a></td><td class='center'><a href='representatives.php?rep={{repId}}'>{{caucus}}</a></td><td class='center'><a href='representatives.php?rep={{repId}}'>{{constituency}}</a></td></tr>";
	
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
			.replace("{{repId}}", repId)
			.replace("{{repId}}", repId)
			.replace("{{repId}}", repId)
			.replace("{{repId}}", repId)
			.replace("{{imgUrl}}", imgUrl)
			.replace("{{given}}", given)
			.replace("{{family}}", family)
			.replace("{{caucus}}", caucus)
			.replace("{{constituency}}", constituency);
	}
	
	html += "</tbody></table>";
	
	// Append the html to the web page
	$("#main").html(html);
	
	// Make the table sortable, searchable and customizable using
	// the WET framework
}


/************************************************************************************************************************************************/
//OLD CODE


//(function () {
	//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  sh__Load_representatives_onto_main_page
	/*loadRepList = function() 
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
		/*var parseReps = function(data) {
			

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
			}
			
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
	/*loadRep = function(repID) 
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
<<<<<<< HEAD
			/*var parseReps = function(data) {
			
				templateMain = "<button onclick='loadRepList()'>Back</button><br><div class='span-1'><img src={{imgUrl}}></img></div><div class='span-5'>Overview<b>Name: </b>{{given}} {{family}}<b>&nbsp;&nbsp;&nbsp;&nbsp;Titles   </b>{{suffix}}<br><b> Constituency: </b>{{constituency}}&nbsp;&nbsp;&nbsp; <b>Election date: </b>{{election}}<br><b>Caucus: </b>{{caucus}}<br>{{links}}<br> {{Contacts-tab}} <br> {{Caucus-tab}}</div>";
				templateMain = "<button onclick='loadRepList()'>Back</button><br><div class='span-1'><img src={{imgUrl}}></img></div><div class='span-5'>Overview<b>Name: </b>{{given}} {{family}}<b>&nbsp;&nbsp;&nbsp;&nbsp;Titles   </b>{{suffix}}<br><b> Constituency: </b>{{constituency}}&nbsp;&nbsp;&nbsp; <b>Election date: </b>{{election}}<br><b>Caucus: </b>{{caucus}}<br>{{links}}<br> {{Contacts-tab}} <br> {{Caucus-tab}}</div>";
=======
			var parseReps = function(data) {

						
				templateMain = "<button onclick='loadRepList()'>Back</button><br><div class='span-1'><img src={{imgUrl}}></img></div><div class='span-5'><summary>Overview</summary><b>Name: </b>{{given}} {{family}}<b>&nbsp;&nbsp;&nbsp;&nbsp;Titles   </b>{{suffix}}<br><b> Constituency: </b>{{constituency}}&nbsp;&nbsp;&nbsp; <b>Election date: </b>{{election}}<br><b>Caucus: </b>{{caucus}}<br>{{links}}<br> {{contacts}}</div>";
>>>>>>> b7c0747e30a1a999d92a17b7471edcd561ef35d7
				
				templateContact = "<details><summary class='background-medium'>Contacts</summary>{{details}}</details>"
				
				result = data.results[0];

				imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id; 
				given = result.name.given;
				family = result.name.family;
				constituency = result.constituency.name.en;
				electDate = new Date(parseInt(result.constituency.date_elected * "100"));
				caucus = result.constituency.caucus.name.en;
				
				// get all the suffixes
				suffixes = "";
				for (i in result.name.suffixes) 
				{
						suffixes += result.name.suffixes[i] + ",&nbsp;";
				}
				// remove last comma
				
				//suffixes = suffixes.substring(0, str.length - 1);
				
				// get all the links
				links = "";
				for (i in result.links)
				{
					links += '<a href="' + result.links[i] + '"><b>' + i + "</b></a><br>";
				}
				
				contacts = "";
				for (i in result.offices)
				{
					for (j in result.offices[i]) 
					{
						//alert(JSON.stringify((result.offices[i])[j]));
						contacts += "<b>" + j + "</b>: " + (result.offices[i])[j] + "<br>";
					}
					
					contacts += "<br>";
					contacts = contacts.replace("_", "&nbsp;");
				}

				contacts = "<details><summary class='background-medium'>Contacts</summary>" + contacts + "</details>";
				
				html = templateMain
					.replace("{{imgUrl}}", imgUrl)
					.replace("{{given}}", given)
					.replace("{{family}}", family)
					.replace("{{suffix}}", suffixes)
					.replace("{{constituency}}", constituency)
					.replace("{{election}}", electDate.toLocaleDateString())
					.replace("{{caucus}}", caucus)
					.replace("{{links}}", links)
					.replace("{{Contacts-tab}}", contacts);
					

				//localStorage.replistObj = html;	
				//Replace the content of the webpage with new html. 
				$("#main").html(html);
				
				
			}

			ParlData.reps(repID, "all", parseReps);
			//localStorage.replistObj;

			// if (localStorage.replistObj != 'undefined')
			// 	ParlData.reps(repID, "all", parseReps);
			// else 
			// 	$("#main").html(localStorage.replistObj);
			
	}

	//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Auto_execution_start.
	//loadRepList();
	//loadRep(78554); //http://api.parliamentdata.ca/representatives/78554/all
	//loadRep(128110)  //http://api.parliamentdata.ca/representatives/128110/all



//SCRIPT END>
}());*/

