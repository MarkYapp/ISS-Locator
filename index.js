
const ISSCoordinatesEndpoint = "https://api.wheretheiss.at/v1/satellites/25544";
const map = L.map("map");
const streetLayer = L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
const ISSIcon = L.icon({
    iconUrl: "noun_iss_956251.svg",
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -20], // point of the popup relative to icon's center
});

/*request the user allow access to their location
navigator.geolocation.getCurrentPosition(console.log);*/

function getISSData(callback) {
    const settings = {
        url: ISSCoordinatesEndpoint,
        data: {
            units: "miles"
        },
        success: callback,
        error: function(err) {
            console.log("In local error callback."); //work on error function
        }
    }
    $.ajax(settings);
}

/*set the initial map view to with the ISS centered*/
function setInitialView(data) {
    let lat = data.latitude;
    let lon = data.longitude;
    map.setView([lat, lon], 4);
}

/*add the ISS icon to the map*/
function generateIcon(data) {
    let lat = data.latitude;
    let lon = data.longitude;
    let velocity = data.velocity;
    let altitude = data.altitude;
    $("img.leaflet-marker-icon").addClass("fade");
    /*assign the ISS icon to a variable, then add it to the map with the current ISS coordinates, along with a popup that displays data*/
    let issIcon = L.marker([lat, lon], {icon: ISSIcon, alt: "Icon of the International Space Station", keyboard: true});
    issIcon.addTo(map).addTo(map).bindPopup(`Latitude: ${lat}<br>Longitude: ${lon}<br>Velocity: ${velocity}<br>Altitude: ${altitude}`);
    // L.circle([currentLat, currentLon], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(map);
}

/*add search field to map*/
// L.Control.geocoder().addTo(map);

// function handleUserAddress() {
//     $(".submit-button").click(event=> {
//         event.preventDefault();
//         let userAddress = $(".user-address").val();
//         console.log(userAddress);
//         $(".user-address").val("");  //clear input
//         convertToCoordinates(userAddress, printCoordinates);
//     });
// }

// function convertToCoordinates(searchTerm, callback) {
//     const settings = {
//         url: bingGeocoderEndpoint,
//         key: bingAPIKey,
//         q: searchTerm,
//         success: callback,
//         error: function(err) {
//             console.log("In local error callback.");
//         }
//     }
//     $.ajax(settings);
// }

// function printCoordinates(data) {
//     console.log('printCoordinates ran');
//     console.log(data);
//     userLat = data.resourceSets[0].resources[0].point.coordinates[0];
//     userLng = data.resourceSets[0].resources[0].point.coordinates[1];
//     console.log(userLat);
//     console.log(userLng);
// }

function apiCall() {
    getISSData(generateIcon);
}

/*run the app at page load. Call getISSData first to set the intial view, second to add the ISS icon on page load, 
then call setInterval to run getISS data at regular intervals*/
$(function runApp() {
    getISSData(setInitialView);
    getISSData(generateIcon);
    setInterval(apiCall, 2000);
    // handleUserAddress();
});
