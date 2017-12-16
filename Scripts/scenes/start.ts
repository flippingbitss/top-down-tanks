module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _startLabel:objects.Label;
    private _startButton:objects.Button;
    private _background:createjs.Bitmap;
    private _music: createjs.AbstractSoundInstance;
    //CONSTRUCTORS
    constructor(currentScene: number) {
      super();

      this._currentScene = currentScene;
      // register button event handlers
      this._startButtonClick = this._startButtonClick.bind(this);

      this.Start();
    }

    // PRIVATE METHODS
    private _startButtonClick(event:createjs.MouseEvent):void {
      this._currentScene = config.Scene.PLAY;
      this._music.stop();
      this.removeAllChildren();
    }


    // PUBLIC METHODS
    public Start():void {
      console.log("Start Scene");
      this._startLabel = new objects.Label("Tank Trials", "60px", config.Screen.FONT_FAMILY, config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT * 0.4, true);
      

      this._startButton = new objects.Button("startButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);

      this._background = new createjs.Bitmap(objects.Game.assetManager.getResult("menuBackground"))
      this._background.alpha = 0.8;
      this._background.setBounds(0,0,config.Screen.WIDTH, config.Screen.HEIGHT)


     this._music = createjs.Sound.play("menuMusic",createjs.Sound.INTERRUPT_NONE,1,0,1000);



      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {
      this.addChild(this._background)
      this.addChild(this._startLabel);
      this.addChild(this._startButton);


      this._startButton.on("click", this._startButtonClick);
    }
  }
}
