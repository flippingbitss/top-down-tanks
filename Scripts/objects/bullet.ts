/// <reference path = "../../Scripts/objects/gameobject.ts" />

/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: bullet object fired from tanks
Date Last Modified: 12/16/2017
Version: 1
*/


namespace objects {
  export class Bullet extends objects.GameObject {
    private _music: createjs.AbstractSoundInstance;
    private speed: number;
    private direction: createjs.Point;

    // CONSTRUCTORS
    constructor(x, y, direction) {
      super("bullet");
      this.x = x;
      this.y = y;

      this.speed = 10;
      let dx = objects.Game.stage.mouseX - this.x;
      let dy = objects.Game.stage.mouseY - this.y;
      
      
      // find the angle of rotation
      this.rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;



      this.direction = direction;
      this.Start();
    }
    // PRIVATE METHODS

    inBounds(): boolean {
      return (
        this.x >= 0 &&
        this.x < config.Screen.WIDTH &&
        this.y >= 0 &&
        this.y < config.Screen.HEIGHT
      );
    }

    // PUBLIC METHODS
    public Start(): void {
        this._music = createjs.Sound.play("fire",createjs.Sound.INTERRUPT_NONE,1,0,0);        
    }



    public Update(): void {
    
    if (!this.inBounds()) {
        this.visible = false;
        return;
      }
    
     
    let vx = this.direction.x * this.speed;
    let vy = this.direction.y * this.speed;

    let newX = this.x + vx;
    let newY = this.y + vy;

    this.x = newX;
    this.y = newY;

    }
  }
}
