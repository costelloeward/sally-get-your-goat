var buttonGoats = ["goat1", "goat2", "goat3", "goat4"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

// Starting the game
$("body").on("keydown", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// // user clicking buttons
$(".btn").click(function() {
  var userChosenGoat = this.id;
  userClickedPattern.push(userChosenGoat);
  playSound(userChosenGoat);
  checkAnswer(userClickedPattern.length - 1);
  // Need to define current level
});

// Checking user's answer against game sequence
function checkAnswer(currentLevel) {
  // checking
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
    // No match
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("h1").text("Game Over, press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);
    startOver();
  }
};

// Sequence generation, level count
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenGoat = buttonGoats[randomNumber];
  gamePattern.push(randomChosenGoat);
  playSound(randomChosenGoat);
  level++;
  $("#level-title").text("Level " + level);
};

// Sounds and animation
function playSound(name) {
  $("#" + name).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// Restart after a wrong answer
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
};
