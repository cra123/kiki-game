window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.getElementById('restart-button').onclick = () => {
    restartGame();
  };
  document.getElementById('end-button').onclick = () => {
    endGame();
  };

const theCanvas = document.getElementById('canvas');
const ctx = theCanvas.getContext('2d');

  const lives = document.getElementById('lives');
  const score = document.getElementById('score');

  const startbutton = document.getElementById('start-button');
  const resetbutton = document.getElementById('restart-button');
  const endbutton = document.getElementById('end-button');
  const gameArea = document.getElementById('game-board');
  const gameStatus = document.getElementById('game-status');
  const audio = document.getElementById('audio');
  const gameOver = document.getElementById('game-over');
  const gameOverScore = document.getElementById('score-over');
  const gameOverScoreDiv = document.getElementById('game-over-score');

  canvas.width = theCanvas.width;
  canvas.height = theCanvas.height;
  
  //creating a new image
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

  //Define The Positions
  let positionWidth = 40;
  let reduceCounter = (theCanvas.width-60);
  let player_x_value = (theCanvas.width/2);
  let player_y_value = (theCanvas.height/2);
  let player_width = 60;
  let player_height = 60;

  //Define the collusion status
  let collusionStatus = false

     //update ball position
  function updateBallPosition(){
    if ((positionWidth) < (theCanvas.width-40)) {
      positionWidth += 10;
      ctx.drawImage(ball, positionWidth, theCanvas.height/2, 30, 30);
      
      if (positionWidth > (theCanvas.width-60)) {
        reduceCounter = positionWidth;
        score.innerHTML = parseInt(score.innerHTML) + 5;
        scoreStatus = collusionStatus;
        if (scoreStatus === true) {
          lives.innerHTML = parseInt(lives.innerHTML) - 1;
        }
        collusionStatus = false;
      }
    }
    else {
      reduceCounter -= 10;
      ctx.drawImage(ball, reduceCounter, theCanvas.height/2, 30, 30);
      // console.log(reduceCounter);
      if (reduceCounter < 40){
        positionWidth = reduceCounter
      }
    }
  }

  function updatePlayerPosition(){

  const playerGirl = new Player(player_x_value,player_y_value,player_width, player_height); 
  playerGirl.makePlayer();
    
  //Move Player
  document.onkeydown = (e) => {
    if (e.keyCode === 37) {
      player_x_value -= 10;
      playerGirl.makePlayer
    }
    else if (e.keyCode === 39) {
      player_x_value += 10;
      playerGirl.makePlayer
    }
    else if (e.keyCode === 38) {
      player_y_value -= 10;
      playerGirl.makePlayer
    }
    else if (e.keyCode === 40) {
      player_y_value += 10;
      playerGirl.makePlayer
  }
  };

    
  }
  
  //Clear the Canvas for next frame update
  function clearCanvas(){
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
  }

  //draw fixed girl on the screen
  function fixedGirlsPosition(){
    //Draw the girl-left on the screen
    ctx.drawImage(girlRight, 10, theCanvas.height/2, 50, 50)
    //Draw the girl-left on the screen
    ctx.drawImage(girlLeft, (theCanvas.width - 60), theCanvas.height/2, 50, 50)
  }


  //Make a player class
  class Player{
    constructor(player_x, player_y, width, height){
      this.player_x = player_x;
      this.player_y = player_y;
      this.width = width;
      this.height = height;
    }
    
    makePlayer(){
      ctx.drawImage(player, this.player_x, this.player_y, this.width, this.height);
    }

    movePlayerLeft(){
        this.player_x -= 10;
        this.makePlayer();
      }

    movePlayerRight(){
        this.player_x += 10;
        this.makePlayer();
    }

    movePlayerUp(){
        this.player_y -= 10;
        this.makePlayer();
    }

    movePlayerDown(){
        this.player_y += 10;
        this.makePlayer();
    }
  }

  //Reload window and Clear Cache
  function restartGame(){
    window.location.reload();
  }

  function setScene(){
  startbutton.disabled = true;
  startbutton.style.backgroundColor = 'skyblue';
  resetbutton.disabled = false;
  resetbutton.style.backgroundColor = 'green';
  endbutton.disabled = false;
  endbutton.style.backgroundColor = 'red';
  gameArea.style.display = "flex";
  gameStatus.style.display = "flex";

  //Change div display to none
  const instructionDiv = document.getElementsByClassName('instruction');
  instructionDiv[0].style.display = 'none';

  //play music
  audio.autoplay = true;
  audio.loop = true;
  audio.volume = 0.5;
  audio.load();  
  }

  function checkCollision(){
    
      ball_x_value = positionWidth;
      ball_y_value = theCanvas.height/2;
      ball_width = 30;
      ball_height = 30;

      //Check if the ball is colliding with the player
      if ((ball_x_value + 10) > player_x_value 
        && (ball_x_value + 10) < (player_x_value + player_width) 
        && (ball_y_value + 10) > player_y_value 
        && (ball_y_value + 10)  < (player_y_value + player_height)) {
        // lives.innerHTML = parseInt(lives.innerHTML) - 1;
        collusionStatus = true;
      }

      if (lives.innerHTML == 0) {
        endGame();
      }

  }
  

  function updateGameArea(){
    clearCanvas();
    fixedGirlsPosition();
    updateBallPosition();
    updatePlayerPosition();
    checkCollision();

  }

  function startGame() {
    setScene();
    setInterval(updateGameArea,20);
  }

  function endGame(){
  
  startbutton.style.display = 'none';
  resetbutton.disabled = false;
  resetbutton.style.backgroundColor = 'green';
  endbutton.disabled = false;
  endbutton.style.backgroundColor = 'skyblue';
  gameArea.style.display = "none";
  gameStatus.style.display = "none";
  //Change div display to none
  const instructionDiv = document.getElementsByClassName('instruction');
  instructionDiv[0].style.display = 'none';

  //Show Score
  gameOver.style.display = "flex";
  gameOverScoreDiv.style.display = "flex";
  gameOverScore.innerHTML = score.innerHTML;


  //Stop music
  audio.pause(); 
  audio.currentTime = 0; 
  }
 
};