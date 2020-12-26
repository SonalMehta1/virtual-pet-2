var foodS, foodStock, dog, happyDog, database, milkBottle,milk=[];
var food,fedTime,lastFed,foodObj,FeedDog,AddFood,nextFedTime=0;

function preload(){
  dogImg=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png");
  
}

function setup() {
  createCanvas(500, 500);
  
  database=firebase.database();
  var databaseRef=database.ref('Food');
  databaseRef.on("value",readStock);
  
  dog=createSprite(250,350);
  dog.addImage(dogImg);
  dog.scale=0.25;
  food=new Food();

  
  FeedDog=createButton("Feed the dog");
  FeedDog.position(700,130);

  AddFood=createButton("Add Food");
  AddFood.position(700,160);

}


function draw() {  
  background(46,139,87);

  if(foodStock!==undefined){
    food.display();
    FeedDog.mousePressed(function(){
      dog.addImage(happyDog);
      writeStock(foodStock); 
      lastFed=hour();
      food.updateLastFed(lastFed);
     
     
    })
    FeedDog.mouseReleased(function(){
      dog.addImage(dogImg);
    })

    AddFood.mousePressed(function(){
      food.updateFoodStock(20)
    })
    drawSprites();
    textSize(15);
    fill(0);
    text("Press UP_ARROW key to Feed the Drago Milk ",20,30);

    stroke("Black");
    fill("brown");
  
    text("Food Stock: " + foodStock,350,70);
  }
  var databaseRef=database.ref("fedTime");
  databaseRef.on("value",function(data){
    lastFed=data.val();
  })
  textSize(15);
  noStroke();
  fill(0)
  text("Last Fed: "+lastFed,20,450);
  nextFedTime=lastFed+4;
  if(nextFedTime>12){
    nextFedTime=nextFedTime-12;
  }
  text("Next fed time: "+nextFedTime,20,475);
}

function readStock(data){
    foodStock=data.val();
 
}

function writeStock(num){
  
  if(num<=0){
    num=0;
  }
  else{
    num=num-1;
  }
  database.ref('/').update({
    Food:num
  })

}

