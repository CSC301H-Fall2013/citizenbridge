/*
* Load individual bill's page.
*/
function loadBill(data, data2) {

	templateMain = "<div class='span-1'><center><h2>{{prefixnum}}</h2><br><button onclick=\"voteBillUp({{billID}})\">Upvote</button><br><button onclick=\"voteBillDown({{billID}})\">Downvote</button></center></div><div class='span-5'><div class='wet-boew-tabbedinterface'><ul class='tabs'><li><a href='#overview'>Overview</a></li><li><a href='#progress'>Progress</a></li><li><a href='#votes'>Votes</a></li><li><a href='#press'>Press Releases</a></li><li><a href='#links'>Related Links</a></li></ul><div class='tabs-panel'>";
	templateMain += "<div id='overview'><h5>{{title}}</h5><br><b>Introduced: </b>{{introdate}}<br><b>Updated: </b>{{updated}}<br><b>Sponsor: </b>{{sponsor}}<br><br>{{legislative}}<br><br><b>Description: </b>{{description}}</div>";
	templateMain += "<div id='progress'><br>{{progress}}</div>";
	templateMain += "<div id='votes'><br>{{votes}}</div>";
	templateMain += "<div id='press'>{{press}}</div>";
	templateMain += "<div id='links'><br>{{links}}</div></div></div></div>";
	
	result = data.results[0];

	// OVERVIEW
	prefixnum = result.prefix + "-" + result.number;
    title = result.title.EN;
    
    intro = new Date(result.introduction * 1000);
    introdate = intro.toUTCString();
    up = new Date(result.last_updated);
    updated = up.toUTCString();
	
	// Link to summary on Parliament of Canada website
    if ((legislative = result.legislative_summary.EN) == null) {
        legislative = "<b>Legislative Summary:</b> N/A";
    } else {
        legislative = "<a href=\"" + result.legislative_summary.EN + "\">Legislative Summary</a>";
    }
	
	image = "";
    sponsor = "N/A";
	// Find the name and picture of the bill's sponsor by their rep id
    for (var j = 0; j < data2.results.length; j ++){
        if (data2.results[j].id == result.sponsor){
            name = data2.results[j].name.given + " " + data2.results[j].name.family;
			// Link to sponsor's individual page
            sponsor = "<a href='representatives.php?rep=" + result.sponsor + "'>" + name + "</a>";
			// Image
            imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + data2.results[j].image_id;
            image = "<div style='width:142px;height:230px;'><img src=" + imgUrl +"></img></div>";
            break;
        }
    }

	if ((description = result.summary.EN) == null) {
        description = "N/A";
    } else {
        description = "<br>" + description.split("\n").join("<br><br>");
    }
	
	
	
	//PROGRESS
	// For time-line of status
	var eventDates = new Array();
	var eventStatus = new Array();
	
	var progress = "<h2> Status changes </h2> <b>Status - Date</b><br>";
	
	//leo++
	var dateAccumilator = ""; //accumilate the list of dates. 
	var statusAccumilator = ""; //accumilate the list of statuses. 
	
	//leo++ Table + visualisatin. 
	progress += '<table class="wet-boew-tables" data-wet-boew=' + "'" + '{"bSort": false, "bPaginate": false}' + "'>";
	progress += '<thead><tr><th>Date</th><th>Status Name</th><th>Status id </th></tr></thead>';
	progress += "<tbody>"; //<tr><td> 1 </td><td> Hello </td></tr></tbody>";

	for (var i=0; i < result.events.length; i++) {
		date = new Date(result.events[i].date * 1000);
		//NOTE: dates are NOT in order  todo - if time permits, sort it as per: http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
		eventDates[i] = date.toLocaleDateString();
		
		dateAccumilator += '"' + eventDates[i] + '"' + ",";  //Leo++
		
		eventStatus[i] = result.events[i].status;
		statusAccumilator += '"' + eventStatus[i] + '"' + ","; //Leo++
		
        statusName = "";
        // If you don't want just status numbers
        switch(result.events[i].status){
        case 0:  statusName = "Bill defeated / not proceeded with"; break;
        case 1:  statusName = "Pre-study of the commons bill"; break;
        case 2:  statusName = "Introduction and first reading"; break;
        case 3:  statusName = "Second Reading and/or debate at second reading"; break;
        case 4:  statusName = "Referral to committee"; break;
        case 5:  statusName = "Committee report presented / debate at condisteration of committee report"; break;
        case 6:  statusName = "Debate at report stage"; break;
        case 7:  statusName = "Concurrence at report stage"; break;
        case 8:  statusName = "Committee report adopted, 3rd reading and/or debate at 3rd reading"; break;
        case 9:  statusName = "Placed in order of precedence / message sent to the House of Commons"; break;
        case 10: statusName = "Jointly seconded by or concurrence in the Senate amendments"; break;
        case 20: statusName = "Royal assent / completed";break;
        default: statusName = "Unknown"; break;
    }
		
		progress += "<tr><td>" + eventDates[i] + "</td><td>" + statusName + "</td><td>" + eventStatus[i] + "</td></tr>";

	}
	
	progress += "</tbody></table>"
	
	
	
		//-------------- LEO ++ Adding Visual representation 
		//LEO++ Adding graph for visualisation. 
		progress += '<canvas id="canvasBillsLine" height="450" width="600"></canvas>';
		
		//LEO++ generate visual line. 
		progress += '<script>';
		progress += ' var lineChartData = { labels :[' + dateAccumilator + "],"; // ["January","February","March","April","May","June","July"], ';
		progress +=	'datasets :[{ fillColor : "rgba(151,187,205,0.5)", strokeColor : "rgba(151,187,205,1)",';
		progress +=	'	pointColor : "rgba(151,187,205,1)", pointStrokeColor : "#fff",';
		progress += '				data : [' + statusAccumilator + ']';								//[28,48,40,19,96,27,100] 
		progress += '	}]};';
	    
		
		 //----- LEO++ Now generate a new chart
		//Define custom scale (1,2,3,4), this avoids scale like 1.1, 1,2,1,3  etc.. 
		progress += 'var LineOptions = { scaleOverride : true, scaleSteps : 20, scaleStepWidth : 1, scaleStartValue : 0 };';
		progress += 'var myLine = new Chart(document.getElementById("canvasBillsLine").getContext("2d")).Line(lineChartData,LineOptions)';
		progress += '</script>';
	
		 //Append status definitions for user information: 
		 progress += "<h4> Status Definitions: </h4>"
		 progress += "0 Bill defeated / not proceeded with"; 
		 progress += "<br>1 Pre-study of the commons bill"
		 progress += "<br>2 Introduction and first reading";
		 progress += "<br>3 Second Reading and/or debate at second reading";;
		 progress += "<br>4 Referral to committee"; 
		 progress += "<br>5 Committee report presented / debate at condisteration of committee report";
		 progress += "<br>6 Debate at report stage";
		 progress += "<br>7 Concurrence at report stage"; 
		 progress += "<br>8 Committee report adopted, 3rd reading and/or debate at 3rd reading"; 
		 progress += "<br>9 Placed in order of precedence / message sent to the House of Commons"; 
		 progress += "<br>10 Jointly seconded by or concurrence in the Senate amendments";
		 progress += "<br>20 Royal assent / completed";
		
	
	
	
	
	
	//PUBLICATIONS
	//TO DELETE (it's really useless info)
	/*var publications = "";
	var pub, pubRec, pubType, pubSum;
	var templatePub = "{{pubRec}}<br><i>{{pubType}}</i><br><br>";
	for (var i = 0; i < result.publications.length; i++) {
		pub = result.publications[i];
		if (pub.recommendation == null) {
			pubRec = "N/A";
		} else {
			pubRec = pub.recommendation.EN;
		}
		//NOTE: recommendation seems to be exactly the same for all publications
		
		switch (pub.type) {
			case 1: pubType = "First Reading"; break;
			case 2: pubType = "As amended by committee"; break; 
			case 3: pubType = "As passed by the House of Commons"; break;
			case 4: pubType = "As passed by the Senate"; break;
			case 5: pubType = "Royal Assent"; break;
			default: pubType = "Unknown"; break;
		}
		
		//NOTE: publication summary seems to be exactly the same as bill summary
		
		publications += templatePub
						.replace("{{pubRec}}", pubRec)
						.replace("{{pubType}}", pubType);
		
	}*/
	
	//VOTES
	// For each bill, there should be a list that shows which rep voted for the bill and which rep voted against it.
	//The bills api has “divisions”, this represents the votes that were made. There is an integer that represents “Yay” and “Nay”

	
	//PRESS RELEASES
	var pr = "";
	var templatePRLinks = "<a href =\"{{prLink}}\">{{prName}}</a><br>";
	if (result.party_pr_links.length == 0) {
		pr = "<br>None";
	} else {
		for (var i=0; i < result.party_pr_links.length; i++) {
			pr += "<h6>" + result.party_pr_links[i].name.EN + "</h6>";
			for (var j=0; j < result.party_pr_links[i].links.EN.length; j++) {
				pr += templatePRLinks
						.replace("{{prLink}}", result.party_pr_links[i].links.EN[j].link)
						.replace("{{prName}}", result.party_pr_links[i].links.EN[j].name);
			}
		}
	}
	
	//LINKS
	// Related links from API
	var links = "";
	if (result.related_links != null) {
		for (var i = 0; i < result.related_links.EN.length; i++) {
			var l = result.related_links.EN[i];
			links += "<a href=\"" + l.link + "\">" + l.name + "</a><br><br>";
		}
	} else {
		links = "None";
	}
	
	// Get the id of the bill, which is unique.
	// This will be used to implement upvoting and downvoting.
	billID = result.id;
	
    html = templateMain
        .replace("{{prefixnum}}", prefixnum)
        .replace("{{title}}", title)
        .replace("{{introdate}}", introdate)
        .replace("{{updated}}", updated)
		.replace("{{legislative}}", legislative)
        .replace("{{description}}", description)
        .replace("{{sponsor}}", sponsor)
        .replace("{{image}}", image)
		.replace("{{billID}}", billID)
		.replace("{{billID}}", billID)
		.replace("{{progress}}", progress)
		//.replace("{{publications}}", publications)
		//.replace("{{votes}}", votes)
		.replace("{{press}}", pr)
		.replace("{{links}}", links);
		
    // Append the html to the web page
    $("#main").html(html);
    

}

