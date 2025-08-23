class Mover{
  constructor(left, right, up, down, autoChangeDir=false){
    this.left= left;
    this.right= right;
    this.up= up;
    this.down= down;
    this.dir= "none";
    this.autoChangeDir= autoChangeDir;
    document.addEventListener("keydown", (event)=>{
              if(event.key==this.left){
                    this.dir="left";
              }
               if(event.key==this.right){
                    this.dir="right";
              }
               if(event.key==this.up){
                    this.dir="up";
              }
               if(event.key==this.down){
                    this.dir="down";
              }
    })

    document.addEventListener("keyup", (event)=>{
              this.dir="none";
    })
  }
   goLeft(data, speed){
    if(!this.autoChangeDir){
        if(data.x<=0)return;
    }
    else{
      this.dir="right";
      return;
    }
     data.x-=speed;
  }
    goRight(data, speed){
          if(!this.autoChangeDir){
        if(data.x + data.width>=canvas.canvas.width)return;
    }
    else{
      this.dir="left";
      return;
    }
     data.x+=speed;
  }
    goUp(data, speed){
         if(!this.autoChangeDir){
        if(data.y<=0)return;
    }
    else{
      this.dir="down";
      return;
    }
     data.y-=speed;
  }
    goDown(data, speed){
            if(!this.autoChangeDir){
        if(data.y + data.height>=canvas.canvas.height)return;
    }
    else{
      this.dir="up";
      return;
    }
     data.y+=speed;
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

    drawRect(rect, color="none"){
      this.ctx.fillStyle= color;
      this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    drawImage(rect, image){
       this.ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height);
    }

    drawText(content, posX, posY){
         this.ctx.font= "50px Arial";
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