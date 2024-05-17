const URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const RADIUS_MIN = 2;
const RADIUS_COEF = 7;
const COLOR_COLORS = ["#ff0000","#b2d8d8","#66b2b2", "#008080", "#006666", "#004c4c"]
const COLOR_DEPTHS =[10, 30, 50 , 70, 90]

// Creating the map object
let myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



function getRadius(geoJsonPoint){
    magnitude = geoJsonPoint.properties.mag
    let calc_radius = RADIUS_COEF*magnitude
    radius = Math.max(RADIUS_MIN, calc_radius)
    return radius;
}

function getColor(geoJsonPoint){
    let depth = geoJsonPoint.geometry.coordinates[2];
    console.log(depth);
    if (depth < COLOR_DEPTHS[0]){
        return COLOR_COLORS[0]
    } else if (depth < COLOR_DEPTHS[1])
    return "blue";
}

function makeMarker(geoJsonPoint, latlng) {
    // console.log(geoJsonPoint)
    let circleOptions = {
        radius: getRadius(geoJsonPoint),
        fillColor: getColor(geoJsonPoint),
        fillOpacity: 0.7
    }
    let marker = L.circleMarker(latlng, circleOptions);
    return marker;
}

d3.json(URL).then(function (response) {
    let geojsonOptions = {
        pointToLayer: makeMarker
    }
    L.geoJson(response, geojsonOptions).addTo(myMap);
})



{/* <i style="background-color: COLOR_COLORS[i]">&emsp;&emsp;</i> 10 - 20 */}