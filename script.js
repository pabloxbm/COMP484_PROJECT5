let map;
let currQuestion = 0;
let score = 0;

const locations = [
    {
        name: "Student Recreation Center",
        bounds: { north: 34.24063, south: 34.23931, east: -118.52468, west: -118.52523 }
    },
    {
        name: "Valeria (University) Hall",
        bounds: { north: 34.24024, south: 34.23926, east: -118.53186, west: -118.53240 }
    },
    {
        name: "University Libary",
        bounds: { north: 34.24043, south: 34.23956, east: -118.52861, west: -118.53006 }
    },
    {
        name: "Maple Hall",
        bounds: { north: 34.23783, south: 34.23737, east: -118.53093, west: -118.53154 }
    },
    {
        name: "Live Oak Hall",
        bounds: { north: 34.23838, south: 34.23816, east: -118.52763, west: -118.52881 }
    }
];



const mapTypeBtn = document.querySelector("#maptype");
const currQuestionBox = document.querySelector("#questions");
const resultBox = document.querySelector("#results");
const scoreBox = document.querySelector("#final-score");


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

function checkType(e){
    mapTypeBtn.checked? map.setMapTypeId('satellite'):map.setMapTypeId('roadmap');
    // alert("test");
}



function checkAnswer(e) {
    let locationBounds = locations[currQuestion].bounds;

    if(e.latLng.lat() < locationBounds.north && e.latLng.lat() > locationBounds.south && e.latLng.lng() < locationBounds.east  && e.latLng.lng() > locationBounds.west){
        score++;
        drawRectangle(locationBounds, true);
        updateAnswer(true);
    }else{
        drawRectangle(locationBounds, false);
        updateAnswer(false);
    }
    currQuestion++;

    if(currQuestion == locations.length){
        // final question
        let wrong = currQuestion-score;
        resultBox.innerHTML = score + " Correct, "+ wrong+" Incorrect";
    }else{
        updateQuestion();
    }
    // updateScores();
}


function updateAnswer(correct){
    
    let newAnswer = document.createElement("p");
    newAnswer.classList.add("answer-attempt");
    newAnswer.style.color = correct ? "#1d951d" : "#FF0000";
    newAnswer.innerHTML = correct? "Your answer is correct!!" : "Sorry wrong location.";
    currQuestionBox.append(newAnswer);
}

function drawRectangle(bounds, correct) {
    new google.maps.Rectangle({
        strokeColor: correct ? "#1d951d" : "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        bounds: bounds,
        map: map,
        fillColor: correct ? "#1d951d" : "#FF0000",
        fillOpacity: 0.4,
    });
}

mapTypeBtn.addEventListener("click", this.checkType);

function updateQuestion(){
    let newQuestion = document.createElement("p");
    newQuestion.classList.add("current-question");
    newQuestion.innerHTML = "Where is " + locations[currQuestion].name + "?";
    currQuestionBox.append(newQuestion);
}
// function updateEventListener(){
    
//     map.addListener("dblclick", this.checkAnswer);
//     map.addListener("click", alert("test"));

// }
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.2390, lng: -118.5291 }, 
        // bounds: {north: 34.24277, south: 34.23563, east: -118.52467, west: -118.53375},
        zoom: 17.45,
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

    // updateEventListener();
    map.addListener("dblclick", checkAnswer);
    updateQuestion();
}
