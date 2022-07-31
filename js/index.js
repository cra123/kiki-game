window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.getElementById('restart-button').onclick = () => {
    restartGame();
  };

  //Reload window and Clear Cache

  function restartGame(){
    window.location.reload();
  }



  //creating a new image
  const ball = new Image();
  ball.src = 'images/throw-ball.png';


  //creating girl on the left
  const girlLeft = new Image();
  girlLeft.src = 'images/girl-left.png';
  
  //Creating girl on the right
  const girlRight = new Image();
  girlRight.src = 'images/girl-right.png';


  function startGame() {

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


  
  

  const theCanvas = document.getElementById('canvas');
  const ctx = theCanvas.getContext('2d');

  //Draw the ball on the screen
  ctx.drawImage(ball, theCanvas.width/2, theCanvas.height/2, 50, 50);

  //Draw the girl-left on the screen
  ctx.drawImage(girlRight, theCanvas.width/4, theCanvas.height/2, 50, 50)

  //Draw the girl-left on the screen
  ctx.drawImage(girlLeft, theCanvas.width/2, theCanvas.height/4, 50, 50)


      
  }     
};
