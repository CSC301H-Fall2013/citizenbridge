function loadBill(data) {
    
    template = "<div class='span-5'><h3>Overview</h3><br><b>{{prefixnum}}:&nbsp;{{title}}</b><br><br><b>Introduced: </b>{{introdate}}<br><b>Updated: </b>{{updated}}<br><b>Sponsor: </b>{{sponsor}}<br><br><b>Description: </b>{{description}}<br><br><b>Link to Parliament of Canada: </b>{{summary}}<br></div>";

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
<<<<<<< HEAD
    sponsor = result.sponsor;

=======
    image = "";
    sponsor = "N/A";
    for (var j = 0; j < data2.results.length; j ++){
        if (data2.results[j].id == result.sponsor){
            sponsor = data2.results[j].name.given + " " + data2.results[j].name.family;
            imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + data2.results[j].image_id;
            image = "<div style='width:142px;height:230px;'><img src=" + imgUrl +"></img></div>";
            break;
        }
    }
    
>>>>>>> parent of 0d46c6b... Link sponsor from bill to their rep page
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
        .replace("{{sponsor}}", sponsor);
                
    // Append the html to the web page
    $("#main").html(html);
    
}

function loadBillList (data) {
    // Template for bill rows
    var template = "<tr class='row'></td><td><a href='bills.php?bill={{billId}}'>{{prefixnum}}</a></td><td><a href='bills.php?bill={{billId}}'>{{title}}</a></td><td><a href='bills.php?bill={{billId}}'>{{status}}</a></td><td><a href='bills.php?bill={{billId}}'>{{sponsor}}</a></td><td><a href='bills.php?bill={{billId}}'>{{introdate}}</a></td><td><a href='bills.php?bill={{billId}}'>{{updated}}</a></td></tr>";
            
    //Create the table and the header
    var html = "<table id='bill-table' class='wet-boew-tables'><thead><tr role='row'><th>Bill</th><th>Title</th><th>Status</th><th>Sponsor</th><th>Introduced</th><th>Updated</th></tr></thead><tbody>";
            
    // Create a row for each bill
    for (var i = 0; i < data.results.length; i++) {
    
        // Get all the required data from the JSON
        var result, prefixnum, title, up, update, sponsor, status, intro, introdate;
    
        result = data.results[i];
        billId = result.id;
        prefixnum = result.prefix + "-";
		if (result.number < 10) {
			prefixnum += "00";
		} else if (result.number < 100) {
			prefixnum += "0";
		}
		prefixnum += result.number;
        title = result.short_title.EN;
        if (title == null) { //short_title may not always be available.
            title = result.title.EN;
        };
    
    
        // Convert date data into readable string
        intro = new Date(result.introduction * 1000);
        introdate = intro.toUTCString(); 
        up = new Date(result.last_updated);
        updated = up.toUTCString();
		//sponsor = result.id; //to delete later, for checking purposes
        sponsor = result.sponsor; //2TODO: Link to a name/pic/something that isn't just a number.			
		
		last_event = result.events.pop();

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


//( function() {
//	loadBillList = function() 
//	{
//	/**
//	 * A parsing function that parses the JSON data from the
//	 * parliamentData API and appends a table to the html
//	 * 
//	 * parseReps(data)
//	 * 
//	 *	@param	JSON	data
//	 * 					representative JSON data from the parliamentData
//	 * 					API 
//	 */
//        parseBills = function(data) {
//            // Template for bill rows
//            var template = "<tr class='row' onclick='loadBills({{billId}})'></td><td>{{prefixnum}}</td><td>{{title}}</td><td>{{status}}</td><td>{{sponsor}}</td><td>{{introdate}}</td><td>{{updated}}</td></tr>";
//            
//            //Create the table and the header
//            var html = "<table id='bill-table' class='wet-boew-tables'><thead><tr role='row'><th>Bill</th><th>Title</th><th>Type</th><th>Sponsor</th><th>Introduced</th><th>Updated</th></tr></thead><tbody>";
//            
//            // Create a row for each bill
//            for (var i = 0; i < data.results.length; i++) {
//    
//                // Get all the required data from the JSON
//                var result, prefixnum, title, up, update, sponsor, status, intro, introdate;
//    
//                result = data.results[i];
//                billId = result.id;
//                prefixnum = result.prefix + result.number;
//                title = result.short_title.EN;
//                if (title == null) { //short_title may not always be available.
//                    title = result.title.EN;
//                };
//    
//    
//                // Convert date data into readable string
//                intro = new Date(result.introduction * 1000);
//                introdate = intro.toUTCString(); 
//                up = new Date(result.last_updated);
//                updated = up.toUTCString();
//    
//                sponsor = result.sponsor; //2TODO: Link to a name/pic/something that isn't just a number.			
//				//sponsor = getRep(result.sponsor); //Failed function to get rep name.
//
//                switch(result.status){
//                    case 0: status = "Bill defeated / not proceeded with"; break;
//                    case 1: status = "Pre-study of the commons bill"; break;
//                    case 2: status = "Introduction and first reading"; break;
//                    case 3: status = "Second Reading and/or debate at second reading"; break;
//                    case 4: status = "Referral to committee"; break;
//                    case 5: status = "Committee report presented / debate at condisteration of committee report"; break;
//                    case 6: status = "Debate at report stage"; break;
//                    case 7: status = "Concurrence at report stage"; break;
//                    case 8: status = "Committee report adopted, 3rd reading and/or debate at 3rd reading"; break;
//                    case 9: status = "Placed in order of precedence / message sent to the House of Commons"; break;
//                    case 10: status = "Jointly seconded by or concurrence in the Senate amendments"; break;
//                    case 20: status = "Royal assent / completed";break;
//                    default: status = "Unknown"; break;
//                }
//    
//                html += template
//                        .replace("{{billId}}", billId)
//                        .replace("{{prefixnum}}", prefixnum)
//                        .replace("{{title}}", title)
//                        .replace("{{status}}", status)
//                        .replace("{{sponsor}}", sponsor)
//                        .replace("{{introdate}}", introdate)
//                        .replace("{{updated}}", updated);
//                
//            }
//    
//            // Close the table
//            html += "</tbody></table>";
//            
//            // Append the html to the web page
//            $("#main").html(html);
//            
//            // Make the table sortable, searchable and customizable using
//            // the WET framework
//            $(document).ready( function () {
//                $('#bill-table').dataTable()
//            });
//        }
//        ParlData.bbls(parseBills);
//    }
//	
//	// Failed function to get rep name.
//	/*
//	getRep = function(repID) {
//			var repName;
//			var parseReps = function(data) {
//				var rep = data.results[0];
//				repName = rep.name.given + " " + rep.name.family;
//			}
//			ParlData.reps(repID, "all", parseReps);
//			return repName;
//	}*/
//
//	//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  sh__Load_Rep_info
//	loadBills = function(billID) {
//			/**
//			 * A parsing function that parses the JSON data from the
//			 * parliamentData API and loads the information of a bill.
//			 * 
//			 * parseReps(data)
//			 * 
//			 *	@param	JSON	data
//			 * 					representative JSON data from the parliamentData
//			 * 					API 
//			 */
//			var parseBills = function(data) {
//				// Create the table and header
//                
//                template = "<button onclick='loadBillList()'>Back</button><br><div class='span-5'><summary>Overview</summary><br><b>{{prefixnum}}:&nbsp;{{title}}</b><br><br><b>Introduced: </b>{{introdate}}<br><b>Updated: </b>{{updated}}<br><b>Sponsor: </b>{{sponsor}}<br><br><b>Description: </b>{{description}}<br><br><b>Link to Parliament of Canada: </b>{{summary}}<br></div>";
//
//				result = data.results[0];
//
//				//alert(JSON.stringify(result))
//				title = result.title.EN;
//				if ((description = result.summary.EN) == null) {
//					description = "N/A";
//				} else {
//					description = "<br>" + description.split("\n").join("<br><br>");
//				}
//				prefixnum = result.prefix + result.number;
//				if ((summary = result.legislative_summary.EN) == null) {
//					summary = "N/A";
//				} else {
//					summary = "<a href=\"" + result.legislative_summary.EN + "\">" + 
//								result.legislative_summary.EN + "</a>";
//				}
//				sponsor = result.sponsor;
//
//				intro = new Date(result.introduction);
//				introdate = intro.toUTCString();
//
//				up = new Date(result.last_updated);
//				updated = up.toUTCString();
//
//				html = template
//					.replace("{{prefixnum}}", prefixnum)
//					.replace("{{title}}", title)
//					.replace("{{introdate}}", introdate)
//					.replace("{{updated}}", updated)
//					.replace("{{description}}", description)
//					.replace("{{summary}}", summary)
//                    .replace("{{sponsor}}", sponsor);
//                
//				// Append the html to the web page
//				$("#main").html(html);
//				
//				// Make the table sortable, searchable and customizable using
//				// the WET framework
//				// $(document).ready( function () {
//				// 	$('#rep-table').dataTable()
//				// });
//			}
//			ParlData.bbls(billID, "all", parseBills);
//			
//	}
//
//
//
//	//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Auto_execution_start.
//	loadBillList();
//	//loadRep(78554); //http://api.parliamentdata.ca/representatives/78554/all
//	//loadBills(5079843);
//}());
