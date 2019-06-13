/*
  Name:         Ised Gongora
  Course Name:  ICT-4510-1 Final Project
  Date:         06-10-2019
  Description:  - Must contain the restaurant’s contact information, address and hours of operation. 
                  The address can be DU (2150 East Evans Avenue Denver, CO 80208) and the hours can be 9:00am to 9:00pm.  
                - Make use of the Leaflet.js library to map the restaurant’s coordinates. You can use DU's 
                  coordinates (LAT: 39.678380, LONG: -104.961753)  
*/
'use strict';

//Request an access token from Mapbox (https://account.mapbox.com/auth/signup/
mapboxgl.accessToken = 'pk.eyJ1IjoiaXNlZGdhIiwiYSI6ImNqdnN2NTM3dDM5cmI0OHVpOGVucXNqZHYifQ.vwNz36plxaIaaWcYgt5NiQ';

var mapboxClient = mapboxSdk({
    accessToken: mapboxgl.accessToken
});
mapboxClient.geocoding.forwardGeocode({
        query: 'University of Denver',
        autocomplete: false,
        limit: 1
    })
    .send()
    .then(function(response) {
        if (response && response.body && response.body.features && response.body.features.length) {
            var feature = response.body.features[0];

            //Set the map view to the following coordinates:  latitude: 39.678121  longitude: -104.961753
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-104.961753, 39.678121], //Use DU's coordinates (LAT: 39.678380, LONG: -104.961753)  
                zoom: 15, // Add a zoom level of 15
                maxZoom: 20 //apply a max zoom of 20
            });
            new mapboxgl.Marker()
                .setLngLat([-104.961753, 39.678121])
                .addTo(map);
        }
    });