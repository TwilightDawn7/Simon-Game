var gamePattern = [];
var userClickedPattern =[];
var gameStarted = false;
var level = 0;


var buttonColours = ["red", "blue", "green", "yellow"];

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  $("#"+ userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);


  playSound(userChosenColour);
});


$(document).keydown(function(event) {
  if(!gameStarted){
    $("h1").text("Level "+ level);

    nextSequence();
    gameStarted = true;

  }
});





function nextSequence(){
  level++;
  $("h1").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
}

function playSound(name) {
  var audio = new Audio("./sounds/"+name+".mp3");
  audio.play();
}


//add animation to user clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  
  //removing pressed class after 100ms
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  },100);
}

//To check answer of user
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    //console.log("successs");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      },1000);
    }
  }
  else {
    // alert("wrong");
    $("body").addClass("game-over");
    playSound("wrong");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}






