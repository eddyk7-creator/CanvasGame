class Mover{
  constructor(canvas, left="ArrowLeft", right="ArrowRight", up="ArrowUp", down="ArrowDown", jump=" ", attack="Enter"){
    this.left= left;
    this.right= right;
    this.up= up;
    this.down= down;
    this.jump= jump;
    this.attack= attack;
    this.jumping= false;
    this.falling= false;
    this.upThrust=0; 
    this.canvasRect= {x:0, y:0, width: canvas.canvas.width, height: canvas.canvas.height};
  
  }
   goLeft(data, speed){
        if(data.x<=0)return;
     data.x-=speed;
  }
    goRight(data, speed){
        if(data.x + data.width>=this.canvasRect.width)return;

     data.x+=speed;
  }
    goUp(data, speed){
        if(data.y<=0)return;
     data.y-=speed;
  }
    goDown(data, speed){
        if(data.y + data.height>=this.canvasRect.height)return;
     data.y+=speed;
  }

jumpCompleted(rect, hitRect, colliders){
  if(!this.jumping && !this.falling){
    this.upThrust=-6;
this.jumping= true; 
  }
  else if(this.jumping && !this.falling){
    this.handleJumping(rect, hitRect);
  }
  else if(!this.jumping && this.falling){
       if(this.handleFalling(rect, hitRect, colliders)){
          this.falling= false;
          return true; 
       }
  }
  return false; 
}



handleJumping(rect, hitRect){
  if(this.upThrust<0){
    this.upThrust+=0.1;
    rect.y+= this.upThrust;
    hitRect.y= rect.y + 20;
  }
  else{
    this.falling= true; 
    this.jumping= false;
  }
}

checkCollision(hitRect, colliders){
for(var a=0;a<colliders.length;a++){
  if(hitRect.intersects(colliders[a])){
    return true;
  }
}
return false; 
}

handleFalling(rect, hitRect, colliders){
if(!this.checkCollision(hitRect, colliders) && rect.y + rect.height<580){
  rect.y+= 5;
  hitRect.y=rect.y + 20; 
  return false; 
}
else{
  this.falling= false;
  return true;
}
}
}

class AutoMover{
  constructor(dirX, dirY, autoChangeDir=false){
    this.dir= {x:dirX, y:dirY};
    this.autoChangeDir= autoChangeDir;
  }

  move(data,speed){
  if(this.dir.x=="left"){
     if(data.x<=0){
           if(this.autoChangeDir){
            this.dir.x="right";
           }
          return;
        }
     data.x-=speed;
  }
  if(this.dir.x=="right"){
  if(data.x + data.width>=canvas.canvas.width){
           if(this.autoChangeDir){
            this.dir.x="left";
           }
          return;
        }
     data.x+=speed;
  }
  if(this.dir.y=="up"){
        if(data.y<=0){
           if(this.autoChangeDir){
            this.dir.y="down";
           }
          return;
        }
 
     data.y-=speed;
  }
  if(this.dir.y=="down"){
        if(data.y + data.height>=canvas.canvas.height){
           if(this.autoChangeDir){
            this.dir.y="up";
           }
          return;
        }
     data.y+=speed;
  }
  }
}


class CanvasCreator{
    constructor(width, height){
        this.canvas= document.querySelector("#canvas");
        this.ctx= this.canvas.getContext("2d");
        this.canvas.width= width;
        this.canvas.height= height;
        this.canvas.style.border= `5px solid red`;
    }

    drawRect(rect, color="red"){
      this.ctx.fillStyle= color;
      this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    drawImage(rect, image){
       this.ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height);
    }

    drawText(content, canvas, posX, posY, fontSize="50", color="blue"){
          this.ctx.fillStyle= color; 
         this.ctx.font= fontSize + "px Arial";
         var text= content;
         var textWidth= this.ctx.measureText(text);
              if(posX=="middle"){
                var amountX= (canvas.canvas.width/2)- (textWidth.width/2);
              }
               else if(posX=="left"){
                var amountX= 50;
              }
               if(posY=="top"){
                var amountY= 50;
              }
               else if(posY=="middle"){
                var amountY= (canvas.canvas.height/2)- 50;
              }
                 else if(posY=="bottom"){
                var amountY= (canvas.canvas.height)- 50;
              }
        this.ctx.fillText(text, amountX, amountY);
    }

    clear(){
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}

class Rect{
    constructor(x, y, width, height){
     this.x= x;
     this.y=y;
     this.width= width;
     this.height= height;
    }
    
