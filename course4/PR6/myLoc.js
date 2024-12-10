let watchId = null;
const ourCoords = { latitude: 48.9434069, longitude: 24.7318131 };
let map = L.map('map').setView([48.9434069, 24.7318131], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarker(lat, lon, message) {
    let marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(message).openPopup();
}

addMarker(48.9434069, 24.7318131, "College");

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let accuracy = position.coords.accuracy;
    let time = new Date().toLocaleTimeString();

    let div = document.getElementById("location");
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    div.innerHTML += ` (with ${accuracy} meters accuracy)`;
    let distance = document.getElementById("distance");
    distance.innerHTML = `You are ${computeDistance(position.coords, ourCoords)} km from the College`;

    addMarker(latitude, longitude, `Lat: ${latitude}, Lon: ${longitude}<br>Time: ${time}<br>Accuracy: ${accuracy}m`);
    map.setView([latitude, longitude], 15);
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code];
    if (error.code === 0 || error.code === 2) {
        errorMessage += " " + error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371;
    return Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

document.getElementById("goTo").onclick = function () {
    let lat = parseFloat(document.getElementById("latitude").value);
    let lon = parseFloat(document.getElementById("longitude").value);
    if (!isNaN(lat) && !isNaN(lon)) {
        addMarker(lat, lon, `Destination: Lat ${lat}, Lon ${lon}`);
        map.setView([lat, lon], 15);
    } else {
        alert("Please enter valid coordinates.");
    }
};

document.addEventListener('DOMContentLoaded', getMyLocation);