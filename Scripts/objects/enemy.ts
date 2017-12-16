/// <reference path = "../../Scripts/objects/tank.ts" />

namespace objects {
  export class Enemy extends objects.Tank {
    private waypoints;


    // CONSTRUCTORS
    constructor(image: string, waypoints) {
      super(image);
      this.Shoot = this.Shoot.bind(this);
      this.waypoints = [];
      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {}

    public Update(): void {
      this.bulletSpawn.x = this.x;
      this.bulletSpawn.y = this.y - 35;

      for (let b of this.bullets) {
        b.Update();
      }

      this.stage.update();
    }

    public Shoot(): void {
      let targetX = objects.Game.stage.mouseX - this.x;
      let targetY = objects.Game.stage.mouseY - this.y;

      let mag = Math.sqrt(targetX * targetX + targetY * targetY);

      let dir = new createjs.Point(targetX / mag, targetY / mag);

      let bullet = new objects.Bullet(
        this.bulletSpawn.x,
        this.bulletSpawn.y,
        dir
      );

      this.stage.addChild(bullet);
      this.bullets.push(bullet);
    }
  }
}
