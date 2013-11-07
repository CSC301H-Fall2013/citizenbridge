function loadRep(data) {
	
	templateMain = "<a href='representatives.php'></a><br><div class='span-1'><img src={{imgUrl}}></img></div><div class='span-5'><div class='wet-boew-tabbedinterface'><ul class='tabs'><li><a href='#overview'>Overview</a></li><li><a href='#contacts'>Contacts</a></li><li><a href='#caucus'>Caucus</a></li></ul><div class='tabs-panel'><div id='overview'><h1>{{given}} {{family}}</h1> {{suffix}}<br><b>MP for: </b><h2>{{constituency}}</h2><b>Elected: </b>{{election}}<br><b>Caucus: </b>{{caucus}}</div><div id='contacts'><br> {{Contacts-tab}}{{links}}</div><div id='caucus'> {{Caucus-tab}}</div></div></div></div>";
	
	result = data.results[0];

	imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id; 
	given = result.name.given;
	family = result.name.family;
	constituency = result.constituency.name.en;
	electDate = new Date(parseInt(result.constituency.date_elected + "000"));
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
			contacts = "<b>" + j + "</b>: " + (result.offices[i])[j] + "<br>" + contacts;
		}
		
		contacts += "<br>";
		contacts = contacts.replace("_", "&nbsp;");
	}
	
	caucustab = getCaucus(result.constituencies);
	
	html = templateMain
		.replace("{{imgUrl}}", imgUrl)
		.replace("{{given}}", given)
		.replace("{{family}}", family)
		.replace("{{suffix}}", suffixes)
		.replace("{{constituency}}", constituency)
		.replace("{{election}}", electDate.toLocaleDateString())
		.replace("{{caucus}}", caucus)
		.replace("{{links}}", links)
		.replace("{{Contacts-tab}}", contacts)
		.replace("{{Caucus-tab}}", caucustab);
		

	//Replace the content of the webpage with new html. 
	$("#main").html(html);
}

function getCaucus(data) {
	html = "<table><thead><tr role='row'><th>Election</th><th>Constituency</th><th>Province</th><th>Party</th></thead><tbody>";
	template = "<tr class='row'><td>{{election}}</td><td>{{constituency}}</td><td>{{province}}</td><td>{{party}}</td></tr>";
	for (i = 0; i <data.length; i++) {
		election = new Date(parseInt(data[i].date_elected + "000"));
		html += template
			.replace("{{election}}", election.toLocaleDateString())
			.replace("{{constituency}}", data[i].name.en)
			.replace("{{province}}", data[i].province.name.en)
			.replace("{{party}}", data[i].caucus.name.en);
	}
	html += "</tbody></table>";
	return html;
}

function loadRepList(data) {
	// Template for representative rows
	var template = "<tr class='row'><td style='background-position: center 35%; background-size: cover; margin: -5px; background-image: url({{imgUrl}})'><a href='representatives.php?rep={{repId}}'></a></td><td><a href='representatives.php?rep={{repId}}'>{{given}}</a></td><td><a href='representatives.php?rep={{repId}}'>{{family}}</a></td><td class='center'><a href='representatives.php?rep={{repId}}'>{{caucus}}</a></td><td class='center'><a href='representatives.php?rep={{repId}}'>{{constituency}}</a></td></tr>";
	
	// Create the table and header
	var html = "<table id='rep-table' class='wet-boew-tables' data-wet-boew='{" + '"iDisplayLength"' + ": 25}'><thead><tr role='row'><th>Photo</th> <th>Given Name</th><th>Family Name</th><th>Caucus</th><th>Constituency</th></tr></thead><tbody>";
	
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
