module managers {
  export interface AssetItem {
    id: string;
    src: string;
  }

  let assetManifest = [
    {id: "backButton", src: "./Assets/images/backButton.png"},
    {id: "nextButton", src: "./Assets/images/nextButton.png"},
    {id: "restartButton", src: "./Assets/images/restartButton.png"},
    {id: "startButton", src: "./Assets/images/startButton.png"},
    {id: "plane", src: "./Assets/images/plane.png"},


    // images
    {id: "playerTank", src: "./Assets/images/greenTank.png"},
    {id: "enemyTank", src: "./Assets/images/redTank.png"},
    {id: "menuBackground", src: "./Assets/images/tankWall3.jpg"},
    {id: "dirt", src: "./Assets/images/Environment/dirt.png"},


    // sounds
    {id: "playMusic", src: "./Assets/audio/play.mp3"},
    {id: "endMusic", src: "./Assets/audio/end.mp3"},
    {id: "menuMusic", src: "./Assets/audio/menu.mp3"}
    

  ]

  export class AssetManager extends createjs.LoadQueue {
    public manifest: AssetItem[] = new Array<AssetItem>();
    constructor() {
      super();
      this.manifest = assetManifest;
      this.installPlugin(createjs.Sound);
      this.loadManifest(this.manifest);
    }

    public addItem(id:string, src:string):void {
      this.manifest.push({id, src});
      this.loadManifest(this.manifest);
    }
  }
}
