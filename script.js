// using timer and leaderboard from previous proejct (lines 1-255), styles for leaderbaord and timer, as well as html elements for those as well.

// localStorage.clear();
// Two Intervals, one for the timer and related operations and a different one for the wpm section as if it were at the same pace as the timer it would look crazy
let intervalTimer = null;
let wpmIntervalTimer = null;
// let intervalTimerTest = null;

// variables holding various values
let currentWPM = 0;
var timerHS = 0;
var timerS = 0;
var timerM = 0;

// booleans and variables to check for certain events
let hasCompleted = false;
let isStopped = true;


// Getting the info for leaderboards
let userCount = (JSON.parse(localStorage.getItem("userTotal"))+1) || 0;
let scoresTimeMap= JSON.parse(localStorage.getItem("scoresTimeMap")|| '[]') ;

const theTimer = document.querySelector(".timer");
const leaderboardScores = document.querySelector(".leaderboard-scores");
const leaderboardScoresTime = document.querySelector("#leaderboard-scores-time div");

// Add leading zero to numbers 9 or below (purely for aesthetics):
function timerToString(){
    // check if less than 10 then add a leading 0
    let stringTimerHS = timerHS;
    if(stringTimerHS<10){
        stringTimerHS = "0"+stringTimerHS;
    }
    let stringTimerS = timerS;
    if(stringTimerS<10){
        stringTimerS = "0"+stringTimerS;
    }
    let stringTimerM = timerM;
    if(stringTimerM<10){
        stringTimerM = "0"+stringTimerM;
    }
    
    // return full string
    return stringTimerM+"."+stringTimerS+"."+stringTimerHS;
}

// Run a standard minute/second/hundredths timer:
function runningTimer(){
    // every 100 hundreths of a second add 1 to second and reset hundreths
    timerHS+=1;
    if(timerHS>= 100){
        timerHS = 0;
        timerS+=1;
    }
    // evrey 60 seconds and 1 to minute and reset seconds
    if(timerS>= 60){
        timerS = 0;
        timerM+=1;
    }
    // console.log("running");
    // alert("yo its running");
    
    // update the timer using the string method 
    theTimer.innerHTML = timerToString();
}


