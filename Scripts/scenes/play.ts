/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: main play scene for gameplay
Date Last Modified: 12/16/2017
Version: 1
*/


namespace scenes {
  export class Play extends objects.Scene {
    _music: createjs.AbstractSoundInstance;
    _playerScore: objects.Label;
    // PRIVATE INSTANCE VARIABLES
    private _playLabel: objects.Label;
    private _nextButton: objects.Button;
    private _gamepad: managers.GamePad;
    private _player: objects.Tank;
    private _keyboard: managers.Keyboard;
    private _mouse: managers.Mouse;

    //private _enemies: objects.Enemy[];
    private _playerHealthBar: objects.ProgressBar;
    private _background: createjs.Container;
    private _HUD: createjs.Container;

    //CONSTRUCTORS
    constructor(currentScene: number) {
      super();
      
      this._currentScene = currentScene;
      this.Start();
    }

    // PRIVATE METHODS
    private _nextButtonClick(event: createjs.MouseEvent): void {
      this._currentScene = config.Scene.END;
      this.removeAllChildren();
    }

    // PUBLIC METHODS
    public Start(): void {
      this._player = new objects.Tank("playerTank");
      this._background = new createjs.Container();
      this._HUD = new createjs.Container();
      this._music = createjs.Sound.play("playMusic",createjs.Sound.INTERRUPT_NONE,1,0,1000);
      
      // this._enemies = new Array<objects.Enemy>();

      // uncomment the next line to enable gamepad support
      //this._gamepad = new managers.GamePad(this._player, 0);
      this._mouse = new managers.Mouse(this._player);
      this._keyboard = new managers.Keyboard(this._player);

      this.on("click", this._player.Shoot)

      this.Main();
    }

    public Update(): number {
      this._player.Update();

      if(this._player.health < 0){
        this._currentScene = config.Scene.PLAY;
        this._music.stop();
        this.removeAllChildren();
      }

      // uncomment the next line to enable gamepad support
      // this._gamepad.Update();
      this._mouse.Update();
      this._keyboard.Update();

   
      this._playerHealthBar.Update();

      return this._currentScene;
    }

    public Main(): void {
      this.drawBackground();
      this.drawUI();
     // this.addTanks();

      this.addChild(this._background);
      this.addChild(this._player);
      this.addChild(this._playerHealthBar)
      this.addChild(this._playerScore);
    }

    private addTanks():void{
      this._enemies.push(
        new objects.Enemy(6, 5, [[6, 5], [14, 5]]),
        new objects.Enemy(4, 2,  [[4, 2], [7, 2], [7, 3], [4, 3]]),
        new objects.Enemy(16, 2,  [[16, 2], [13, 2], [13, 3], [16, 3]]),
        new objects.Enemy(7, 6,  [[7, 6], [4, 6], [1, 7], [1, 6]]),
        new objects.Enemy(13, 6, [[13, 6], [16, 6], [19, 7], [19,6]])
      );
    }

    private drawBackground(): void {
      const { TILE_SIZE, WIDTH, HEIGHT } = config.Screen;
      for (let i = 0; i < WIDTH / TILE_SIZE; i++) {
        for (let j = 0; j < HEIGHT / TILE_SIZE; j++) {
          let tile = new objects.Image(
            "dirt",
            i * TILE_SIZE,
            j * TILE_SIZE,
            false
          );
          this._background.addChild(tile);
        }
      }
    }

    private drawUI(){
      this._playerHealthBar = new objects.ProgressBar("Player Health: ", 1, 50, 50, false);
      this._playerScore = new objects.Label("Score : 0","40px", config.Screen.FONT_FAMILY, config.Color.BLACK, 100, 50);
      this.addChild(this._playerHealthBar)
      this.addChild(this._playerScore)
    }



  }
}
