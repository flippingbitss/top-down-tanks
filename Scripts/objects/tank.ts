/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: tank class extending game object
Date Last Modified: 12/16/2017
Version: 1
*/


module objects {
  export class Tank extends objects.GameObject{
    health: number;
  // PRIVATE INSTANCE VARIABLES
    bulletSpawn:createjs.Point;
    bullets: objects.Bullet[];
    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(image:string) {
      super(image);
      this.Shoot = this.Shoot.bind(this);
      this.Start();
    }
    // PRIVATE METHODS
    private _checkBounds() {
      if(this.x >= config.Screen.WIDTH - this.halfWidth) {
        this.x = config.Screen.WIDTH - this.halfWidth;
      }
      if(this.x <= this.halfWidth) {
        this.x = this.halfWidth;
      }

      if(this.y >= config.Screen.HEIGHT - this.halfHeight) {
        this.y = config.Screen.HEIGHT - this.halfHeight;
      }

      if(this.y <= this.halfHeight) {
        this.y = this.halfHeight;
      }
    }


    // PUBLIC METHODS
    public Start():void {
      this.x = 320;
      this.y = 430;
      this.scaleX = 1.3;
      this.scaleY = 1.3;
      this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
        this.bullets = new Array<objects.Bullet>();
    

    }

    public Update():void {
      this.bulletSpawn.x = this.x;
      this.bulletSpawn.y = this.y -35;
      this._checkBounds();

      for(let b of this.bullets){
          b.Update();
      }

      this.stage.update();
    }

    public Shoot(): void {
        console.log("fire")
        let targetX = objects.Game.stage.mouseX - this.x;
        let targetY = objects.Game.stage.mouseY - this.y;

        let mag = Math.sqrt(targetX * targetX + targetY* targetY);
        
        let dir = new createjs.Point(targetX/ mag,targetY/mag);

        let bullet = new objects.Bullet(this.bulletSpawn.x, this.bulletSpawn.y, dir)    
        console.log(targetX, targetY)
        this.stage.addChild(bullet);
        this.bullets.push(bullet)
    }




  }
}