// function to update the leaderboard both on page load and when a new high score is reached
function updateLeaderboard(){
    // check if completed a sentence
    if(hasCompleted){
        if(score >= 1){
        // if the scores array for time has values
            if(scoresTimeMap.length !=0){
                // if it has 3 then update accordingly by checking each position, starting at the front to check if current time is shorter than leaderboard ones
                // use unshift to add it to the front or splice to add it to that specific index, play sound, and pop to remove the last one, check hasplayed variable to ensure the sound doesn't play twice (for wpm and once for time)
                if(scoresTimeMap.length == 3){
                    if(((60*timerM)+timerS+(timerHS/100)) < scoresTimeMap[0].time){
                        scoresTimeMap.unshift({username: "User"+userCount,
                            timeString: timerToString(), 
                            chars: {correct: score, hintsU: hintsCount}, 
                            time: ((60*timerM)+timerS+(timerHS/100))
                        });
                        // if(!hasPlayed){
                        //     celebSound.play();
                        // }
                        scoresTimeMap.pop()
                    }else if (((60*timerM)+timerS+(timerHS/100)) < scoresTimeMap[1].time){
                        scoresTimeMap.splice(1, 0, {username: "User"+userCount,
                            timeString: timerToString(), 
                            chars: {correct: score, hintsU: hintsCount}, 
                            time: ((60*timerM)+timerS+(timerHS/100))
                        });
                        // if(!hasPlayed){
                        //     celebSound.play();
                        // }
                        scoresTimeMap.pop()
                    }else if (((60*timerM)+timerS+(timerHS/100)) < scoresTimeMap[2].time){
                        scoresTimeMap.splice(2, 0, {username: "User"+userCount,
                            timeString: timerToString(), 
                            chars: {correct: score, hintsU: hintsCount}, 
                            time: ((60*timerM)+timerS+(timerHS/100))
                        });
                        // if(!hasPlayed){
                        //     celebSound.play();
                        // }
                        scoresTimeMap.pop()
                    }
                // if it has 2 then update accordingly by checking the first 2 positions, starting at the front to check if current time is shorter than leaderboard ones
                // use unshift to add it to the front or splice to add it to that specific index, play sound, and check hasplayed variable to ensure the sound doesn't play twice
                // if it is not greater than any then just push it to the back
                }else if(scoresTimeMap.length == 2){
                    if(((60*timerM)+timerS+(timerHS/100)) < scoresTimeMap[0].time){
                        scoresTimeMap.unshift({username: "User"+userCount,
                            timeString: timerToString(), 
                            chars: {correct: score, hintsU: hintsCount}, 
                            time: ((60*timerM)+timerS+(timerHS/100))
                        });
                        // if(!hasPlayed){
                        //     celebSound.play();
                        // }
                    }else if (((60*timerM)+timerS+(timerHS/100)) < scoresTimeMap[1].time){
                        scoresTimeMap.splice(1, 0, {username: "User"+userCount,
                            timeString: timerToString(), 
                            chars: {correct: score, hintsU: hintsCount}, 
                            time: ((60*timerM)+timerS+(timerHS/100))
                        });
                        // if(!hasPlayed){
                        //     celebSound.play();
                        // }
                    }else{
                        scoresTimeMap.push({username: "User"+userCount,
                            timeString: timerToString(), 
                            chars: {correct: score, hintsU: hintsCount}, 
                            time: ((60*timerM)+timerS+(timerHS/100))
                        });
                        // if(!hasPlayed){
                        //     celebSound.play();
                        // }
                    }
                // if it has 1 then update accordingly by checking the first to check if current time is shorter than leaderboard one
                // use unshift to add it to the front, play sound, and check hasplayed variable to ensure the sound doesn't play twice
                // if it is not shoter than that one then just push it to the back
                }else{
                    if(((60*timerM)+timerS+(timerHS/100)) < scoresTimeMap[0].time){
                        scoresTimeMap.unshift({username: "User"+userCount,
                            timeString: timerToString(), 
                            chars: {correct: score, hintsU: hintsCount}, 
                            time: ((60*timerM)+timerS+(timerHS/100))
                        });
                        // if(!hasPlayed){
                        //     celebSound.play();
                        // }
                    }else{
                        scoresTimeMap.push({username: "User"+userCount,
                            timeString: timerToString(), 
                            chars: {correct: score, hintsU: hintsCount}, 
                            time: ((60*timerM)+timerS+(timerHS/100))
                        });
                        // if(!hasPlayed){
                        //     celebSound.play();
                        // }
                    }
                }
                // console.log(scoresWPM.length == 0);
                // console.log(scoresWPM);
            // else then it is the first ever score, so just put at at the front, play sound, and check variables for sound play
            }else{
                scoresTimeMap.unshift({username: "User"+userCount,
                    timeString: timerToString(), 
                    chars: {correct: score, hintsU: hintsCount}, 
                    time: ((60*timerM)+timerS+(timerHS/100))
                });
                // if(!hasPlayed){
                //     celebSound.play();
                // }
            }
        }
    }
    
    // update sound variable
    // hasPlayed = false;
    // Updated Display Statements
    // if the array is not empty then update the aligment of the scores, else just keep it at the center
    if(scoresTimeMap.length !=0){
        leaderboardScoresTime.style.textAlign = "left";
        // if the array has 3 scores than display the username, and time, using <br> for line breaks
        if(scoresTimeMap.length == 3){
            leaderboardScoresTime.innerHTML = "1: "+ scoresTimeMap[0].timeString + " - "+scoresTimeMap[0].chars.correct + "/5 - Hints Used: "+scoresTimeMap[0].chars.hintsU + "<br>2: "+ scoresTimeMap[1].timeString + " - "+scoresTimeMap[1].chars.correct + "/5 - Hints Used: "+scoresTimeMap[1].chars.hintsU+"<br>3: "+ scoresTimeMap[2].timeString + " - "+scoresTimeMap[2].chars.correct + "/5 - Hints Used: "+scoresTimeMap[2].chars.hintsU;
        // if the array has 2 scores than display the username, and time, using <br> for line breaks
        }else if(scoresTimeMap.length == 2){
            leaderboardScoresTime.innerHTML = "1: "+ scoresTimeMap[0].timeString + " - "+scoresTimeMap[0].chars.correct + "/5 - Hints Used: "+scoresTimeMap[0].chars.hintsU + "<br>2: "+ scoresTimeMap[1].timeString + " - "+scoresTimeMap[1].chars.correct + "/5 - Hints Used: "+scoresTimeMap[1].chars.hintsU;
            // else the array has only 1 score so just display that one's username and score
        }else{
            leaderboardScoresTime.innerHTML = "1: "+ scoresTimeMap[0].timeString + " - "+scoresTimeMap[0].chars.correct + "/5 - Hints Used: "+scoresTimeMap[0].chars.hintsU;
        }
        // console.log(scoresWPM.length == 0);
        // console.log(scoresWPM);
    }else{
        // leaderboardScoresTime.innerHTML = "test";
        leaderboardScoresTime.style.textAlign = "center";
        // leaderboardScoresTime.style.backgroundColor = "red";
    }

    // update local storage with the updated arrays and usercount
    localStorage.setItem("userTotal", JSON.stringify(userCount));
    if(scoresTimeMap.length > 0){
        localStorage.setItem("scoresTimeMap", JSON.stringify(scoresTimeMap));
    }
}


