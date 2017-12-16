namespace objects {
  export class Enemy{
    // PRIVATE INSTANCE VARIABLES
    private _currentWayPoint: number;
    private _waypoints;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(x, y, waypoints) {
     
    //     super(
    //     "enemyTank",
    //     x * config.Screen.TILE_SIZE,
    //     y * config.Screen.TILE_SIZE
    //   );
      this._waypoints = waypoints;
     // this.Start();
    }

    // public patrol():void {
    //   const { TILE_SIZE } = config.Screen;
    //   let tileX = this.x / TILE_SIZE;
    //   let tileY = this.y / TILE_SIZE;

    //   let [targetX, targetY] = this._waypoints[this._currentWayPoint];
    //   // this.followTarget(new Vector2(targetX, targetY));
    // }
  }
}
