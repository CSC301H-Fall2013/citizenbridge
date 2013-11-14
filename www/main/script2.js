/*
* Load individual bill's page.
*/
function loadBill(data, data2) {
    
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
* Load a list of all bills.
*/
function loadBillList (data, data2) {
    // Template for bill rows
    var template = "<tr class='row'></td><td><a href='bills.php?bill={{billId}}'>{{prefixnum}}</a></td><td><a href='bills.php?bill={{billId}}'>{{title}}</a></td><td><a href='bills.php?bill={{billId}}'>{{status}}</a></td><td>{{sponsor}}</td><td><a href='bills.php?bill={{billId}}'>{{introdate}}</a></td><td><a href='bills.php?bill={{billId}}'>{{updated}}</a></td></tr>";
            
    //Create the table and the header
    var html = "<table id='bill-table' class='wet-boew-tables' data-wet-boew='{\"aaSorting\": [[5, \"desc\"]], \"iDisplayLength\": 50}'><thead><tr role='row'><th width='50'>Bill</th><th>Title</th><th>Status</th><th>Sponsor</th><th>Introduced</th><th>Updated</th></tr></thead><tbody>";
    
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
        
		// Bill number
		prefixnum = result.prefix + "-";
		if (result.number < 10) {
			prefixnum += "00";
		} else if (result.number < 100) {
			prefixnum += "0";
		}
		prefixnum += result.number;
		
		// Title of the bill
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

		// Bill sponsor
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

		// Find the status of a bill by the status of the last event
		last_event = result.events[result.events.length - 1];
        switch(last_event.status){
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
    
        html += template
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{billId}}", billId)
            .replace("{{prefixnum}}", prefixnum)
            .replace("{{title}}", title)
            .replace("{{status}}", status)
            .replace("{{sponsor}}", sponsor)
            .replace("{{introdate}}", introdate)
            .replace("{{updated}}", updated);
                
    }
    
    // Close the table
    html += "</tbody></table>";
            
    // Append the html to the web page
	 $("#main").html(html);

}