// start the running timer
function startTimer(e){
    // if a text area has not been completed
    if(!hasCompleted){
        // originTextBox.innerHTML = "A sample sentence used for testing.";
        // check if interval timer is null, used to ensure no overlapping/stacking timers
        if(intervalTimer == null){
            // use setinterval to call runningtimer every 10 miliseconds, with a serpate one to update the wpm display every 50 miliseconds
            intervalTimer = setInterval(()=>runningTimer(), 10);
            // intervalTimerTest = setInterval(()=>console.log(deathmatchBtn.value), 100);
            // console.log("testing");
        }

        isStopped = false;
        // testMatch(e);
    }
}


// stop button to stop timer:
function stopTimer(e){
    // e.preventDefault();
    // clear the interval for both timer and wpm dispalay 
    clearInterval(intervalTimer);
    // clearInterval(intervalTimerTest);
    // set interval to null
    intervalTimer = null;
    // update the timer element
    theTimer.innerHTML = timerToString();
}


// Reset everything:
function resetTimer(e){
    // reset timer, wpm, booleans, and char legnth variables/displays
    timerHS = 0;
    timerS = 0;
    timerM = 0;
    // stop timer
    stopTimer(e);
    hasCompleted = false;
}



// Basic Variables
let map;
let currQuestion = 0;
let score = 0;
let hintsCount = 0;
let hintUsed = false;

// Arrays to be able to reset boxes and hints
let answerRects = [];
let answerHints = [];


// Array of Location Objects for boxes
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



// Previous code used for testing symbols
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

// Array of hint positions, following similar format to locations array
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


// Getting the html elements i want to update
const mapTypeBtn = document.querySelector("#maptype");
const currQuestionBox = document.querySelector("#questions");
const resultBox = document.querySelector("#results");
const scoreBox = document.querySelector("#final-score");
const hintsBtn = document.querySelector("#hints-btn");
const map3d = document.querySelector("#map-3d");
const resetBtn = document.querySelector("#reset-button")


// Function to show hints for current question.
function showHints(e){
    // e.preventDefault();
    
    // Update the number of hints used
    if(!hintUsed){
        hintsCount++;
        hintUsed = true;
    }

    // create the symbol all the hints
    // symbols: https://developers.google.com/maps/documentation/javascript/symbols
    // symbols can be added to either markers or lines, i added it to a marker here to be on top of some buildings, one of which is the actual answer and 2 are other buildings
    // the markers act as hints
    // the svgmarker is actually the symbol which use a vector based path to display an image, here i used an already available one being the backward closed arrow since it looked good
    // predefined symbols: https://developers.google.com/maps/documentation/javascript/symbols#predefined
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

    // put the symbol on the marker hint1 (real answer)
    const hint1 = new google.maps.Marker({
        position: hints[currQuestion].h1.position,
        icon: svgMarker,
        map: map,
    });

    // append to array for later clear
    answerHints.push(hint1);

    // put the symbol on the marker hint2
    const hint2 = new google.maps.Marker({
        position: hints[currQuestion].h2.position,
        icon: svgMarker,
        map: map,
    });

    // append to array for later clear
    answerHints.push(hint2);
    // put the symbol on the marker hint3
    const hint3 = new google.maps.Marker({
        position: hints[currQuestion].h3.position,
        icon: svgMarker,
        map: map,
    });

    // append to array for later clear
    answerHints.push(hint3);

}


