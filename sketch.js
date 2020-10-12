
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, ground, jump_boost, limit, gameState;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600)
  
  ground = createSprite(300, 600, 1000, 30);
  ground.velocityX = ground.velocityX - 3;
  
  monkey = createSprite(100, 560, 10, 20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  jump_boost = -15;
  limit = 5;
  gameState = "play";
  score = 0;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  if (gameState === "play") {
    
    if (ground.x > ground.x / 2) {
      ground.x = 300
    
    } 
    
    if(keyDown("space") && monkey.y > 550) {
      monkey.velocityY = jump_boost;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if (frameCount % 80 === 0) {
      var rand = Math.round(random(1,2));
      food();
      if (rand === 2) {
        obstacle();
        obstacles.scale = 0.2;
      }
    }
    
    if (jump_boost === -25) {
      limit = 0;
    }
    
    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      jump_boost = jump_boost - limit; 
    }
    
    drawSprites();
    monkey.collide(ground);
    
    if (monkey.isTouching(obstacleGroup)) {
      gameState = "end";
      monkey.destroy();
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      ground.destroy();
    }
    
    score = Math.round(frameCount/4);
  } 
  
   else if (gameState === "end") {
      fill("orange");
      text("Game Over ツ :L",250, 300);
      
    }
  
  text("survival time: " + score, 280, 100);
}

function food() {
  
  banana = createSprite(700, Math.round(random(300, 500)), 10, 10);
  banana.velocityX = - 8;
  banana.addImage(bananaImage)
  banana.scale = 0.1;
  banana.lifetme = 300;
  FoodGroup.add(banana)
}

function obstacle() {
  obstacles = createSprite(700, 550, 20, 20);
  obstacles.velocityX = -8;
  obstacles.addImage(obstaceImage);
  obstacles.x = banana.x
  obstacles.lifetime = 300;
  obstacleGroup.add(obstacles);
  obstacles.setCollider("circle", 0, 0, 200);
}

 



