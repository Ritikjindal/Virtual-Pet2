var dog,dogImg,happyDog, database;
var foodS, foodStock;
var feed,addfood,fedTime,lastFed,foodObj;

function preload()
{
	dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000,400);

  foodObj=new Food();

  dog=createSprite(850,200,60,60);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed= createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  drawSprites();

  

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed:"+ lastFed%12 +"PM",350,30);
  }
  else if(lastFed===0){
    text("Last Fed: 12 AM",350,30);
  }
  else{
    text("Last Fed:"+ lastFed+"AM",350,30);
  }

}
 function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