    intersects(rect2){
        if(rect2==null) return false;
       if(rect2.x + rect2.width >= this.x && rect2.x<= this.x + this.width){
 if(rect2.y + rect2.height >= this.y&& rect2.y <= this.y + this.height){
        return true; 
       }
       } 
       return false; 
    }
}

class Player{
constructor(rect, image, mover, speed=2, limitMovement=[]){
this.rect= rect;
this.hitRect= new Rect(this.rect.x+20, this.rect.y+20, this.rect.width-40, this.rect.height-40);
this.image= new Image();
this.image.src= image;
this.shots= [];
this.previousDir="none";
this.mover= mover;
this.hasShot= false;
this.jumping= false;
this.falling= false;
this.counter=0; 
this.speed= speed;
this.attacking= false;
this.limitMovement= limitMovement;
if(!this.limitMovement.includes("up", "down")){
  this.jumpingDisabled = true;
}
else{
  this.jumpingDisabled = false; 
}
this.dir="none";
    document.addEventListener("keydown", (event)=>{
              if(event.key=="ArrowLeft" && !this.limitMovement.includes("left")){
                    this.dir="left";
              }
               if(event.key=="ArrowRight" && !this.limitMovement.includes("right")){
                    this.dir="right";
          }
               if(event.key=="ArrowUp" && !this.limitMovement.includes("up")){
                    this.dir="up";
              }
               if(event.key=="ArrowDown" && !this.limitMovement.includes("down")){
                    this.dir="down";
              }
              if(event.key==" "){
                if(this.jumping || this.jumpingDisabled) return;
                    this.jumping=true;
              }
              if(event.key=="Enter"){
                    this.attacking=true;
              }
    })

    document.addEventListener("keyup", (event)=>{
      this.previousDir=this.dir;
              this.dir="none";
    })
}

timer(){
     this.counter++;
     if(this.counter>=60){
      this.hasShot= false;
      this.attacking=false; 
      this.counter=0;  
     }
}

draw(canvas){
canvas.drawImage(this.rect, this.image);
for(var a=0;a<this.shots.length;a++){
  this.shots[a].draw(canvas);
}
}

attack(type){
if(type=="shot" && !this.hasShot){
this.shots.push(new Shot(this.dir=="none"? this.previousDir: this.dir, this.rect));
this.hasShot=true; 
}
}

update(canvas){
  if(this.jumping){
    if(this.mover.jumpCompleted(this.rect, this.hitRect, [])){
       this.jumping= false;
    }
  }
  if(this.hasShot){
    this.timer();
  }
  if(this.dir=="right"){
    this.mover.goRight(this.rect, this.speed);
    this.hitRect.x=this.rect.x +20;
  }
   if(this.dir=="left"){
    this.mover.goLeft(this.rect, this.speed);
    this.hitRect.x=this.rect.x + 20;
  }
   if(this.dir=="up"){
    this.mover.goUp(this.rect, this.speed);
     this.hitRect.y=this.rect.y + 20;
  }
   if(this.dir=="down"){
    this.mover.goDown(this.rect, this.speed);
        this.hitRect.y=this.rect.y + 20;
  }
  if(this.shots.length>0){
    for(var a=0;a<this.shots.length;a++){
      if(!this.shots[a].offscreen(canvas)){
           this.shots[a].move();
      }
      else{
        this.shots.splice(this.shots.indexOf(this.shots[a]), 1);
      }
    }
  }
}
}

class Object{
  constructor(dir, rect, imageLink, speed=2, id=0){
     this.rect= new Rect(rect.x, rect.y, rect.width, rect.height);
     this.image= new Image();
     this.image.src= imageLink;
     this.dir=dir;
     this.id=id; 
     this.speed=speed;
  }

  draw(canvas){
           canvas.drawImage(this.rect, this.image);
  }

  offscreen(canvas){
      if(this.rect.x<0 || this.rect.x>= canvas.canvas.width) {
        return true;
      }
      if(this.rect.y<0 || this.rect.y>= canvas.canvas.height) {
        return true;
      }
      return false; 
  }

  move(){
      if(this.dir=="left"){
        this.rect.x-=this.speed;
      }
        if(this.dir=="right"){
        this.rect.x+=this.speed;
      }
        if(this.dir=="up"){
        this.rect.y-=this.speed;
      }
        if(this.dir=="down"){
        this.rect.y+=this.speed;
      }
  }

  hit(rect){
       if(this.rect.intersects(rect)){
        return true;
       }
       return false; 
  }
}

class Enemies{
constructor(canvas, link, amount, movement, speed=2){
  this.entities=[];
  this.canvas= canvas;
  this.link= link;
  this.amount=amount;
  this.movement= movement;
  this.speed=speed;
  this.create();
}

create(){
for(var a=0;a<this.amount;a++){
  this.entities.push(new Object(this.movement, new Rect(getNum(100*a, 100*(a+1)), 0, 50, 50), this.link, this.speed));
}
}

add(enemy){
this.entities.push(enemy);
}

remove(enemy){
this.entities.splice(this.enemies.indexOf(enemy), 1); 
}

checkHit(rect){
  for(var a=0;a<this.entities.length;a++){
    if(this.entities[a].hit(rect)){
            return true;    
    }
  }
  return false;
}

move(){
  for(var a=0;a<this.entities.length;a++){
    if(!this.entities[a].offscreen(this.canvas)){
    this.entities[a].move();
    }
    else{
      return this.entities[a]; 
    }
  }
}



draw(canvas){
  for(var a=0;a<this.entities.length;a++){
    this.entities[a].draw(canvas);
  }
}}

class Shot{
  constructor(dir, rect, image=null, id=0){
     this.rect= new Rect(rect.x, rect.y, 10, 10);
     this.image= image;
     this.dir=dir;
     this.id=id; 
  }

  draw(canvas){
    if(this.image!=null){
        canvas.drawImage(this.rect, this.image);
    }
    else{
           canvas.drawRect(this.rect, "blue");
    }
  }

  offscreen(canvas){
      if(this.rect.x<0 || this.rect.x>= canvas.canvas.width) {
        return true;
      }
      if(this.rect.y<0 || this.rect.y>= canvas.canvas.height) {
        return true;
      }
      return false; 
  }

  move(){
      if(this.dir=="left"){
        this.rect.x-=10;
      }
        if(this.dir=="right"){
        this.rect.x+=10;
      }
        if(this.dir=="up"){
        this.rect.y-=10;
      }
        if(this.dir=="down"){
        this.rect.y+=10;
      }
  }

  hit(rect){
       if(this.rect.intersects(rect)){
        return true;
       }
       return false; 
  }
}


function getNum(min, max, type=""){
var num=0; 
if(type==""){
var range= max- min;
num=  Math.ceil(Math.random()*range) + min;   
}
return num; 

}
