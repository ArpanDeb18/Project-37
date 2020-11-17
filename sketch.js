//Create variables here
var database;

var dog, dogImg, happyDog, sadDog;

var foodS, foodStock;

var feedDog, addFoods;

var fedTime, lastFed;

var foodObj;

var gameState, changeState, readState;

var bedImg, gardenImg, washroomImg;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg1.png");
  happyDog = loadImage("dogImg.png");
  sadDog = loadImage("deadDog.png");
  bedImg = loadImage("Bed Room.png");
  gardenImg = loadImage("Garden.png");
  washroomImg = loadImage("Wash Room.png");
}

function setup() {
  createCanvas(550, 700);

  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });
  
  dog = createSprite(300, 400);
  dog.addImage(dogImg);
  dog.scale = 0.2

  foodObj = new Food();

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  
  
}


function draw() {  

  background(46, 139, 87);

  

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  currentTime=hour();
  
  fill(255, 255, 254);
  textSize(15);
  
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
      text("The dog is playing 🤭🐕‍🦺", 50, 30);
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
      fill(0);
      text("The dog is sleeping 😴", 50, 30);
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
      fill(0);
      text("The dog is bathing 🛁", 50, 30);
   }else{
    update("Hungry")
    foodObj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   }else{
    feed.show();
    addFood.show();
    dog.addImage(happyDog);
    foodObj.display();
   }

  drawSprites();
  //add styles here

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + " PM", 375, 30);
  } else if(lastFed == 0){
    text("Last Feed : 12 AM", 375, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 375, 30);
  }

  //text("Milk bottles left : " + foodS, 175, 375);



}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);

  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){

  foodS++;
  
  database.ref('/').update({
    Food : foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState : state
  })
}
