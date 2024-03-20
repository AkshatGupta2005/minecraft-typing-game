var selectedLetter = [];
var i = 2;
var n = 0;
var triggerInterval = 0;
var generateCloud = 0;
var volumeOn = true;
var cloudAnimationTime = 0;
var cloudGenerationTime = 0;
function checkDifficultyLevel() {
  var difficultyLevel = $("#difficulty").val();
  switch (difficultyLevel) {
    case "kid":
      cloudAnimationTime = "10s";
      cloudGenerationTime = 2000;
      break;
    case "easy":
      cloudAnimationTime = "8s";
      cloudGenerationTime = 1000;
      break;
    case "normal":
      cloudAnimationTime = "6s";
      cloudGenerationTime = 900;
      break;
    case "hard":
      cloudAnimationTime = "4s";
      cloudGenerationTime = 800;
      break;
    case "extreme":
      cloudAnimationTime = "2s";
      cloudGenerationTime = 600;
      break;
    case "impossible":
      cloudAnimationTime = "1s";
      cloudGenerationTime = 200;
      break;
  }
}
function createCloud(selectedLetter) {
  var randomNumber = Math.round(Math.random() * 45) + 10;
  randomNumber = randomNumber + "%";
  i = i + 1;
  var cloudClass = "cloud" + i;
  var cloudDiv = document.createElement("div");
  var image = document.createElement("img");
  image.classList.add("cloudImg");
  cloudDiv.classList.add("cloud");
  document.getElementById("clouds").appendChild(cloudDiv);
  $(".cloud").css({
    "animation-duration": cloudAnimationTime,
  });
  var randomLetterText = document.createElement("span");
  var cloudLetterClass = "cloud" + selectedLetter;
  cloudDiv.classList.add(cloudClass);
  cloudDiv.classList.add(cloudLetterClass);
  Object.assign(image, { src: "./images/cloud.webp", alt: "cloud" });
  cloudDiv.style.position = "absolute";
  cloudDiv.style.top = randomNumber;
  cloudDiv.style.zIndex = i;
  randomLetterText.innerHTML = selectedLetter;
  randomLetterText.classList.add("randomLetter");
  randomLetterText.style.zIndex = i + 1;
  cloudDiv.append(randomLetterText);
  cloudDiv.append(image);
}

function upgradingLetterBox(letterArray) {
  letterBox = $("#letterBox").html();
  letterBox = $("#letterBox").html(letterArray);
}

function randomLetterGenerator() {
  var letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var randomLetterNumber = Math.round(Math.random() * 25);
  var randomLetter = letters[randomLetterNumber];
  selectedLetter.push(randomLetter);
  createCloud(randomLetter);
  upgradingLetterBox(selectedLetter);
}
$(document).one("keypress", function () {
  startGame();
});
document.addEventListener("keydown", function (event) {
  for (let j = 0; j < selectedLetter.length; j++) {
    var userTypedLetter = event.key;
    userTypedLetter = userTypedLetter.toUpperCase();
    if (selectedLetter[j] == userTypedLetter) {
      n += 1;
      updateScore(n);
      var clickedCloudClass = "cloud" + userTypedLetter;
      var clickedCloud = document.getElementsByClassName(clickedCloudClass);
      clickedCloud[0].remove();
      selectedLetter.splice(j, 1);
      upgradingLetterBox(selectedLetter);
      if (volumeOn == true) {
        var audioAdded = new Audio("./audio/cloudPop.mp3");
        audioAdded.play();
      }
      break;
    }
  }
});
$(".mode").click(function () {
  $(".sun").toggleClass("moon");
  $("#sky").toggleClass("night");
  $(".nightMode").toggleClass("hidden");
  $(".dayMode").toggleClass("hidden");
});
$(".volumeImg").click(function () {
  $(".volumeOn").toggleClass("hidden");
  $(".volumeOff").toggleClass("hidden");
  if (volumeOn == true) {
    volumeOn = false;
  } else {
    volumeOn = true;
  }
});
function gameOver() {
  var cloudPosition = $(".cloud").offset();
  if (cloudPosition.left == 0) {
    clearInterval(triggerInterval);
    clearInterval(generateCloud);
    upgradingLetterBox("Press Any Key To Restart");
    $(".cloud").remove();
    $("html").addClass("screenBlur");
    setTimeout(() => $("html").removeClass("screenBlur"), 1000);
    $("#sky").addClass("gameOver");
    $(document).one("keypress", function () {
      $("#sky").removeClass("gameOver");
      startGame();
    });
    if (volumeOn == true) {
      var gameOverAudio = new Audio("./audio/gameOver.mp3");
      gameOverAudio.play();
    }
  }
}
function triggerCheck() {
  triggerInterval = setInterval(gameOver, 10);
}
function updateScore(currentScore) {
  $(".liveScore").html(currentScore);
}
function startGame() {
  checkDifficultyLevel();
  console.log(cloudGenerationTime);
  generateCloud = setInterval(randomLetterGenerator, cloudGenerationTime);
  setTimeout(triggerCheck, cloudGenerationTime);
  n = 0;
  updateScore(n);
  selectedLetter = [];
  upgradingLetterBox(selectedLetter);
}
