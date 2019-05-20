var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var start=false;
var level=0;
$(document).keypress(function(){
if(!start){
  $("#level-title").text("Level "+level);
  nextSequence();
  start=true;
}

});

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

var randomNumber=Math.floor((Math.random()*4));
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

//playing audio
playSound(randomChosenColour);


}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();

}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();},1000);
      }
    }
    else{
      playSound("wrong");
      $(".bd").addClass("game-over");
      setTimeout(function(){$(".bd").removeClass("game-over");},200);
      $("h1").text("Game Over, Press Any Key To Restart");
      startOver();
    }
  }

  function startOver(){
    level=0;
    gamePattern=[];
    start=false;
  }
