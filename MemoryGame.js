const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let selectedCount = 0;
let selectedCards = [];
let matchFound = false;

function deselectTarget(target) {
    if (matchFound) {
      return;
    }
    target.style.backgroundColor = "";
    selectedCount--;
    selectedCards = selectedCards.splice(1);
}

function handleCardClick(event) {
    console.log("you just clicked", event.target);
    if (event.target.matched) {
      return;
    }

    if (selectedCount >= 2) {
      console.log("Nope!!");
      return;
    }

    selectedCount++;
    selectedCards.push(event.target);
    event.target.style.backgroundColor = event.target.className;

    if ((selectedCount >= 2) && (selectedCards[0].className === selectedCards[1].className)) {
        console.log("MATCH!!");
        selectedCards[0].matched = true;
        selectedCards[1].matched = true;
        selectedCount = 0;
        selectedCards = [];
        matchFound = true;
    } else {
      matchFound = false;
      window.setTimeout(deselectTarget, 1000, event.target);
    }
}

createDivsForColors(shuffledColors);