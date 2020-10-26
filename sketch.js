var monkey, monkeyRunning;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var backdrop, backdropImage;
var score = 0;

function preload() {


  monkeyRunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backdropImage = loadImage("monkey2Background.png");

}



function setup() {
  backdrop = createSprite(200, 200, 1200, 600);
  backdrop.addImage(backdropImage); 
  
  monkey = createSprite(40, 370, 10, 10);
  monkey.addAnimation("moving", monkeyRunning);
  monkey.scale = 0.1;
  bananaGroup = new Group();
  obstacleGroup = new Group();


  ground = createSprite(200, 395, 400, 10);
}

function draw() {
  background('snow');
  
  
  
  if (gameState === PLAY) {
    monkey.collide(ground);
    if (keyDown('space') && monkey.y >= 340) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.6;
    survivalTime = Math.round(frameCount / 100);


    if(frameCount % 60 === 0) {
      createBanana();
    }

    if(frameCount % 240 === 0) {
      createRock();
    }
    
    if(monkey.isTouching(bananaGroup)){
      score = score + 2;
    }

    if (monkey.collide(obstacleGroup)) {
      gameState = END;
    }
  } else {
    bananaGroup.setVelocityXeach = 0;
    bananaGroup.lifetime = -1;
    obstacleGroup.setVelocityXeach = 0;
    obstacleGroup.lifetime = -1;
  }


  drawSprites();
  stroke('white');
  textSize(20);
  fill('white');
  text('survival time: ' + survivalTime, 140, 60);
  text('score: ' + score, 260, 80);
}

function createBanana() {
  var rand = Math.round(random(200, 300))
  banana = createSprite(400, rand, 10, 10);
  banana.velocityX = -5;
  banana.lifetime = 80;
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  bananaGroup.add(banana);
}


function createRock() {
  obstacle = createSprite(400, 370, 10, 10);
  obstacle.velocityX = -5;
  obstacle.lifetime = 80;
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacleGroup.debug = true;
  obstacleGroup.add(obstacle);
}