/*
Need to run php script that updates or inserts value in DB and then
possibly refresh portion of the page (or entire page) that
contains the display of upvotes and downvotes

Also:
We may want to run a php script in loadBill() where we
attempt to insert into DB a new vote tuple (with 0 upvotes and 0 downvotes)
if it doesn't already exist
*/
//Upvote the bill
function voteBillUp (billID) {
	alert("Todo.");
}
//Downvote the bill
function voteBillDown(billID) {
	alert("Todo.");
	
}

/*
* Load a table of all bills.
*/
function loadBillList (data, data2) {
    // Template for bill rows
    var template = "<tr class='row'></td><td><a href='bills.php?bill={{billId}}'>{{prefixnum}}</a></td><td><a href='bills.php?bill={{billId}}'>{{title}}</a></td><td><a href='bills.php?bill={{billId}}'>{{status}}</a></td><td>{{sponsor}}</td><td><a href='bills.php?bill={{billId}}'>{{introdate}}</a></td><td><a href='bills.php?bill={{billId}}'>{{updated}}</a></td></tr>";
            
    //Create the table and the header
	//, \"sType\": \"formatted-num\", \"aTargets\": [ 0 ]
    var html = "<table id='bill-table' class='wet-boew-tables' data-wet-boew='{ \"aaSorting\": [[5, \"desc\"]], \"iDisplayLength\": 50 }'><thead><tr role='row'><th width='50'>Bill</th><th>Title</th><th>Status</th><th>Sponsor</th><th>Introduced</th><th>Updated</th></tr></thead><tbody>";
    
    // Create a list of sponsors to access their information by their id
    var sponsorIdList = new Array();
    for (var j = 0; j < data2.results.length; j ++){
        sponsorIdList[j] = data2.results[j].id;
    }

    // Create and fill in a row for each bill
    for (var i = 0; i < data.results.length; i++) {
        // Get all the required data from the JSON
        var result, prefixnum, title, up, update, /*sponsor,*/ status, intro, introdate;
    
        result = data.results[i];
		
        billId = result.id;
        
		// Number
		prefixnum = result.prefix + "-" + result.number;
		/*if (result.number < 10) {
			prefixnum += "00";
		} else if (result.number < 100) {
			prefixnum += "0";
		}
		prefixnum += result.number;*/
		
		// Title
        title = result.short_title.EN;
        if (title == null) { //short_title may not always be available.
            title = result.title.EN; // Hopefully is not null.
        };
    
        // Introduction date
        intro = new Date(result.introduction * 1000);
		introdate = (intro.toJSON()).slice(0,10);
        //introdate = intro.toUTCString();
		
		// Updated date
        up = new Date(result.last_updated);
		updated = (up.toJSON()).slice(0,10) + " " + up.toLocaleTimeString();
        //updated = up.toUTCString();

		// Sponsor
        sponsorId = result.sponsor;					
        sponsorIndex = sponsorIdList.indexOf(sponsorId);
        if (sponsorIndex == -1){
			//Sponsor is no longer a MP and their information is not available
            sponsor = "-";
        } else {
            //Print the first and last name of sponsor
            sponsor = "<a href='representatives.php?rep=" + sponsorId + "'>" + 
				data2.results[sponsorIndex].name.given + " " + data2.results[sponsorIndex].name.family + "</a>";
            //displays the image of the sponsor (disabled/does not work)
            //sponsor = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + data2.results[sponsorIndex].image_id;

        }

		// Find the status of a bill by the status of the most recent event
		last_event = result.events[0];
		for (var j=0; j < result.events.length; j++) {
			if (last_event.date < result.events[j].date) {
				last_event = result.events[j];
			}
		}
        /*switch(last_event.status){
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
        }*/
		
		//Status bar
		//TO DO: Figure out how to sort this.
		status = last_event.status;
		var progress = "<progress value=\"" + status + "\" max=\"11\" />"
		
		
    
        html += template
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{prefixnum}}", prefixnum)
            .replace("{{title}}", title)
            .replace("{{status}}", progress)
            .replace("{{sponsor}}", sponsor)
            .replace("{{introdate}}", introdate)
            .replace("{{updated}}", updated);
                
    }
    
    // Close the table
    html += "</tbody></table>";
            
    // Append the html to the web page
	 $("#main").html(html);

}

