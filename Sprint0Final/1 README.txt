Hello, 

▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►   Project Details
Most of our details can be found on the homepage:
http://csc301h-fall2013.github.io/citizenbridge/  
This includes:
• Team / Vision  /Technology 
• links to: Meeting Minutes/ Attendence Spread sheet. 

▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  1st Build
In the first build, we implemented the first user story. 'Users get to see a list of their representatives.'

We started on this story to get us going with the W.E.T framework and starting to use the parlimentdata.ca api. 

The source code can be found in the 'www' section of our homepage, a hosted version can be found here:
http://levu.ca/citizenbridge/main/index-en.php

▇▇▇▇▇▇► Code
1) We used some PHP to download the list of representatives:
		<?php
		$homepage = file_get_contents('http://api.parliamentdata.ca/representatives/');

		$file = 'tmp/RepresentativeDownload.json';
		file_put_contents($file, $homepage);
		?> 

2) And then we used some Javascrpit and HTML to parse the file and then load it into a table:
		<table id="rep-table"> </table>
		<script type="text/javascript">
			
			$.getJSON( "tmp/RepresentativeDownload.json", function( data ) {
				$.each(data.results, function (i, item) {
					imgID = item.image_id;
					given = item.name.given;
					family = item.name.family;
					constituency = item.constituency.name.en;
					province = item.constituency.province.name.en;
					imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=";
					
					html  = "<th>" + '<img style="height:120px; width:77px" src="' + imgUrl + imgID + '"">' + "</th>"; 
					html += "<th>" + given + " " + family + "</th>";
					html += "<th>" + constituency + ", " + province + "</th>";

					
					$("#rep-table").append("<tr>"+ html +"</tr>");
					// console.log("Name: " + given + " " + family + "\n");
					// console.log(constituency + ", " + province);
				})
			});
		</script>


▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Testing:
- Manual testing was performed by visual inspection. When opening the page, it shows a list of representatives.







▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►   Goals 

This tuesday (1st october)
We spoke with our product champions about specific goals and targets. 

Their goal was as following: 
 - A user who never used the site before should be able to figure out how to access a bill within 3 minutes. 

They said that how we implement the goal will be compleatley up to us. 

So we broke it down into 3 sections: 
 - Representative view	 (This is where users will be able to get a view of the representatives)
 - Bills view 			 (This is where users will be able to see information about current bills)
 - Committees 			 (This is where peoplew will be able to see information about committees that are being held)

Our user stories revolve around adding features to 2 of these 3 categories. 
Dealing with committies will be an additional feature if time and resources are available.


▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►   User Stories
We have re-done most of our user stories. We broke them down into smaller more digestable chunks. 
We also added a lot more user stories. 

▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►   Note on representatives 
As per conversation with our Product Champion, this project will be primarily 
focused on implementing the user side features. It will be less focused on implementing features for representatives
for the time being. Thus we don't have a persona for a Representative just yet.
