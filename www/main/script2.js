function loadBill(data, data2) {
    
    template = "<div class='span-5'><h3>Overview</h3><br><b>{{prefixnum}}:&nbsp;{{title}}</b><br><br><b>Introduced: </b>{{introdate}}<br><b>Updated: </b>{{updated}}<br><b>Sponsor: </b>{{image}}{{sponsor}}<br><br><b>Description: </b>{{description}}<br><br><b>Link to Parliament of Canada: </b>{{summary}}<br><br><button onclick=\"voteBill()\">Upvote</button> <button onclick=\"voteBill()\">Downvote</button></div>";

    result = data.results[0];

    title = result.title.EN;
    if ((description = result.summary.EN) == null) {
        description = "N/A";
    } else {
        description = "<br>" + description.split("\n").join("<br><br>");
    }
    prefixnum = result.prefix + result.number;
    if ((summary = result.legislative_summary.EN) == null) {
        summary = "N/A";
    } else {
        summary = "<a href=\"" + result.legislative_summary.EN + "\">" + 
            result.legislative_summary.EN + "</a>";
    }
    image = "";
    sponsor = "N/A";
    for (var j = 0; j < data2.results.length; j ++){
        if (data2.results[j].id == result.sponsor){
            name = data2.results[j].name.given + " " + data2.results[j].name.family;
            sponsor = "<a href='representatives.php?rep=" + result.sponsor + "'>" + name + "</a>";
            imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + data2.results[j].image_id;
            image = "<div style='width:142px;height:230px;'><img src=" + imgUrl +"></img></div>";
            break;
        }
    }
    
    intro = new Date(result.introduction * 1000);
    introdate = intro.toUTCString();
    
    up = new Date(result.last_updated);
    updated = up.toUTCString();

    html = template
        .replace("{{prefixnum}}", prefixnum)
        .replace("{{title}}", title)
        .replace("{{introdate}}", introdate)
        .replace("{{updated}}", updated)
        .replace("{{description}}", description)
        .replace("{{summary}}", summary)
        .replace("{{sponsor}}", sponsor)
        .replace("{{image}}", image);
                
    // Append the html to the web page
    $("#main").html(html);
    
}

function voteBill () {

}

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

    // Create a row for each bill
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
		//introdate = intro.getUTCFullYear() + "-" + intro.getUTCMonth() + "-" + intro.getUTCDate();
        //introdate = intro.toUTCString();
		
		// Updated date
        up = new Date(result.last_updated);
		updated = (up.toJSON()).slice(0,10) + " " + up.toLocaleTimeString();//+ up.toTimeString();//(up.toJSON()).slice(12,19);
		//updated = up.getUTCFullYear() + "-" + up.getUTCMonth() + "-" + up.getUTCDate()
        //updated = up.toUTCString();

		// Bill sponsor
        sponsorId = result.sponsor;					
        sponsorIndex = sponsorIdList.indexOf(sponsorId);
        if (sponsorIndex == -1){
            sponsor = "-";
        } else {
            //Prints the first and last name of sponsor (enabled)
            sponsor = "<a href='representatives.php?rep=" + sponsorId + "'>" + 
				data2.results[sponsorIndex].name.given + " " + data2.results[sponsorIndex].name.family + "</a>";
            //displays the image of the sponsor (disabled/does not work)
            //sponsor = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + data2.results[sponsorIndex].image_id;

        }

		// Status of a bill by looking at the status from the last event
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
    
//    //TODO change it so that 100 entries are displayed. @Leo, note, an error pops up if we use the code below. 
//    $(document).ready( function() {
//   	  $('#bill-table').dataTable( {
//    	    "iDisplayLength": 100
//   	  } );
//    	} );  
}