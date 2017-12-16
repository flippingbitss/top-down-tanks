module objects {
    export class Image extends createjs.Bitmap {
      constructor(image:string,  x:number = 0, y:number=0, isCentered:boolean=false) {
        super(objects.Game.assetManager.getResult(image));
        if(isCentered) {
          this.regX = this.getBounds().width * 0.5;
          this.regY = this.getBounds().height * 0.5;
        }
        this.x = x;
        this.y = y;
      }
    }
  }
  