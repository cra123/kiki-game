window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.getElementById('restart-button').onclick = () => {
    restartGame();
  };

 
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

  //initial speed 
  let positionWidth = 40;
  let reduceCounter = (theCanvas.width-60);

  


  function startGame() {
  setScene();

  //Draw the ball on the screen
  ctx.drawImage(ball, positionWidth, theCanvas.height/2, 30, 30);
  
  //Draw the fixed Girls
  fixedGirlsPosition();
  updateBallPosition();
      
  }
  
  //Clear the Canvas for next frame update
  function clearCanvas(){
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
  }

  //update ball position
  function updateBallPosition(){
    if ((positionWidth) < (theCanvas.width-40)) {
      positionWidth += 10;
      clearCanvas();
      fixedGirlsPosition();
      ctx.drawImage(ball, positionWidth, theCanvas.height/2, 30, 30);
      console.log(positionWidth);
      if (positionWidth > (theCanvas.width-60)) {
        reduceCounter = positionWidth;
      }
    }

    // else if (reduceCounter < 0){
    //   reduceCounter = positionWidth;
    // }

    else {
      reduceCounter -= 10;
      clearCanvas();
      fixedGirlsPosition();
      ctx.drawImage(ball, reduceCounter, theCanvas.height/2, 30, 30);
      console.log(reduceCounter);
      if (reduceCounter < 40){
        positionWidth = reduceCounter
      }
    }

    requestAnimationFrame(updateBallPosition);
  }


  //draw fixed girl on the screen
  function fixedGirlsPosition(){
    //Draw the girl-left on the screen
    ctx.drawImage(girlRight, 10, theCanvas.height/2, 50, 50)
    //Draw the girl-left on the screen
    ctx.drawImage(girlLeft, (theCanvas.width - 60), theCanvas.height/2, 50, 50)
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
};
