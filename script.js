let map;
let currQuestion = 0;
let score = 0;
let hintsCount = 0;

let answerRects = [];
let answerHints = [];

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
        bounds: { north: 34.23842, south: 34.23816, east: -118.52763, west: -118.52881 }
    }
];


        // library
        // new google.maps.Marker({
        //     position: {lat: 34.23959, lng: -118.52934 },
        //     icon: svgMarker,
        //     map: map,
        // });
        //src
        // new google.maps.Marker({
        //     position: {lat: 34.23952, lng: -118.52496 },
        //     icon: svgMarker,
        //     map: map,
        // });
        // uni hall
        // new google.maps.Marker({
        //     position: {lat: 34.23930, lng: -118.53220 },
        //     icon: svgMarker,
        //     map: map,
        // });
        // like oak
        // new google.maps.Marker({
        //     position: {lat: 34.23781, lng: -118.52825 },
        //     icon: svgMarker,
        //     map: map,
        // });
        // Maple
        // new google.maps.Marker({
        //     position: {lat: 34.23712, lng: -118.53122 },
        //     icon: svgMarker,
        //     map: map,
        // });

        const hints = [
    {
        name: "Student Recreation Center",
        h1: { position: {lat: 34.23952, lng: -118.52496 }},
        h2: { position: {lat: 34.23998, lng: -118.53089}},
        h3: { position: {lat: 34.23712, lng: -118.53122 }}
    },
    {
        name: "Valeria (University) Hall",
        h1: { position: {lat: 34.23930, lng: -118.53220 }},
        h2: { position: {lat: 34.23784, lng: -118.53076}},
        h3: { position: {lat: 34.23712, lng: -118.53122 }}
    },
    {
        name: "University Libary",
        h1: { position: {lat: 34.23959, lng: -118.52934 }},
        h2: { position: {lat: 34.23998, lng: -118.53089}},
        h3: { position: {lat: 34.23956, lng: -118.52705}}
    },
    {
        name: "Maple Hall",
        h1: { position: {lat: 34.23712, lng: -118.53122 }},
        h2: { position: {lat: 34.23784, lng: -118.53076}},
        h3: { position: {lat: 34.23956, lng: -118.52705}}
    },
    {
        name: "Live Oak Hall",
        h1: { position: {lat: 34.23781, lng: -118.52825 }},
        h2: { position: {lat: 34.23784, lng: -118.53076}},
        h3: { position: {lat: 34.23998, lng: -118.53089}}
    }
]


const mapTypeBtn = document.querySelector("#maptype");
const currQuestionBox = document.querySelector("#questions");
const resultBox = document.querySelector("#results");
const scoreBox = document.querySelector("#final-score");
const hintsBtn = document.querySelector("#hints-btn");
const map3d = document.querySelector("#map-3d");
const resetBtn = document.querySelector("#reset-button")


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

function showHints(e){
    e.preventDefault()
    hintsCount++;
    const svgMarker = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillColor: "orange",
        fillOpacity: 0.9,
        strokeColor: "black",
        strokeWeight: 1,
        rotation: 0,
        scale: 4,
        anchor: new google.maps.Point(0, 20),
    };

    const hint1 = new google.maps.Marker({
        position: hints[currQuestion].h1.position,
        icon: svgMarker,
        map: map,
    });

    answerHints.push(hint1);

    const hint2 = new google.maps.Marker({
        position: hints[currQuestion].h2.position,
        icon: svgMarker,
        map: map,
    });

    answerHints.push(hint2);
    const hint3 = new google.maps.Marker({
        position: hints[currQuestion].h3.position,
        icon: svgMarker,
        map: map,
    });

    answerHints.push(hint3);

}

function checkType(e){

    if (mapTypeBtn.value == "roadmap") {
        document.getElementById("map").style.display = "block";
        map.setMapTypeId('roadmap');
        map.setTilt(0);
        map.setZoom(17.45);
        locations[0].bounds.north = 34.24063;
        locations[1].bounds.north = 34.24024;
        locations[2].bounds.north = 34.24043;
        locations[3].bounds.north = 34.23783;
        locations[4].bounds.north = 34.23842;
        map3d.style.display = "none";
    } else if(mapTypeBtn.value == "satellite"){
        document.getElementById("map").style.display = "block";
        map.setMapTypeId('satellite');
        map.setTilt(55);
        map.setZoom(17.52);
        locations[0].bounds.north = 34.24073;
        locations[1].bounds.north = 34.24034;
        locations[2].bounds.north = 34.24053;
        locations[3].bounds.north = 34.23793;
        locations[4].bounds.north = 34.23852;
        map3d.style.display = "none";
    }else{
        document.getElementById("map").style.display = "none";
        map3d.style.display = "block";
    }
    // mapTypeBtn.checked? map.setMapTypeId('satellite'):map.setMapTypeId('roadmap');
    // alert("test");
}



function checkAnswer(e) {
    mapTypeBtn.disabled = true;
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
        resultBox.innerHTML = score + " Correct, "+ wrong+" Incorrect. Hints Used: "+hintsCount;
        
        
        
    }else{
        updateQuestion();
    }
    // updateScores();
}


function updateAnswer(correct){
    answerHints.forEach(e => e.setMap(null));
    answerHints = [];
    
    let newAnswer = document.createElement("p");
    newAnswer.classList.add("answer-attempt");
    newAnswer.style.color = correct ? "#1d951d" : "#FF0000";
    newAnswer.innerHTML = correct? "Your answer is correct!!" : "Sorry wrong location.";
    currQuestionBox.append(newAnswer);
}

function drawRectangle(bounds, correct) {
    const currRect = new google.maps.Rectangle({
        strokeColor: correct ? "#1d951d" : "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        bounds: bounds,
        map: map,
        fillColor: correct ? "#1d951d" : "#FF0000",
        fillOpacity: 0.4,
    });
    answerRects.push(currRect);
}

//referenece: https://developer.mozilla.org/en-US/docs/Web/API/Element/children
function resetGame(e){
    e.preventDefault();
    for (const child of currQuestionBox.children) {
        child.innerHTML = "";
    }
    currQuestion = 0;
    score = 0;
    resultBox.innerHTML = "";
    hintsCount = 0;
    updateQuestion();
    
    
    answerHints.forEach(e => e.setMap(null));
    answerHints = [];
    answerRects.forEach(e => e.setMap(null));
    answerRects = [];
    if(mapTypeBtn.hasAttribute("disabled")){
        mapTypeBtn.toggleAttribute("disabled");
    }
}
mapTypeBtn.addEventListener("change", this.checkType);
hintsBtn.addEventListener("click", this.showHints);
resetBtn.addEventListener("click", this.resetGame);

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
