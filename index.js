
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


function getISSData(callback) {
    const url = ISSCoordinatesEndpoint + '?' + "units=miles";
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => callback(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

/*set the initial map view with the ISS centered*/
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
}

function apiCall() {
    getISSData(generateIcon);
}

/*run the app at page load. Call getISSData first to set the intial view, second to add the ISS icon on page load, 
then call setInterval to run getISS data every 2 seconds*/
$(function runApp() {
    getISSData(setInitialView);
    getISSData(generateIcon);
    setInterval(apiCall, 2000);
});