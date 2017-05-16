function update() {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var apikey = "[REPLACE_WITH_PERSONAL_KEY_FROM_APIXU.COM]";
	var zipcode = "[REPLACE_WITH_DESIRED_ZIPCODE]";
	var url = "https://api.apixu.com/v1/forecast.json?key=" + apikey + "&q=" + zipcode + "&days=6";
	$.getJSON(url).done(function( data ) {
		var offset = 1;
		var date = new Date();
		var days = data['forecast']['forecastday'];
		// Set Last Updated Text
		$("#last-updated").html("Updated: " + date.toUTCString());
		// Parse Current and 12-Hour Data
		$("#current-month").html(monthNames[date.getMonth()]);
		$("#current-day").html(date.getDate());
		$("#current-weekday").html(weekdayNames[date.getDay()]);
		$("#current-temp").html(Math.round(days[0]['hour'][date.getHours()]['temp_f']) + "&deg;F");
		$("#current-wind").html(Math.round(days[0]['hour'][date.getHours()]['wind_mph']) + " mi/h");
		$("#current-humidity").html(Math.round(days[0]['hour'][date.getHours()]['humidity']) + "%");
		$("#current-condition").html(days[0]['hour'][date.getHours()]['condition']['text']);
		$("#current-icon").attr("src", "icons/" + data['current']['condition']['icon'].split("/")[6].split(".")[0] + ".svg");
		var temps = [];
		var min = 0;
		var max = 0;
		var hour = date.getHours() + 1;
		var d = 0;
		for (var i = 1; i < 13; i ++) {
			if (hour == 24) {
				d = 1;
				hour = 0;
			}
			var temp = Math.round(days[d]['hour'][hour]['temp_f']);
			if (i == 1) {
				min = temp;
				max = temp;
			}
			else if (min >= temp) {
				min = temp;
			}
			else if (max <= temp) {
				max = temp;
			}
			temps[i - 1] = temp;
			$("#ht" + i).html(temp);
			var ampm = days[d]['hour'][hour]['time'].split(" ")[1].split(":")[0] > 11 ? "PM" : "AM";
			var h = days[d]['hour'][hour]['time'].split(" ")[1].split(":")[0];
			if (h == 0) {
				h = 12;
			}
			else if (h > 12) {
				h -= 12;
			}
			h = Math.round(h);
			var m = days[d]['hour'][hour]['time'].split(" ")[1].split(":")[1];
			$("#hour" + i).html(h + ampm);
			hour ++;
		}
		var delta_height = (window.innerHeight / 3) / (max - min);
		for (var i = 1; i < 13; i ++) {
			$("#bar" + i).css("height", min + (temps[i - 1] - min) * delta_height + "px");
		}
		// Parse Next 5 Days Data
		for (var i = 0; i < 5; i ++) {
			date.setDate(date.getDate() + offset);
			var month = date.getMonth();
			$("#dm" + i).html(monthNames[month]);
			var day = date.getDate();
			$("#dd" + i).html(day);
			var week = date.getDay();
			$("#dw" + i).html(weekdayNames[week]);
			var high = days[i + offset]['day']['maxtemp_f'];
			$("#dh" + i).html(Math.round(high))
			var low = days[i + offset]['day']['mintemp_f'];
			$("#dl" + i).html(Math.round(low));
			var icon = days[i + offset]['day']['condition']['icon'].split("/")[6].split(".")[0];
			$("#di" + i).attr("src", "icons/" + icon + ".svg");
		}
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		setTimeout(update(), 2000);
	});
}

update();
setInterval(update, 1000*60*30);