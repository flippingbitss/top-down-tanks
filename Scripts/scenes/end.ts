/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: end scene
Date Last Modified: 12/16/2017
Version: 1
*/


module scenes {
  export class End extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _startLabel:objects.Label;
    private _backButton:objects.Button;
    private _background:createjs.Bitmap;
    private _music: createjs.AbstractSoundInstance;
    //CONSTRUCTORS
    constructor(currentScene: number) {
      super();

      this._currentScene = currentScene;
      // register button event handlers
      this._backButtonClick = this._backButtonClick.bind(this);

      this.Start();
    }

    // PRIVATE METHODS
    private _backButtonClick(event:createjs.MouseEvent):void {
      this._currentScene = config.Scene.START;
      this._music.stop();
      this.removeAllChildren();
    }


    // PUBLIC METHODS
    public Start():void {

      this._startLabel = new objects.Label("Game Ended", "60px", config.Screen.FONT_FAMILY, config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT * 0.4, true);
      

      this._backButton = new objects.Button("backButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);

      this._background = new createjs.Bitmap(objects.Game.assetManager.getResult("menuBackground"))
      this._background.alpha = 0.8;
      this._background.setBounds(0,0,config.Screen.WIDTH, config.Screen.HEIGHT)


     this._music = createjs.Sound.play("endMusic",createjs.Sound.INTERRUPT_NONE,1,0,1000);



      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {
      this.addChild(this._background)
      this.addChild(this._startLabel);
      this.addChild(this._backButton);


      this._backButton.on("click", this._backButtonClick);
    }
  }
}
