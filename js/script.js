$(document).ready(function(){
	var api="https://fcc-weather-api.glitch.me/api/current?";
	var lat;
	var lon;
	var currentTempInCelsius;
	var tempUnit ="C"
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			lat = "lat="+position.coords.latitude;
			lon = "lon="+position.coords.longitude;
			getWeather(lon,lat);
		}
		);
	}
	else{
		alert("The browser doesn't support geolocation.");
	}
$("#tempconvert").click(function(){
	var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
	var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
	$("#temp" ).text(fahTemp + " " + String.fromCharCode(176));
}
else{
	     $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
}
});

function getWeather(lon,lat){
	var urlString = api + lon +"&" +lat;
	$.ajax({
		url : urlString ,
		success :function(result){
			$("#city").text(result.name+",");
			$("#country").text(result.sys.country );
			currentTempInCelsius = Math.round(result.main.temp *10)/10;
			$("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
			$("#tempunit").text(tempUnit);
			$("#wind-speed").text("Wind" + " " +Math.round(result.wind.speed)+"km/h");
			$("#icon").text(result.weather[0].main);

			iconGenerator(result.weather[0].main);
		}
	});
}
function iconGenerator(icon){
var icon=icon.toLowerCase()
switch(icon){
	case 'drizzle':
	$("#icon").append("<br><img src='./images/drizzle.png'>")
	break;
	case 'clouds':
	$("#icon").append("<br><img src='./images/cloud.png'>")
	break;
	case 'rain':
	$("#icon").append("<br><img src='./images/rain.png'>")
	break;
	case 'snowy':
	$("#icon").append("<br><img src='./images/snowy.png'>")
	break;
	case 'clear':
	$("#icon").append("<br><img src='./images/clear.png'>")
	break;
	case 'thunderstom':
	$("#icon").append("<br><img src='./images/thunderstom.png'>")
	break;


}

}



});