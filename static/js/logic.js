var coords = [40.0902 , -106.7129];
var mapZoomLevel = 5;

var myMap = L.map("map" , {
    center : coords,
    zoom : mapZoomLevel
})

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    accessToken: API_KEY,
    id: "mapbox/streets-v11",
  }).addTo(myMap);


url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url , function(data) {
    //console.log(data)

    var features = data.features
    //console.log(features)

    var locations = [];
    var radius = [];

    for (var i = 0 ; i < features.length ; i++) {
        locations.push([features[i].geometry.coordinates[1] , features[i].geometry.coordinates[0]]);
        radius.push(features[i].properties.mag)

        var color = "";
        if (radius[i] >= 5) {
            color = "Red";
        } else if (radius[i] >= 4) {
            color = "OrangeRed";
        } else if (radius[i] >= 3) {
            color = "Orange";
        } else if (radius[i] >= 2) {
            color = "Gold";
        } else if (radius[i] >= 1) {
            color = "GreenYellow";
        } else {
            color = "Lime";
        };

        L.circleMarker(locations[i], {
            radius: radius[i] * 3,
            fillOpacity : 1,
            weight : 0.5,
            color : "black",
            fillColor : color
        }).addTo(myMap);
    };

    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend");
        div.innerHTML += '<i style="background: Lime"></i><span>0-1</span><br>';
        div.innerHTML += '<i style="background: GreenYellow"></i><span>1-2</span><br>';
        div.innerHTML += '<i style="background: Gold"></i><span>2-3</span><br>';
        div.innerHTML += '<i style="background: Orange"></i><span>3-4</span><br>';
        div.innerHTML += '<i style="background: OrangeRed"></i><span>4-5</span><br>';
        div.innerHTML += '<i style="background: Red"></i><span>5+</span><br>';
        return div;
    };  
    legend.addTo(myMap);
});