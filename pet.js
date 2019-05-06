console.log("pet script running");

// the buttons
const petButton = document.querySelector("#petBtn");
const feedButton = document.querySelector("#feedBtn");

// the areas on the screen for displaying
const talkLbl = document.querySelector("#talk");
const pstatus = document.querySelector("#petStatus");
const fstatus = document.querySelector("#foodStatus");
const astatus = document.querySelector("#amuseStatus");
const sstatus = document.querySelector("#sleepStatus");
const imageDiv = document.querySelector("#image-container");
const nameInput = document.querySelector("#name");

// states
let count = 0;  //how many pets
let food = 0;   //;evel of hunger
let amused = true; // not or somewhat
let sleep = 0;  // asleep above 10
let name = "Bobo";
let haveName = false;
let sleeping = false;

//display all the statuses
displayStatus();

// start the food and sleep timers
let foodLoss = setInterval(loseFood, 10000);
let asleep = setInterval(getTired, 3000);

nameInput.addEventListener("change", (e) => {
  console.log("Name entered")
  name = nameInput.value;
  haveName = true;
  talkLbl.innerHTML = `<h3>Hi ${name}. Let's play.</h3>`
});


imageDiv.addEventListener("mouseleave", (e) => {
  console.log("mouse over image")
  if (haveName && !sleeping) {
    if (amused) {
      talkLbl.innerHTML = `<h3> Hey ${name}! I am NOT amused.</h3>`
      amused = false;
    }
    else {
      talkLbl.innerHTML = `<h3>Purrrrrrrrr....</h3>`
      amused = true;
    }
    displayStatus();
  }
});

imageDiv.addEventListener("mouseup", (e) => {
  console.log("mouse up")
  if (haveName && sleeping) {
    sleep -= 10;
  }
  displayStatus();
});

petButton.addEventListener('click', (e) =>{
  console.log("Button pressed!");
  if (haveName && !sleeping) {
    // Increment the count by 1.
    count += 1;
    if (count == 9) {
      talkLbl.innerHTML = `<h4>I think that's enough. You can stop now.</h4>`
    } else if (count > 10) {
      talkLbl.innerHTML = `<h3>Okay, no more pets, ${name}!</h3>`
      amused = false;
    }
    displayStatus();
  }
});

feedButton.addEventListener('click', (e) =>{
  console.log("Button pressed!");
  if (haveName && !sleeping) {
    food += 1;
    if (food > 5) {
      talkLbl.innerHTML = `<h3> ${name}, I won't eat anymore!</h3>`
      amused = false;
    } else   if (food > 3) {
      talkLbl.innerHTML = `<h3>That's enough food for now.</h3>`
    } else if (food > 0){
      talkLbl.innerHTML = `<h3>That's yummy, ${name}.</h3>`
    }
    displayStatus();
  }
});

function loseFood() {
  if (haveName) {
    food -= 1;
    displayStatus();
  }
}

function getTired() {
  if (haveName) {
    sleep += Math.round(3*Math.random())-1;
    if (sleep < 6) {sleeping = false;} 
    else {sleeping = true;}
    displayStatus();
  }
}

function displayStatus() {
  if (sleeping) {
    sstatus.classList.add("emergency");
    imageDiv.innerHTML = `<img src="images/pip_asleep.jpg" />`
  }
  else if (food < 0) {
      imageDiv.innerHTML = `<img src="images/pip_hungry.jpg" />`
      fstatus.classList.add("emergency");
      fstatus.classList.remove("annoyed");
  }
  else if (count >= 10) {
      imageDiv.innerHTML = `<img src="images/pip_peeved.jpg" />`
      pstatus.classList.add("annoyed");
  }
  else if (food > 5) {
    imageDiv.innerHTML = `<img src="images/pip_full.jpg" />`
    fstatus.classList.add("annoyed");
    fstatus.classList.remove("emergency");
  }
  else {
    imageDiv.innerHTML = `<img src="images/pip_amused.jpg" />`
    fstatus.classList.remove("emergency", "annoyed");
    sstatus.classList.remove("emergency");
  }

  fstatus.innerHTML = `<h4>Food Status: ${food} treats</h4>`
  pstatus.innerHTML = `<h4>Pet Status: ${count} pets</h4>`
  if (!amused) {
    astatus.classList.add("annoyed");
    astatus.innerHTML = `<h4>Amused Status: Not amused. ${name} move mouse away.</h4>`
  }
  else {
    astatus.classList.remove("annoyed")
    astatus.innerHTML = `<h4>Amused Status: somewhat amused</h4>`
    
  }
  sstatus.innerHTML = `<h4>Sleep Need: ${sleep}</h4>`
}