// function to check what map type the user has selected
function checkType(e){

    // if it is roadmap set the bounds for each box (i made it taller for when it is in satellite mode)
    // reference: https://developers.google.com/maps/documentation/javascript/maptypes
    // there are 4 different maptypes: roadmap, satellite, hybrid, and terrain
    // roadmap and satellite are the 2 most distinct ones while hybrid and terrian either combine the two or have no real difference:
    // https://developers.google.com/maps/documentation/javascript/maptypes#BasicMapTypes
    // i chose to only use these two and also add a tilt to the satellite one to add more depth and give it a 3d feel.
    // i changed the zooom because when tilted in satellite mode some buildings were off the screen, which is also why i added .0001 to the north bound of each box
    // there was a 3rd option being the actual 3d mode but i didnt see a meaningful difference between it ad the tilted satellite so disabled the option in html
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


// function to check if the answer is correct using .lat and .lng to get where the user clicked
function checkAnswer(e) {
    startTimer(e);
    // once you answer you can't change the map type
    mapTypeBtn.disabled = true;
    // get location bounds for current locations
    let locationBounds = locations[currQuestion].bounds;

    // checking location bounds by getting the event's coordinates and checking if it is within the bounds of the current location
    if(e.latLng.lat() < locationBounds.north && e.latLng.lat() > locationBounds.south && e.latLng.lng() < locationBounds.east  && e.latLng.lng() > locationBounds.west){
        // add score, draw green rectable and display answer (true for correct, false for incorrect)
        score++;
        drawRectangle(locationBounds, true);
        updateAnswer(true);
    }else{
        drawRectangle(locationBounds, false);
        updateAnswer(false);
    }
    // update question #
    currQuestion++;

    // check if it is the last question
    if(currQuestion == locations.length){
        // final question
        // display the final score 
        let wrong = currQuestion-score;
        resultBox.innerHTML = score + " Correct, "+ wrong+" Incorrect. Hints Used: "+hintsCount;
        hasCompleted = true;
        stopTimer(e);
        
        updateLeaderboard();
        
    }else{
        // if not last question, display next question
        updateQuestion();
    }
    // updateScores();
}

// function to display whether the answer from the user was correct or incorrect
function updateAnswer(correct){
    // remove all hints by setting the map for each added hint to null and clearing the array
    answerHints.forEach(e => e.setMap(null));
    answerHints = [];
    
    // create new answer element with correct classes, colors, and text
    let newAnswer = document.createElement("p");
    newAnswer.classList.add("answer-attempt");
    newAnswer.style.color = correct ? "#1d951d" : "#FF0000";
    newAnswer.innerHTML = correct? "Your answer is correct!!" : "Sorry wrong location.";
    // add answer to the display
    currQuestionBox.append(newAnswer);
}

// function to draw rectangles for locations
function drawRectangle(bounds, correct) {
    // creating a new rectangle and saving it to be able to delete on reset
    // setting stroke color and fill color for where it was correct or not
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

//referenece: https://developer.mozilla.org/en-US/docs/Web/API/Element/children to remove/clear array
// function to reset the game
function resetGame(e){
    // prevent default and setting the innerhtml of all child elements to be empty so it disappears
    // e.preventDefault();
    for (const child of currQuestionBox.children) {
        child.innerHTML = "";
    }
    // reset variables and update question to newest
    currQuestion = 0;
    score = 0;
    resultBox.innerHTML = "";
    hintsCount = 0;
    updateQuestion();
    
    // reset both arrays for hints and answers
    answerHints.forEach(e => e.setMap(null));
    answerHints = [];
    answerRects.forEach(e => e.setMap(null));
    answerRects = [];
    // undisable the map toggle selector
    if(mapTypeBtn.hasAttribute("disabled")){
        mapTypeBtn.toggleAttribute("disabled");
    }
}

// event listeners for map button selector, hint button, and reset button
mapTypeBtn.addEventListener("change", this.checkType);
hintsBtn.addEventListener("click", this.showHints);
resetBtn.addEventListener("click", this.resetGame);

hintsBtn.addEventListener("click", this.startTimer);
resetBtn.addEventListener("click", this.resetTimer);

// function to update the question
function updateQuestion(){
    // create new question element, setting class and text
    let newQuestion = document.createElement("p");
    newQuestion.classList.add("current-question");
    newQuestion.innerHTML = "Where is " + locations[currQuestion].name + "?";
    // append and reset hintused variable
    currQuestionBox.append(newQuestion);
    hintUsed = false;
}
// function updateEventListener(){
    
//     map.addListener("dblclick", this.checkAnswer);
//     map.addListener("click", alert("test"));

// }

// function for the initial map
function initMap() {
    // set the new map to an already established vraible to allow us to add stuff to it
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.2390, lng: -118.5291 }, 
        // bounds: {north: 34.24277, south: 34.23563, east: -118.52467, west: -118.53375},
        // disable all features of movement and set the label visibilitty to off from the styles
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

    // event listener to get when the user guesses
    // updateEventListener();
    map.addListener("dblclick", checkAnswer);
    // update question at the start to display the first question
    updateQuestion();
    updateLeaderboard();
}
