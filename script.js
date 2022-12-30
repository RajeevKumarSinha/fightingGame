class Game {
  constructor(player1Name = 'pl1', player2Name = 'pl2') {
    // Flag that indicates if the game is over or not
  this.theEnd = false;
    
    this.player1 = {
      name: player1Name,
      health: 100
    };

    this.player2 = {
      name: player2Name,
      health: 100
    };
  }

  //Starts the game and logs out the status of players
  start() {
    this.reset()
    while(this.player1.health >0 && this.player2.health >0){
      this.pl1AttackPl2();
      this.pl2AttackPl1();
      this.pl1Heal();
      this.pl2Heal();
      console.log(`${this.player1.name} :${this.player1.health} | ${this.player2.name} :${this.player2.health}`)
    }
    this.declareWinner()
  }

  //Console log the winner of the battle
  declareWinner() {
    if(this.player1.health<=0 && this.player2.health <=0)
    return `Draw`;
    else if(this.player1.health>this.player2.health)
    return `${this.player1.name} WINS!`
    else
    return `${this.player2.name} WiNS!`
  }

  //If player 1 or player 2 health is below 0
  //Mark theEnd true, to stop the game
  checkTheEnd() {
    if(this.player1.health<=0|| this.player2.health <=0){
      this.theEnd = true;
      this.declareWinner()
    }
    
  }

  //Console log the name and health of both players
  //Ex: Player 1: 100 | Player 2: 50
  playerStatus() {
    console.log(`${this.player1.name} :${this.player1.health} | ${this.player2.name} :${this.player2.health}`)
  }

  //Reset health of player 1 and player 2 to 100
  //Reset theEnd to false
  reset() {
    this.theEnd = false;
    this.player1.health = 100;
    this.player2.health = 100;
  }

  //Generate a random number between 1 and 10 using Math.random()
  //Use that number to decrease health from player 2
  pl1AttackPl2() {
    this.player2.health -= Math.ceil(Math.random()*10);
  }

  //Generate a random number between 1 and 10 using Math.random()
  //Use that number to decrease health from player 1
  pl2AttackPl1() {
    this.player1.health -= Math.ceil(Math.random()*10);
  }

  //Generate a random number between 1 and 5 using Math.random()
  //Use that number to increase health of player 1
  pl1Heal() {
    if(this.player1.health<90)
    this.player1.health += Math.ceil(Math.random()*5)
  }

  //Generate a random number between 1 and 5 using Math.random()
  //Use that number to increase health of player 2
  pl2Heal() {
    if(this.player2.health<90)
    this.player2.health += Math.ceil(Math.random()*5);
  }
}

// Initialize the class here
// Call the start function of the game
let myGame = new Game("Rajeev","Shreshtha")

// h1 element where the winner is shown on the screen 
const resultH1 = document.querySelector(".result");


// game end check function 
const endCheck = ()=>{
  myGame.checkTheEnd();
  if(myGame.theEnd){
    resultH1.innerText = myGame.declareWinner();
    fighter1HealthUpdate();
    fighter2HealthUpdate();
  }
}


// fighter1 health h1 
const fighter1Health = document.querySelector(".health");

// fighter1Health update function 
const fighter1HealthUpdate =()=>fighter1Health.innerText = myGame.player1.health;

// fighter 2 health update h1 
const fighter2Health = document.querySelector(".health2")

// fighter2Health update function 
const fighter2HealthUpdate = () =>fighter2Health.innerText = myGame.player2.health;

// player1 buttons and sounds
const pl1AttackBtn = document.querySelector(".attack");
const fastPunch = document.querySelector(".fastPunch");
const pl1HealBtn = document.querySelector(".heal");
const fastHeal = document.querySelector(".fastHeal")

// player1 punch sound on button click
pl1AttackBtn.onclick =()=>{
  myGame.pl1AttackPl2();
  fighter2HealthUpdate()
  fastPunch.play();
  endCheck();
}

// player1 heal sound & button press update dom
pl1HealBtn.onclick = () =>{
  myGame.pl1Heal();
  fighter1HealthUpdate();
  fastHeal.play();
}



// player2 buttons and sounds 
const pl2AttackBtn = document.querySelector(".attack2");
const quickHit = document.querySelector(".quickHit")
const pl2HealBtn = document.querySelector(".heal2")
const quickHeal = document.querySelector(".quickHeal")

// player2 punch sound on click 
pl2AttackBtn.onclick =() =>{
  myGame.pl2AttackPl1()
  fighter1HealthUpdate()
  quickHit.play()
  endCheck();
}

// player2 heal sound 
pl2HealBtn.onclick = () =>{
  myGame.pl2Heal()
  fighter2HealthUpdate()
  quickHeal.play()
}


// keypress sound effects and functionality with updates in dom 
document.addEventListener('keydown',function(e){
  if(e.key == 'q'){
    fastPunch.play();
    myGame.pl1AttackPl2()
    fighter2HealthUpdate()
    endCheck();
    // console.log(myGame.player2.health)
  }else if(e.key =="a"){
    fastHeal.play();
    myGame.pl1Heal()
    fighter1HealthUpdate()
    // console.log(myGame.player1.health)
  }else if(e.key == "p"){
    quickHit.play();
    myGame.pl2AttackPl1()
    fighter1HealthUpdate()
    endCheck();
    // console.log(myGame.player1.health)
  }else if(e.key == 'l'){
    quickHeal.play();
    myGame.pl2Heal();
    fighter2HealthUpdate();
  }
})



// function to simulate the game onclick of runsimulation btn. 
const runSimulationBtn = document.querySelector(".simulation");
runSimulationBtn.onclick =()=>{
  myGame.start();
  endCheck()
}

const resetBtn =document.querySelector('.reset');
resetBtn.onclick=()=>{
  myGame.reset();
  fighter1HealthUpdate();
  fighter2HealthUpdate();
  resultH1.innerText="";
}