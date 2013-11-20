/*
* Load individual bill's page.
*/
// Data is the bill data,    data2 is the rep data. 
function loadBill(data, data2) {

	templateMain = "<div class='span-1'><center><h2>{{prefixnum}}</h2><br><h5>Up Votes:</h5><h5>{{upvotes}}</h5><button onclick=\"voteBillUp({{billID}})\">Upvote</button><br><h5>Down Votes:</h5><h5>{{downvotes}}</h5><button onclick=\"voteBillDown({{billID}})\">Downvote</button><br><br><br>";
	
	//follow button
	templateMain += "<form id='followButton' action='userFollowBill.php' method='post'> <input type='hidden' name='billToFollow' value='{{billID}}'> <input type='submit' name='follow' value='Follow'> </form>";
	
	templateMain += "<form id='unfollowButton' action='userFollowBill.php' method='post'> <input type='hidden' name='billToFollow' value='{{billID}}'> <input type='submit' name='unfollow' value='Unfollow'> </form>";
	
	templateMain +=	"</center></div><div class='span-5'><div class='wet-boew-tabbedinterface'><ul class='tabs'><li><a href='#overview'>Overview</a></li><li><a href='#progress'>Progress</a></li><li><a href='#votes'>Votes</a></li><li><a href='#press'>Press Releases</a></li><li><a href='#links'>Related Links</a></li></ul><div class='tabs-panel'>";
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
	
	var repArray = new Array();
	image = "";
    sponsor = "N/A";
	// Find the name and picture of the bill's sponsor by their rep id
    for (var j = 0; j < data2.results.length; j ++){
		repArray[data2.results[j].id] = data2.results[j];
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
	var sortedEvents = [];
	var progress = "<h2> Status changes </h2> <b>Status - Date</b><br>";
	
	//leo++
	var dateAccumilator = ""; //accumulate the list of dates for graph 
	var statusAccumilator = ""; //accumulate the list of statuses for graph
	
	//leo++ Table + visualisatin.
	//create table of status
	progress += '<table class="wet-boew-tables" data-wet-boew=' + "'" + '{"bSort": false, "bPaginate": false}' + "'>";
	progress += '<thead><tr><th>Date</th><th>Status Name</th><th>Status id </th></tr></thead>';
	progress += "<tbody>"; //<tr><td> 1 </td><td> Hello </td></tr></tbody>";

	for (var i=0; i < result.events.length; i++) {
		sortedEvents.push([result.events[i].date, result.events[i].status]);
    }
	sortedEvents.sort(function(a, b) {return a[0] - b[0]});
	
	for (var i=0; i < sortedEvents.length; i++) {
		date = (new Date(sortedEvents[i][0] * 1000)).toLocaleDateString();
		dateAccumilator += '"' + date + '"' + ",";  //Leo++
		statusAccumilator += '"' + sortedEvents[i][1] + '"' + ","; //Leo++
		
		statusName = "";
        switch(sortedEvents[i][1]){
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
		
		progress += "<tr><td>" + date + "</td><td>" + statusName + "</td><td>" + sortedEvents[i][1] + "</td></tr>";
	}
	
	progress += "</tbody></table><br><br>"
	
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

	//VOTES
	// For each bill, there should be a list that shows which rep voted for the bill and which rep voted against it.
	//The bills api has “divisions”, this represents the votes that were made. There is an integer that represents “Yay” and “Nay”
	var votes = "";
	//var votes = "<table id='votes-table' data-wet-boew='{" + '"iDisplayLength"' + ": 25}'><thead><tr role='row'><th>Name</th><th>Caucus</th>"; //to_remove 
	//<th>Vote</th></tr></thead><tbody>";
	//var templateDiv = "<tr class='row'></td><td>{{name}}</td><td>{{caucus}}</td>";  //to_remove 
	
			
			//inline function to get the name of the rep based on the rep ID
			getRepNameById = function(repId) 
			{
			    for (var j = 0; j < data2.results.length; j ++){
			    	
					if (data2.results[j].id == repId) 
					{
						firstName = data2.results[j].name.given;
						lastName = data2.results[j].name.family;
						fullName = firstName + " " + lastName;
						return fullName;	
					}
			    }
			    return "--------";
			};
			
			
			//inline function to get the name of the Caucus based on the Caucus ID. 
			getCaucusById = function(CaucusId) 
			{
			    for (var j = 0; j < data2.results.length; j ++){	    	
					if (data2.results[j].constituency.caucus.id == CaucusId) 
					{
						return data2.results[j].constituency.caucus.name.en;	
					}
			    }
			    return "--------";
			};
			
	
	if (result.divisions != null) {
				
		lastDivision = result.divisions.hoc[result.divisions.hoc.length - 1];
		// -------------------------------   Adding pretty graph. 
		votes += "<table class='wet-boew-charts wb-charts-pie wb-charts-percentlegend-true wb-chart-nolegend-true wb-charts-height-250'> <caption>Vote Distribution</caption>";
		votes += "<thead> <tr> <th></th>";
		votes += "<th>Yays</th> ";
		votes += "<th>Nays</th>";
		votes += "</tr></thead>";
		votes += "<tbody><tr><th>Votes</th><td>" + lastDivision.yeas + "</td><td>" + lastDivision.nays + "</td></tr>";
		votes += "</tbody> </table>";
		
		
		
		//---------------------------------  Pretty graph end. 
		
		
		
		
		votes += '<table class="wet-boew-tables" data-wet-boew=' + "'" + '{"bPaginate": false}' + "'>";
		votes += '<thead><tr><th>Representative</th><th> Caucus</th><th>Decision</th></tr></thead>';
		votes += "<tbody>"; 
		
		for (var i=0; i < lastDivision.votes.length; i++) {
			a_vote = lastDivision.votes[i];
			
			decisionName = "";
			if (a_vote.decision == "1") {
				decisionName = "Yay";
			} else {
				decisionName = "Nay";
			}
			
			votes += "<tr><td>" + getRepNameById(a_vote.id) + "</td><td>" + getCaucusById(a_vote.caucus) + "</td><td>" + decisionName + "</td></tr>";
		}
		votes += "</tbody></table>";
	} else {
		votes = "N/A";
	}

	
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
	billID=result.id;
	upvotecount=0;
	downvotecount=0;

	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp0=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp0=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp0.onreadystatechange=function()
	  {
	  //if (xmlhttp0.readyState==4 && xmlhttp0.status==200)
		//{
			votesResult=xmlhttp0.responseText;
			//votesSplit=votes.split(".");
			downvotecount=24353455423;
			upvotecount=votesResult;
		//}
	  }
	//Get the votes
	xmlhttp0.open("GET","getVotes.php?id="+billID, true);
	xmlhttp0.send();


    html = templateMain
        .replace("{{prefixnum}}", prefixnum)
        .replace("{{title}}", title)
        .replace("{{introdate}}", introdate)
        .replace("{{updated}}", updated)
		.replace("{{legislative}}", legislative)
        .replace("{{description}}", description)
        .replace("{{sponsor}}", sponsor)
        .replace("{{image}}", image)
		.replace("{{billID}}", billID) //for vote up
		.replace("{{billID}}", billID)  //for vote down
		.replace("{{billID}}", billID) //for follow
		.replace("{{billID}}", billID) // for unfollow
		.replace("{{progress}}", progress)
		//.replace("{{publications}}", publications)
		.replace("{{votes}}", votes)
		.replace("{{press}}", pr)
		.replace("{{links}}", links)
		.replace("{{upvotes}}", upvotecount)
		.replace("{{downvotes}}", downvotecount);
		
    // Append the html to the web page
    $("#main").html(html);
}

/*
Need to have a vote number somewhere.
*/
//Upvote the bill
function voteBillUp (billID) {

	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp1=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp1=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp1.onreadystatechange=function()
	  {
	  if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
		{
			if (xmlhttp1.responseText == '-1') {
				alert("Please login to vote");
			} else {
				location.reload();
			}
		}
	  }
	//Vote is 1 : True : script will downvote
	xmlhttp1.open("GET","vote.php?id="+billID+"&vote=1",true);
	xmlhttp1.send();
	//alert("Todo.");
}
//Downvote the bill
function voteBillDown(billID) {
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp2=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp2.onreadystatechange=function()
	  {
	  if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
		{
			if (xmlhttp2.responseText == '-1') {
				alert("Please login to vote");
			} else {
				location.reload();
			}
		}
	  }
	//Vote is 1 : True : script will downvote
	xmlhttp2.open("GET","vote.php?id="+billID+"&vote=0",true);
	xmlhttp2.send();
	//alert("Todo.");
	
}


//Follow bill function 
function followBill(billID) 
{
	
}


/*
* Load a table of all bills.
*/
function loadBillList (data, data2) {
    // Template for bill rows
	var template = "<tr class='row'></td><td><a href='bills.php?bill={{billId}}'>{{prefix}}</a></td><td>{{prefixnum}}</td><td><a href='bills.php?bill={{billId}}'>{{title}}</a></td><td>{{status}}</td><td>{{statusNum}}</td><td>{{sponsor}}</td><td>{{introdate}}</td><td>{{updated}}</td></tr>";
    //var template = "<tr class='row'></td><td><a href='bills.php?bill={{billId}}'>{{prefixnum}}</a></td><td><a href='bills.php?bill={{billId}}'>{{title}}</a></td><td><a href='bills.php?bill={{billId}}'>{{status}}</a></td><td>{{sponsor}}</td><td><a href='bills.php?bill={{billId}}'>{{introdate}}</a></td><td><a href='bills.php?bill={{billId}}'>{{updated}}</a></td></tr>";
            
    //Create the table and the header
	var html = "<table id='bill-table'><thead><tr role='row'><th width='50'>Bill</th><th>#</th><th>Title</th><th>Status</th><th>Status #</th><th>Sponsor</th><th>Introduced</th><th>Updated</th></tr></thead><tbody>";
    //var html = "<table id='bill-table' class='wet-boew-tables' data-wet-boew='{ \"aaSorting\": [[5, \"desc\"]], \"iDisplayLength\": 50 }'><thead><tr role='row'><th width='50'>Bill</th><th>Title</th><th>Status</th><th>Sponsor</th><th>Introduced</th><th>Updated</th></tr></thead><tbody>";
    
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
		prefix = result.prefix + "-" + result.number;
		prefixnum = result.number;
		if (result.prefix == "S") {
			prefixnum += 100000;
		}
		
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
		
		//Status bar
		//TO DO: Figure out how to sort this.
		status = last_event.status;
		var progress = "<progress value=\"" + status + "\" max=\"11\" />"
		
		
    
        html += template
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
			.replace("{{prefix}}", prefix)
            .replace("{{prefixnum}}", prefixnum)
            .replace("{{title}}", title)
            .replace("{{status}}", progress)
			.replace("{{statusNum}}", status)
            .replace("{{sponsor}}", sponsor)
            .replace("{{introdate}}", introdate)
            .replace("{{updated}}", updated);
                
    }
    
    // Close the table
    html += "</tbody></table>";
            
    // Append the html to the web page
	$("#main").html(html);

	
	//To sort properly by "C-1, C-2, ...", status, and rep names
	//Works, but gives error "DataTables warning (table id = 'bill-table'): Cannot reinitialise DataTable."
	//Need some way to edit original DataTable in table id = 'bill-table'
	//Comment out below to remove error message
	$(document).ready( function() {
		$('#bill-table').dataTable( {
			"aaSorting": [[7, "desc"]],
			"iDisplayLength": 100,
			"aoColumns": [
				{ "iDataSort": 1 },
				{ "bVisible": false},
				null,
				{ "iDataSort": 4 },
				{ "bVisible": false},
				{ "sType": "html" },
				null,
				null
			]
		} );
	} );

	
}
