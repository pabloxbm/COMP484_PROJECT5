function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.2390, lng: -118.5291 }, // CSUN
        zoom: 17,
        disableDoubleClickZoom: true,
        gestureHandling: "none",
        zoomControl: false,
        scrollwheel: false,
        disableDefaultUI: true,
//         mapTypeControlOptions: {
//      mapTypeIds: ['roadmap', MY_MAPTYPE_ID]
//   },
        mapTypeId: 'roadmap',
        styles: [
            { elementType: "labels", stylers: [{ visibility: "off" }] }
        ]
    });
}
// async function init() {
//     const { Map3DElement } = await google.maps.importLibrary('maps3d');
//     const map = new Map3DElement({
//         center: {
//             lat: 37.789,
//             lng: -122.401,
//             altitude: 0,
//         },
//         range: 2200,
//         tilt: 45,
//         heading: 188,
//     });
//     map.mode = 'SATELLITE';
//     document.body.append(map);
// }

// void init();