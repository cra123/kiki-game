window.onload = () => {

  //Make the start button to start the game
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  //Make the restart button to restart the game
  document.getElementById('restart-button').onclick = () => {
    restartGame();
  };
  //Make the end button to end the game
  document.getElementById('end-button').onclick = () => {
    endGame();
  };

//Start Defining the Game Variables

//Define the canvas area
const theCanvas = document.getElementById('canvas');
//Allows us to manipulate the canvas -> Draw, Clear etc.
const ctx = theCanvas.getContext('2d');

//Help us to manipulate items in the canvas

//Define the  size of the canvas
  canvas.width = theCanvas.width;
  canvas.height = theCanvas.height;
  
  //creating a ball image
  const ball = new Image();
  ball.src = 'images/throw-ball.png';


  //creating girl on the left
  const girlLeft = new Image();
  girlLeft.src = 'images/girl-left.png';
  
  //Creating girl on the right
  const girlRight = new Image();
  girlRight.src = 'images/girl-right.png';

  //Create player
  const player = new Image();
  player.src = 'images/player.png';

//Allow us to manipulate the HTML elements
  const startbutton = document.getElementById('start-button');
  const resetbutton = document.getElementById('restart-button');
  const endbutton = document.getElementById('end-button');
  const gameArea = document.getElementById('game-board');
  const gameStatus = document.getElementById('game-status');
  const audio = document.getElementById('audio');
  const gameOver = document.getElementById('game-over');
  const gameOverScore = document.getElementById('score-over');
  const gameOverScoreDiv = document.getElementById('game-over-score');

  //Define Varibles that will help the user to play the game

  //Help us determine the status of the player in terms of lives remaining and the scores
  const lives = document.getElementById('lives');
  const score = document.getElementById('score');


  //Define The Positions
  let positionWidth = 40; //Used to determine the position of the ball when moving to the right
  let reduceCounter = (theCanvas.width-60); //Userful to assits to determine the position of the ball when moving to the left
  let player_x_value = (theCanvas.width/2); //position of the player on the x axis
  let player_y_value = (theCanvas.height/2); //position of the player on the y axis
  const player_width = 20; //width of the player
  const player_height = 60; //height of the player

  //Define the collusion status
  let collusionStatus = false //update if the ball has collided with the player

  //End Defining the Game Variables

  //Build the Player
  //Make a player class
  class Player{
    //Basic Variable to help create the player
    constructor(player_x, player_y, width, height){
      this.player_x = player_x; //position of the player on the x axis
      this.player_y = player_y; //position of the player on the y axis
      this.width = width; //width of the player (size)
      this.height = height; //height of the player (size)
    }
    
    //Create Function of the player
    makePlayer(){
      //call the drawImage function to draw the player on the canvas
      ctx.drawImage(player, this.player_x, this.player_y, this.width, this.height);
    }
  }


  
// Start Function that control the game

  //draw fixed girl on the screen
  function fixedGirlsPosition(){
    //Draw the girl-left on the screen
    ctx.drawImage(girlRight, 10, theCanvas.height/2, 50, 50)
    //Draw the girl-left on the screen
    ctx.drawImage(girlLeft, (theCanvas.width - 60), theCanvas.height/2,50, 50 )
  }

  //Clear the Canvas for next frame update
  function clearCanvas(){
    //Clear the canvas
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
  }

  //Prepare the HTML to render the Game
function setScene(){

  //Disable the  Start Button
  startbutton.disabled = true;
  //Change the Color of the Start Button
  startbutton.style.backgroundColor = 'skyblue';

  //Enable the Restart Button
  resetbutton.disabled = false;
  //Change the Color of the Restart Button
  resetbutton.style.backgroundColor = 'green';
  //Enable the End Button
  endbutton.disabled = false;
  //Change the Color of the End Button
  endbutton.style.backgroundColor = 'red';

  //Change the display of the Game Area from none -> flex
  gameArea.style.display = "flex"; //See the canvas
  gameStatus.style.display = "flex"; //See the Lives and Score

  //Change div display to none; -> Hide the intro div
  const instructionDiv = document.getElementsByClassName('instruction');
  instructionDiv[0].style.display = 'none';

  //play music
  audio.autoplay = true; //the music will autoplay when the game starts
  audio.loop = true; //the music will loop when the game starts
  audio.volume = 0.5;
  audio.load();  
  }

//Prepare the HTML to render the Game Over

  function endGame(){
  
    //Hide the Start Button
  startbutton.style.display = 'none';
  //Enable the Restart Button
  resetbutton.disabled = false;
  //Change the Color of the Restart Button
  resetbutton.style.backgroundColor = 'green';
  //Enable the End Button
  endbutton.disabled = false;
  //Change the Color of the End Button
  endbutton.style.backgroundColor = 'skyblue';

  //Change the display of the Game Area from flex -> none
  gameArea.style.display = "none";
  gameStatus.style.display = "none";
  //Change div display to none
  const instructionDiv = document.getElementsByClassName('instruction');
  instructionDiv[0].style.display = 'none';

  //Show Score and Game Over
  gameOver.style.display = "flex";
  gameOverScoreDiv.style.display = "flex";
  gameOverScore.innerHTML = score.innerHTML;


  //Stop music
  audio.pause(); 
  audio.currentTime = 0; 
  }

  //update ball position
  function updateBallPosition(){
    if ((positionWidth) < (theCanvas.width-40)) { //If the ball position is less than 440px
      positionWidth += 10;
      ctx.drawImage(ball, positionWidth, theCanvas.height/2, 30, 30);
      
      if (positionWidth > (theCanvas.width-60)) { //Switching Direction 440px
        reduceCounter = positionWidth; //reduceCounter is the position of the ball when moving to the left
        if (collusionStatus === true) {
          lives.innerHTML = parseInt(lives.innerHTML) - 1; //Less one Life
        if (lives.innerHTML == 0) {
          endGame();
        }
        }
        else{
          score.innerHTML = parseInt(score.innerHTML) + 5; //Add 5 to the score
        }
        collusionStatus = false; //Reset the collusion status
      }
    }
    else {
      reduceCounter -= 10; //if the ball position is less than 40px towards the left
      ctx.drawImage(ball, reduceCounter, theCanvas.height/2, 30, 30);
      // console.log(reduceCounter);
      if (reduceCounter < 40){
        positionWidth = reduceCounter
      }
    }
  }

  function updatePlayerPosition(){


  //Create a Player Object
  const playerGirl = new Player(player_x_value,player_y_value,player_width, player_height); 
  playerGirl.makePlayer();
    
  //Make the player move to the left

  //Define Keys to move the player
  document.onkeydown = (e) => {
    if (e.keyCode === 37) {
      //update the player position on the x axis negative
      player_x_value -= 10;
      //redraw the player
      playerGirl.makePlayer
    }
    else if (e.keyCode === 39) {
      //update the player position on the x axis positive
      player_x_value += 10;
      //redraw the player
      playerGirl.makePlayer
    }
    else if (e.keyCode === 38) {
      //update the player position on the y axis positive
      player_y_value -= 10;
      //redraw the player
      playerGirl.makePlayer
    }
    else if (e.keyCode === 40) {
      //update the player position on the y axis negative
      player_y_value += 10;

      playerGirl.makePlayer
  }
  };

    
  }
  
  function checkCollision(){
    
      ball_x_value = positionWidth; //get the ball position on the x axis
      ball_y_value = theCanvas.height/2;  //get the ball position on the y axis
      ball_width = 30; //get the ball width
      ball_height = 30; //get the ball height

      //Check if the ball is colliding with the player
      if ((ball_x_value ) > player_x_value  // 2>3 False
        && (ball_x_value ) < (player_x_value + player_width) //2<3+2 False
        && (ball_y_value ) > player_y_value //5>4 True
        && (ball_y_value )  < (player_y_value + player_height)) { //5<4+2 True
        // lives.innerHTML = parseInt(lives.innerHTML) - 1;
        collusionStatus = true;
      }

  }

// End Function that control the game


  //Reload window and Clear Cache
  function restartGame(){
    window.location.reload();
  }

//Help Run the Frames of the Game
  function updateGameArea(){
    clearCanvas(); //Clear the Canvas
    fixedGirlsPosition(); //Draw the Gilrs
    updateBallPosition(); //Draw the updated ball position
    updatePlayerPosition(); //Draw the updated player position  
    checkCollision(); //Check if the ball is colliding with the player

  }

  function startGame() {
    setScene(); //Prepare the HTML to render the Game
    setInterval(updateGameArea,20); //Loop the Game using the updateGameArea function in 20 milliseconds
  }


 
};