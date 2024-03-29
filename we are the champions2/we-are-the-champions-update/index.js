// setting up database

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-2957c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "Memos")

// Selecting HTML items

const inputTextEl = document.getElementById("text-el")
const publishButtonEl = document.getElementById("btn-el")
const endorsementsEl = document.getElementById("endorsements-el")

// Event listener for button

publishButtonEl.addEventListener("click", function() {
    let inputValue = inputTextEl.value
    push(endorsementsInDB, inputValue)
    clearInputField() // clears the input field after the button click
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
        clearEndorsementsEl()
        
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentEndorsement = endorsementsArray[i]
            let currentEndorsementID = currentEndorsement[0]
            let currentEndorsementValue = currentEndorsement[1]
            
            appendEndorsementToEndorsementsEl(currentEndorsement)
        }
    } else {
        endorsementsEl.innerHTML = "No endorsements yet :("
    }
})

function clearInputField() {
    inputTextEl.value = ""
}

function clearEndorsementsEl() {
    endorsementsEl.innerHTML = ""
}

function appendEndorsementToEndorsementsEl(endorsement) {
    let endorsementID = endorsement[0]
    let endorsementValue = endorsement[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = endorsementValue
    
    endorsementsEl.append(newEl)
}


    