/*function loadBill(data, data2) {
    
	// Template html to display page
    template = "<div class='span-5'><h3>Overview</h3><br><b>{{prefixnum}}:&nbsp;{{title}}</b><br><br><b>Introduced: </b>{{introdate}}<br><b>Updated: </b>{{updated}}<br><b>Sponsor: </b>{{image}}{{sponsor}}<br><br><b>Description: </b>{{description}}<br><br><b>Link to Parliament of Canada: </b>{{summary}}<br><br><button onclick=\"voteBillUp({{billID}})\">Upvote</button> <button onclick=\"voteBillDown({{billID}})\">Downvote</button></div>";

    result = data.results[0];

	// Bill number
    prefixnum = result.prefix + result.number;
	// Title
    title = result.title.EN;
	
	// Description
    if ((description = result.summary.EN) == null) {
        description = "N/A";
    } else {
        description = "<br>" + description.split("\n").join("<br><br>");
    }
	
	// Link to summary on Parliament of Canada website
    if ((summary = result.legislative_summary.EN) == null) {
        summary = "N/A";
    } else {
        summary = "<a href=\"" + result.legislative_summary.EN + "\">" + 
            result.legislative_summary.EN + "</a>";
    }
	
    image = "";
    sponsor = "N/A";
	// Find the name and picture of the bill's sponsor by their rep id
    for (var j = 0; j < data2.results.length; j ++){
        if (data2.results[j].id == result.sponsor){
            name = data2.results[j].name.given + " " + data2.results[j].name.family;
			// Link to sponsor's individual page
            sponsor = "<a href='representatives.php?rep=" + result.sponsor + "'>" + name + "</a>";
            imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + data2.results[j].image_id;
            image = "<div style='width:142px;height:230px;'><img src=" + imgUrl +"></img></div>";
            break;
        }
    }
    
	// Introduction date
    intro = new Date(result.introduction * 1000);
    introdate = intro.toUTCString();
    // Updated date
    up = new Date(result.last_updated);
    updated = up.toUTCString();
	
	// Get the id of the bill, which is unique.
	// This will be used to implement upvoting and downvoting.
	billID = result.id;
	
    html = template
        .replace("{{prefixnum}}", prefixnum)
        .replace("{{title}}", title)
        .replace("{{introdate}}", introdate)
        .replace("{{updated}}", updated)
        .replace("{{description}}", description)
        .replace("{{summary}}", summary)
        .replace("{{sponsor}}", sponsor)
        .replace("{{image}}", image)
		.replace("{{billID}}", billID)
		.replace("{{billID}}", billID);

    // Append the html to the web page
    $("#main").html(html);
    
}*/