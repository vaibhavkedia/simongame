var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
   if(!started) {
     // $("#title").text("Level " + level);
     nextSequence();
     started = true;
    }
});


 $(".btn").click(function() {

   var userChosenColour = $(this).attr("id");

   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);

   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);

 });



 function nextSequence() {

   level++;

   $("#title").text("Level " + level);

   var randomNumber = Math.floor(Math.random() * 4);

   var randomChosenColour = buttonColours[randomNumber];

   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);
 }


 function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
 }


 function animatePress(currentColor){
   $("#" + currentColor).addClass("pressed");
   setTimeout(function () {
     $("#" + currentColor).removeClass("pressed");
   } , 100);
 }


 function checkAnswer(currentLevel){
     if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

       if (userClickedPattern.length === gamePattern.length) {
         setTimeout(nextSequence,100);
         userClickedPattern = [];
       }
     } else{
         gameOver();
     }
 }


function gameOver() {

  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200)
  $("#title").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}
