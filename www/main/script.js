( function() {
var parseReps = function(data) {
	for (var i = 0; i < data.results.length; i++) {
		result = data.results[i];
		var given, family, constituency, caucus;
		given = result.name.given;
		family = result.name.family;
		constituency = result.constituency.name.en;
		caucus = result.constituency.caucus.name.en;
		
		var html = "<tr>";
		html += "<td>" + given + "</td>";
		html += "<td>" + family + "</td>";
		html += "<td class='center'>" + caucus + "</td>";
		html += "<td class='center'>" + constituency + "</td>";
		html += "</tr>";
		
		$("#rep-table").append(html);
		
		console.log(result);
	}
	
	$(document).ready( function () {
			$('#example').dataTable()
	});
}
ParlData.reps(parseReps);
}());


