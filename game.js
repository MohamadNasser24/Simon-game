var started=false;
var level=-1;
var count=0;
/*Create a user clicked pattern*/
var userClickedPattern = [];

/* Add a game color pattern */
var gamePattern = [];

/* Create an array of colors*/
var buttonColors = ["purple", "green", "cyan", "pink"];
  $(document).keypress(function(e){
    var key = e.which;
    if(key==13){
      if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
      }
    }


  });




/* Get the id of the button clicked in by the user and adding it to the chosen pattern array*/

    $(".btn").click(function(event) {

if(started){

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playsound(userChosenColor);

  animatePress(userChosenColor);


  checkAnswer(userClickedPattern.length-1);
}

});



  function checkAnswer(currentlevel){
  if(userClickedPattern[currentlevel] === gamePattern[currentlevel]){
    console.log("success");


      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence()},1000);
      }
    }
    else{
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game over press enter to restart");
        startover();

      }
    }



/* create a random variable function*/
function nextSequence() {


    userClickedPattern=[];


  /* Increase level by 1 everytime nextsequence is called*/
  level++;

/* Increse the level by 1*/

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  /*Add the random color to the color pattern array*/

  gamePattern.push(randomChosenColor);
  /* make button flash*/

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  /* Play audio*/
  playsound(randomChosenColor);

  animatePress(randomChosenColor);

}
function playsound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentcolor){
  $("#"+ currentcolor).addClass("pressed");
setTimeout(function(){
  $("#"+ currentcolor).removeClass("pressed")
},100);
}

function startover(){
  level=-1;
  gamePattern=[];
  started=false;
}
