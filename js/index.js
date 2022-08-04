window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.getElementById('restart-button').onclick = () => {
    restartGame();
  };

  // document.getElementById('stop-button').onclick = () => { };

const theCanvas = document.getElementById('canvas');
const ctx = theCanvas.getContext('2d');

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

  //initial speed 
  let positionWidth = 40;
  let reduceCounter = (theCanvas.width-60);
  let player_x_value = (theCanvas.width/2);
  let player_y_value = (theCanvas.height/2);
  let player_width = 60;
  let player_height = 60;

     //update ball position
  function updateBallPosition(){
    if ((positionWidth) < (theCanvas.width-40)) {
      positionWidth += 10;
      ctx.drawImage(ball, positionWidth, theCanvas.height/2, 30, 30);
      console.log(positionWidth);
      if (positionWidth > (theCanvas.width-60)) {
        reduceCounter = positionWidth;
      }
    }
    else {
      reduceCounter -= 10;
      ctx.drawImage(ball, reduceCounter, theCanvas.height/2, 30, 30);
      console.log(reduceCounter);
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
  const startbutton = document.getElementById('start-button');
  const resetbutton = document.getElementById('restart-button');
  const endbutton = document.getElementById('end-button');
  const gameArea = document.getElementById('game-board');

  startbutton.disabled = true;
  startbutton.style.backgroundColor = 'skyblue';
  resetbutton.disabled = false;
  resetbutton.style.backgroundColor = 'green';
  endbutton.disabled = false;
  endbutton.style.backgroundColor = 'red';
  gameArea.style.display = "flex";

  //Change div display to none
  const instructionDiv = document.getElementsByClassName('instruction');
  instructionDiv[0].style.display = 'none';
  }

  
  

  function updateGameArea(){
    clearCanvas();
    fixedGirlsPosition();
    updateBallPosition();
    updatePlayerPosition();

  }

  function startGame() {
    setScene();
    // setInterval(updateGameArea, 20)
    setInterval(updateGameArea,20);
  }

 
};