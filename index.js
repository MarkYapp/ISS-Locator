
const currentCoordinatesEndpoint = "https://api.wheretheiss.at/v1/satellites/25544";
const mapquestEndpoint = "http://www.mapquestapi.com/geocoding/v1/address";
const mymap = L.map("map").setView([0.00, 0.00], 2);
const streetLayer = L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(mymap);
const ISSIcon = L.icon({
    iconUrl: "file:///Users/markyapp/projects/api-capstone/noun_iss_956251.svg",
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -20], // point of the popup relative to icon's center
});

// navigator.geolocation.getCurrentPosition(console.log);

function getISSData(callback) {
    const settings = {
        url: currentCoordinatesEndpoint,
        success: callback,
        error: function(err) {
            console.log("In local error callback."); //work on error function
        }
    }
    $.ajax(settings);
}


function generateIcon(data) {
    let currentLat = data.latitude;
    let currentLon = data.longitude;
    let velocity = data.velocity;
    let altitude = data.altitude;
    let daynum = data.daynum;
    $("img.leaflet-marker-icon").addClass("fade");
    // console.log(`ISS Coordinates: Latitude: ${currentLat}, Longitude: ${currentLon}`);
    let issIcon = L.marker([currentLat, currentLon], {icon: ISSIcon, alt: "Icon of the International Space Station", keyboard: true});
    issIcon.addTo(mymap).addTo(mymap).bindPopup(`Latitude: ${currentLat}<br>Longitude: ${currentLon}`);
    // L.circle([currentLat, currentLon], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(mymap);
}

$(document).ajaxSuccess(function removeIcon() {
    console.log(xhr.responseXML);
    
})



// L.marker([51.49, -0.1], {icon: ISSIcon}).addTo(mymap).bindPopup("hello");

L.Control.geocoder().addTo(mymap);

function handleUserAddress() {
    $(".submit-button").click(event=> {
        event.preventDefault();
        let userAddress = $(".user-address").val();
        console.log(userAddress);
        $(".user-address").val("");  //clear input
        convertToCoordinates(userAddress, printCoordinates);
    });
}

function convertToCoordinates(searchTerm, callback) {
    const settings = {
        url: bingGeocoderEndpoint,
        key: bingAPIKey,
        q: searchTerm,
        success: callback,
        error: function(err) {
            console.log("In local error callback.");
        }
    }
    $.ajax(settings);
}

function printCoordinates(data) {
    console.log('printCoordinates ran');
    console.log(data);
    userLat = data.resourceSets[0].resources[0].point.coordinates[0];
    userLng = data.resourceSets[0].resources[0].point.coordinates[1];
    console.log(userLat);
    console.log(userLng);
}

function apiCall() {
    getISSData(generateIcon);
}

$(function runApp() {

    setInterval(apiCall, 3000);
    // setInterval(removeIcon, 3000);
    handleUserAddress();
});