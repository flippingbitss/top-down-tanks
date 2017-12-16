var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var config;
(function (config) {
    // Color Presets
    var Color = /** @class */ (function () {
        function Color() {
        }
        Color.AZURE = "#F0FFFF";
        Color.BLACK = "#000000";
        Color.BLUE = "#0000FF";
        Color.BROWN = "#A52A2A";
        Color.CRIMSON = "#DC143C";
        Color.CYAN = "#00FFFF";
        Color.DARK_BLUE = "#00008B";
        Color.DARK_GREY = "#A9A9A9";
        Color.DARK_ORANGE = "#FF8C00";
        Color.DARK_RED = "#8B0000";
        Color.GOLD = "#FFD700";
        Color.GREEN = "#00FF00";
        Color.GREY = "#808080";
        Color.HOT_PINK = "#FF69B4";
        Color.INDIGO = "#4B0082";
        Color.IVORY = "#FFFFF0";
        Color.LIGHT_BLUE = "#ADD8E6";
        Color.LIGHT_GREY = "#D3D3D3";
        Color.LIGHT_PINK = "#FFB6C1";
        Color.LIGHT_YELLOW = "#FFFFE0";
        Color.MAGENTA = "#FF00FF";
        Color.MAROON = "#800000";
        Color.NAVY = "#000080";
        Color.OLIVE = "#808000";
        Color.ORANGE = "#FFA500";
        Color.PEACH = "#FFDAB9";
        Color.PINK = "#FFC0CB";
        Color.PURPLE = "#800080";
        Color.RED = "#FF0000";
        Color.SILVER = "#C0C0C0";
        Color.TEAL = "#008080";
        Color.VIOLET = "#EE82EE";
        Color.WHITE = "#FFFFFF";
        Color.YELLOW = "#FFFF00";
        return Color;
    }());
    config.Color = Color;
})(config || (config = {}));
var config;
(function (config) {
    var Gamepad;
    (function (Gamepad) {
        Gamepad[Gamepad["HORIZONTAL"] = 0] = "HORIZONTAL";
        Gamepad[Gamepad["VERTICAL"] = 1] = "VERTICAL";
        Gamepad[Gamepad["ROTATION"] = 2] = "ROTATION";
    })(Gamepad = config.Gamepad || (config.Gamepad = {}));
})(config || (config = {}));
var config;
(function (config) {
    var Key = /** @class */ (function () {
        function Key() {
        }
        // Keyboard values
        Key.A = 65;
        Key.CTRL = 17;
        Key.D = 68;
        Key.DOWN_ARROW = 40;
        Key.ESCAPE = 27;
        Key.LEFT_ARROW = 37;
        Key.RIGHT_ARROW = 39;
        Key.S = 83;
        Key.SHIFT = 16;
        Key.SPACEBAR = 32;
        Key.UP_ARROW = 38;
        Key.W = 87;
        return Key;
    }());
    config.Key = Key;
})(config || (config = {}));
var config;
(function (config) {
    // Scene Presets
    var Scene = /** @class */ (function () {
        function Scene() {
        }
        Scene.START = 0;
        Scene.PLAY = 1;
        Scene.END = 2;
        return Scene;
    }());
    config.Scene = Scene;
})(config || (config = {}));
var config;
(function (config) {
    // Screen Size Configuration
    var Screen = /** @class */ (function () {
        function Screen() {
        }
        Screen.WIDTH = 1280;
        Screen.HEIGHT = 720;
        Screen.HALF_WIDTH = Screen.WIDTH * 0.5;
        Screen.HALF_HEIGHT = Screen.HEIGHT * 0.5;
        Screen.TILE_SIZE = 128;
        Screen.FONT_FAMILY = "Dock51";
        return Screen;
    }());
    config.Screen = Screen;
})(config || (config = {}));
//IIFE to encapsulate game
(function () {
    // game variables
    var assetManager;
    var currentScene;
    var currentState;
    var debugCanvas;
    var gameCanvas;
    var height = config.Screen.HEIGHT;
    var stage;
    var width = config.Screen.WIDTH;
    var stats;
    function SetupStats() {
        stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);
    }
    // Initializes game variables
    function Init() {
        console.log("Initialization");
        SetupStats();
        gameCanvas = document.getElementById("game");
        debugCanvas = document.getElementById("debug");
        gameCanvas.setAttribute("width", width.toString());
        gameCanvas.setAttribute("height", height.toString());
        debugCanvas.setAttribute("width", width.toString());
        debugCanvas.setAttribute("height", height.toString());
        // set global game object variables
        objects.Game.assetManager.on("complete", Start);
    }
    // Starts game
    function Start() {
        console.log("Start");
        stage = new createjs.Stage(gameCanvas);
        objects.Game.stage = stage; // save the stage to the global game object
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        currentState = config.Scene.START;
        Main();
    }
    // Main Game Loop
    function Update() {
        stats.begin();
        var newState = currentScene.Update();
        if (newState != currentState) {
            currentState = newState;
            Main();
        }
        stats.end();
        stage.update();
    }
    function Main() {
        console.log("Main FSM");
        stage.removeAllChildren();
        switch (currentState) {
            case config.Scene.START:
                currentScene = new scenes.Start(currentState);
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.Play(currentState);
                break;
            case config.Scene.END:
                currentScene = new scenes.End(currentState);
                break;
        }
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
var managers;
(function (managers) {
    var assetManifest = [
        { id: "backButton", src: "./Assets/images/backButton.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "restartButton", src: "./Assets/images/restartButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "plane", src: "./Assets/images/plane.png" },
        // images
        { id: "playerTank", src: "./Assets/images/Tanks/tank_green.png" },
        { id: "enemyTank", src: "./Assets/images/Tanks/tank_red.png" },
        { id: "menuBackground", src: "./Assets/images/tankWall3.jpg" },
        { id: "dirt", src: "./Assets/images/Environment/dirt.png" },
        { id: "bullet", src: "./Assets/images/Bullets/bulletRedSilver_outline.png" },
        // sounds
        { id: "playMusic", src: "./Assets/audio/play.mp3" },
        { id: "endMusic", src: "./Assets/audio/end.mp3" },
        { id: "menuMusic", src: "./Assets/audio/menu.mp3" },
        { id: "fire", src: "./Assets/audio/shoot.wav" }
    ];
    var AssetManager = /** @class */ (function (_super) {
        __extends(AssetManager, _super);
        function AssetManager() {
            var _this = _super.call(this) || this;
            _this.manifest = new Array();
            _this.manifest = assetManifest;
            _this.installPlugin(createjs.Sound);
            _this.loadManifest(_this.manifest);
            return _this;
        }
        AssetManager.prototype.addItem = function (id, src) {
            this.manifest.push({ id: id, src: src });
            this.loadManifest(this.manifest);
        };
        return AssetManager;
    }(createjs.LoadQueue));
    managers.AssetManager = AssetManager;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var GamePad = /** @class */ (function () {
        // CONSTRUCTORS
        function GamePad(player, gamepadIndex) {
            this.axis = new Array();
            this.direction = 0;
            this.player = player;
            this._gamepadIndex = gamepadIndex;
        }
        GamePad.prototype.GetInput = function () {
            this._gamepad = window.navigator.getGamepads()[this._gamepadIndex];
            if (this._gamepad) {
                // check Buttons
                for (var button = 0; button < this._gamepad.buttons.length; button++) {
                    if (this._gamepad.buttons[button].pressed) {
                        console.log("button " + button + " pressed");
                    }
                }
                // check Axes
                for (var index = 0; index < this._gamepad.axes.length; index++) {
                    if ((this._gamepad.axes[index] > 0.2) || (this._gamepad.axes[index] < -0.2)) {
                        this.axis[index] = this._gamepad.axes[index];
                        /*
                        if((index == 1) && (this.axis[index] > 0)) {
                          this.axis[index] = 0; // don't allow backward movement
                        }
                        */
                    }
                    else if ((this._gamepad.axes[index] > -0.2) && (this._gamepad.axes[index] < 0.2)) {
                        this.axis[index] = 0;
                    }
                } // end check Axes
            } // end check if gamepad is connected
        };
        GamePad.prototype.MovePlayer = function () {
            // correct direction
            var newDirection = 90 - this.player.rotation;
            this.direction = newDirection;
            if (newDirection > 360) {
                this.direction -= 360;
            }
            if (newDirection < 0) {
                this.direction += 360;
            }
            // forward and back movement
            this.player.x -= this.axis[config.Gamepad.VERTICAL] * 5 * Math.cos(this.direction * (Math.PI / 180));
            this.player.y += this.axis[config.Gamepad.VERTICAL] * 5 * Math.sin(this.direction * (Math.PI / 180));
            // left and right movement
            this.player.x += this.axis[config.Gamepad.HORIZONTAL] * 2 * Math.sin(this.direction * (Math.PI / 180));
            this.player.y += this.axis[config.Gamepad.HORIZONTAL] * 2 * Math.cos(this.direction * (Math.PI / 180));
            // change direction
            this.player.rotation += this.axis[config.Gamepad.ROTATION] * 2;
        };
        GamePad.prototype.Update = function () {
            this.GetInput();
            this.MovePlayer();
        };
        return GamePad;
    }());
    managers.GamePad = GamePad;
})(managers || (managers = {}));
var managers;
(function (managers) {
    // Keyboard Class +++++++++++++++
    var Keyboard = /** @class */ (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++
        function Keyboard(player) {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
            this.player = player;
        }
        // PUBLIC METHODS
        Keyboard.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case config.Key.UP_ARROW:
                case config.Key.W:
                    this.moveForward = true;
                    break;
                case config.Key.LEFT_ARROW:
                case config.Key.A:
                    this.moveLeft = true;
                    break;
                case config.Key.DOWN_ARROW:
                case config.Key.S:
                    this.moveBackward = true;
                    break;
                case config.Key.RIGHT_ARROW:
                case config.Key.D:
                    this.moveRight = true;
                    break;
                case config.Key.SPACEBAR:
                    this.jump = true;
                    break;
                case 81:/* pause */ 
                    this.paused = (this.paused) ? false : true;
                    break;
            }
        };
        Keyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case config.Key.UP_ARROW:
                case config.Key.W:
                    this.moveForward = false;
                    break;
                case config.Key.LEFT_ARROW:
                case config.Key.A:
                    this.moveLeft = false;
                    break;
                case config.Key.DOWN_ARROW:
                case config.Key.S:
                    this.moveBackward = false;
                    break;
                case config.Key.RIGHT_ARROW:
                case config.Key.D:
                    this.moveRight = false;
                    break;
                case config.Key.SPACEBAR:
                    this.jump = false;
                    break;
            }
        };
        Keyboard.prototype.MovePlayer = function () {
            // correct direction
            var direction = (this.player.rotation - 90) * -1;
            // uncomment the following for Regular player movement not following player's direction
            /*
            if(this.moveRight) {
              this.player.x += 5;
            }
            if(this.moveLeft) {
              this.player.x -= 5;
            }
      
            if(this.moveForward) {
              this.player.y -= 5;
            }
            if(this.moveBackward) {
              this.player.y += 5;
            }
            */
            // uncomment the following lines to have the keyboard buttons follow player's direction
            if (this.moveForward) {
                this.player.x += 5 * Math.cos(direction * (Math.PI / 180.0));
                this.player.y -= 5 * Math.sin(direction * (Math.PI / 180.0));
            }
            if (this.moveBackward) {
                this.player.x -= 5 * Math.cos(direction * (Math.PI / 180.0));
                this.player.y += 5 * Math.sin(direction * (Math.PI / 180.0));
            }
            if (this.moveRight) {
                this.player.x += 2 * Math.sin(direction * (Math.PI / 180));
                this.player.y += 2 * Math.cos(direction * (Math.PI / 180));
            }
            if (this.moveLeft) {
                this.player.x -= 2 * Math.sin(direction * (Math.PI / 180));
                this.player.y -= 2 * Math.cos(direction * (Math.PI / 180));
            }
        };
        Keyboard.prototype.Update = function () {
            this.MovePlayer();
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
var managers;
(function (managers) {
    // Mouse Class +++++++++++++++
    var Mouse = /** @class */ (function () {
        // CONSTRUCTOR +++++++++++++++++++++++
        function Mouse(player) {
            this.player = player;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        Mouse.prototype.PlayerFollowMouse = function () {
            this._dx = objects.Game.stage.mouseX - this.player.x;
            this._dy = objects.Game.stage.mouseY - this.player.y;
            // find the angle of rotation
            this.direction = Math.atan2(this._dy, this._dx) * (180 / Math.PI) + 90;
            this.player.rotation = this.direction;
        };
        Mouse.prototype.Update = function () {
            this.PlayerFollowMouse();
        };
        return Mouse;
    }());
    managers.Mouse = Mouse;
})(managers || (managers = {}));
var objects;
(function (objects) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function GameObject(imageString) {
            var _this = _super.call(this, objects.Game.assetManager.getResult(imageString)) || this;
            _this.name = imageString;
            _this._initialize();
            return _this;
        }
        // PROTECTED METHODS
        GameObject.prototype._initialize = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.position = new createjs.Point(this.x, this.y);
            this.isColliding = false;
        };
        return GameObject;
    }(createjs.Bitmap));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
/// <reference path = "../../Scripts/objects/gameobject.ts" />
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: bullet object fired from tanks
Date Last Modified: 12/16/2017
Version: 1
*/
var objects;
/// <reference path = "../../Scripts/objects/gameobject.ts" />
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: bullet object fired from tanks
Date Last Modified: 12/16/2017
Version: 1
*/
(function (objects) {
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // CONSTRUCTORS
        function Bullet(x, y, direction) {
            var _this = _super.call(this, "bullet") || this;
            _this.x = x;
            _this.y = y;
            _this.speed = 10;
            var dx = objects.Game.stage.mouseX - _this.x;
            var dy = objects.Game.stage.mouseY - _this.y;
            // find the angle of rotation
            _this.rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            _this.direction = direction;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Bullet.prototype.inBounds = function () {
            return (this.x >= 0 &&
                this.x < config.Screen.WIDTH &&
                this.y >= 0 &&
                this.y < config.Screen.HEIGHT);
        };
        // PUBLIC METHODS
        Bullet.prototype.Start = function () {
            this._music = createjs.Sound.play("fire", createjs.Sound.INTERRUPT_NONE, 1, 0, 0);
        };
        Bullet.prototype.Update = function () {
            if (!this.inBounds()) {
                this.visible = false;
                return;
            }
            var vx = this.direction.x * this.speed;
            var vy = this.direction.y * this.speed;
            var newX = this.x + vx;
            var newY = this.y + vy;
            this.x = newX;
            this.y = newY;
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(buttonName, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, objects.Game.assetManager.getResult(buttonName)) || this;
            if (isCentered) {
                _this.regX = _this.getBounds().width * 0.5;
                _this.regY = _this.getBounds().height * 0.5;
            }
            _this.x = x;
            _this.y = y;
            _this.on("mouseover", _this._Over);
            _this.on("mouseout", _this._Out);
            return _this;
        }
        // PRIVATE METHODS
        Button.prototype._Over = function (event) {
            this.alpha = 0.8;
        };
        Button.prototype._Out = function (event) {
            this.alpha = 1.0;
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
})(objects || (objects = {}));
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: tank class extending game object
Date Last Modified: 12/16/2017
Version: 1
*/
var objects;
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: tank class extending game object
Date Last Modified: 12/16/2017
Version: 1
*/
(function (objects) {
    var Tank = /** @class */ (function (_super) {
        __extends(Tank, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Tank(image) {
            var _this = _super.call(this, image) || this;
            _this.Shoot = _this.Shoot.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Tank.prototype._checkBounds = function () {
            if (this.x >= config.Screen.WIDTH - this.halfWidth) {
                this.x = config.Screen.WIDTH - this.halfWidth;
            }
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            if (this.y >= config.Screen.HEIGHT - this.halfHeight) {
                this.y = config.Screen.HEIGHT - this.halfHeight;
            }
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        // PUBLIC METHODS
        Tank.prototype.Start = function () {
            this.x = 320;
            this.y = 430;
            this.scaleX = 1.3;
            this.scaleY = 1.3;
            this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
            this.bullets = new Array();
        };
        Tank.prototype.Update = function () {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y - 35;
            this._checkBounds();
            for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
                var b = _a[_i];
                b.Update();
            }
            this.stage.update();
        };
        Tank.prototype.Shoot = function () {
            console.log("fire");
            var targetX = objects.Game.stage.mouseX - this.x;
            var targetY = objects.Game.stage.mouseY - this.y;
            var mag = Math.sqrt(targetX * targetX + targetY * targetY);
            var dir = new createjs.Point(targetX / mag, targetY / mag);
            var bullet = new objects.Bullet(this.bulletSpawn.x, this.bulletSpawn.y, dir);
            console.log(targetX, targetY);
            this.stage.addChild(bullet);
            this.bullets.push(bullet);
        };
        return Tank;
    }(objects.GameObject));
    objects.Tank = Tank;
})(objects || (objects = {}));
/// <reference path = "../../Scripts/objects/tank.ts" />
var objects;
/// <reference path = "../../Scripts/objects/tank.ts" />
(function (objects) {
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // CONSTRUCTORS
        function Enemy(image, waypoints) {
            var _this = _super.call(this, image) || this;
            _this.Shoot = _this.Shoot.bind(_this);
            _this.waypoints = [];
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Enemy.prototype.Start = function () { };
        Enemy.prototype.Update = function () {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y - 35;
            for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
                var b = _a[_i];
                b.Update();
            }
            this.stage.update();
        };
        Enemy.prototype.Shoot = function () {
            var targetX = objects.Game.stage.mouseX - this.x;
            var targetY = objects.Game.stage.mouseY - this.y;
            var mag = Math.sqrt(targetX * targetX + targetY * targetY);
            var dir = new createjs.Point(targetX / mag, targetY / mag);
            var bullet = new objects.Bullet(this.bulletSpawn.x, this.bulletSpawn.y, dir);
            this.stage.addChild(bullet);
            this.bullets.push(bullet);
        };
        return Enemy;
    }(objects.Tank));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.assetManager = new managers.AssetManager();
        return Game;
    }());
    objects.Game = Game;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        function Image(image, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, objects.Game.assetManager.getResult(image)) || this;
            if (isCentered) {
                _this.regX = _this.getBounds().width * 0.5;
                _this.regY = _this.getBounds().height * 0.5;
            }
            _this.x = x;
            _this.y = y;
            return _this;
        }
        return Image;
    }(createjs.Bitmap));
    objects.Image = Image;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label(text, fontSize, fontFamily, color, x, y, isCentered) {
            if (fontSize === void 0) { fontSize = "40px"; }
            if (fontFamily === void 0) { fontFamily = "Consolas"; }
            if (color === void 0) { color = "#000000"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, text, fontSize + " " + fontFamily, color) || this;
            if (isCentered) {
                _this.regX = _this.getMeasuredWidth() * 0.5;
                _this.regY = _this.getMeasuredHeight() * 0.5;
            }
            _this.x = x;
            _this.y = y;
            return _this;
        }
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Plane() {
            var _this = _super.call(this, "playerTank") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Plane.prototype._checkBounds = function () {
            if (this.x >= config.Screen.WIDTH - this.halfWidth) {
                this.x = config.Screen.WIDTH - this.halfWidth;
            }
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            if (this.y >= config.Screen.HEIGHT - this.halfHeight) {
                this.y = config.Screen.HEIGHT - this.halfHeight;
            }
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        // PUBLIC METHODS
        Plane.prototype.Start = function () {
            this.x = 320;
            this.y = 430;
            this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
        };
        Plane.prototype.Update = function () {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y - 35;
            this._checkBounds();
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: a progress bar for displaying health
Date Last Modified: 12/16/2017
Version: 1
*/
var objects;
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: a progress bar for displaying health
Date Last Modified: 12/16/2017
Version: 1
*/
(function (objects) {
    var ProgressBar = /** @class */ (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(label, progressRatio, x, y, isCentered) {
            if (progressRatio === void 0) { progressRatio = 1; }
            var _this = _super.call(this) || this;
            // if (isCentered) {
            //   let { width, height } = this.getBounds();
            //   this.regX = width * 0.5;
            //   this.regY = height * 0.5;
            // }
            _this.x = x;
            _this.y = y;
            _this.progress = progressRatio;
            //his.label = new objects.Label(label, "30", config.Screen.FONT_FAMILY, "darkgrey", x, y, true);
            _this.label = new objects.Label(label, "40px", config.Screen.FONT_FAMILY, config.Color.BLACK, config.Screen.HALF_WIDTH, 10, true);
            _this.labelW = 900;
            _this.labelH = 100;
            _this.label.setBounds(x - _this.labelW, y - _this.labelH, _this.labelW, _this.labelH);
            console.log(_this.x, _this.y);
            console.log(_this.labelW, _this.labelH);
            _this.barWidth = 300;
            _this.barHeight = 80;
            _this.bar = new createjs.Shape();
            _this.Main();
            return _this;
        }
        ProgressBar.prototype.Main = function () {
            this.addChild(this.label);
            this.addChild(this.bar);
        };
        ProgressBar.prototype.Update = function () {
            this.bar.graphics.clear();
            this.bar.graphics
                .beginFill("lightblue")
                .drawRect(this.x + this.labelW - 50, this.y - this.labelH, this.progress * this.barWidth, this.barHeight)
                .endFill();
            this.bar.graphics
                .setStrokeStyle(2)
                .beginStroke("darkgrey")
                .drawRect(this.x + this.labelW - 50, this.y - this.labelH, this.barWidth, this.barHeight)
                .endStroke();
            this.stage.update();
        };
        return ProgressBar;
    }(createjs.Container));
    objects.ProgressBar = ProgressBar;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Scene() {
            return _super.call(this) || this;
        }
        // PUBLIC METHODS
        /**
         * This method is used to setup scene objects
         *
         * @method Start
         * @memberof Scene
         * @returns {void}
         */
        Scene.prototype.Start = function () {
        };
        /**
         * This method updates components of the scene
         *
         * @method Update
         * @returns {number}
         * @memberof Scene
         */
        Scene.prototype.Update = function () {
            return 0;
        };
        /**
         * This method is the Main method of the scene where all the action happens
         *
         * @method Main
         * @returns {void}
         * @memberof Scene
         */
        Scene.prototype.Main = function () {
        };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: end scene
Date Last Modified: 12/16/2017
Version: 1
*/
var scenes;
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: end scene
Date Last Modified: 12/16/2017
Version: 1
*/
(function (scenes) {
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        //CONSTRUCTORS
        function End(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            // register button event handlers
            _this._backButtonClick = _this._backButtonClick.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        End.prototype._backButtonClick = function (event) {
            this._currentScene = config.Scene.START;
            this._music.stop();
            this.removeAllChildren();
        };
        // PUBLIC METHODS
        End.prototype.Start = function () {
            this._startLabel = new objects.Label("Game Ended", "60px", config.Screen.FONT_FAMILY, config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT * 0.4, true);
            this._backButton = new objects.Button("backButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
            this._background = new createjs.Bitmap(objects.Game.assetManager.getResult("menuBackground"));
            this._background.alpha = 0.8;
            this._background.setBounds(0, 0, config.Screen.WIDTH, config.Screen.HEIGHT);
            this._music = createjs.Sound.play("endMusic", createjs.Sound.INTERRUPT_NONE, 1, 0, 1000);
            this.Main();
        };
        End.prototype.Update = function () {
            return this._currentScene;
        };
        End.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._startLabel);
            this.addChild(this._backButton);
            this._backButton.on("click", this._backButtonClick);
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: main play scene for gameplay
Date Last Modified: 12/16/2017
Version: 1
*/
var scenes;
/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: main play scene for gameplay
Date Last Modified: 12/16/2017
Version: 1
*/
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        //CONSTRUCTORS
        function Play(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Play.prototype._nextButtonClick = function (event) {
            this._currentScene = config.Scene.END;
            this.removeAllChildren();
        };
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            this._player = new objects.Tank("playerTank");
            this._background = new createjs.Container();
            this._HUD = new createjs.Container();
            this._music = createjs.Sound.play("playMusic", createjs.Sound.INTERRUPT_NONE, 1, 0, 1000);
            // this._enemies = new Array<objects.Enemy>();
            // uncomment the next line to enable gamepad support
            //this._gamepad = new managers.GamePad(this._player, 0);
            this._mouse = new managers.Mouse(this._player);
            this._keyboard = new managers.Keyboard(this._player);
            this.on("click", this._player.Shoot);
            this.Main();
        };
        Play.prototype.Update = function () {
            this._player.Update();
            if (this._player.health < 0) {
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
        };
        Play.prototype.Main = function () {
            this.drawBackground();
            this.drawUI();
            // this.addTanks();
            this.addChild(this._background);
            this.addChild(this._player);
            this.addChild(this._playerHealthBar);
            this.addChild(this._playerScore);
        };
        Play.prototype.addTanks = function () {
            this._enemies.push(new objects.Enemy(6, 5, [[6, 5], [14, 5]]), new objects.Enemy(4, 2, [[4, 2], [7, 2], [7, 3], [4, 3]]), new objects.Enemy(16, 2, [[16, 2], [13, 2], [13, 3], [16, 3]]), new objects.Enemy(7, 6, [[7, 6], [4, 6], [1, 7], [1, 6]]), new objects.Enemy(13, 6, [[13, 6], [16, 6], [19, 7], [19, 6]]));
        };
        Play.prototype.drawBackground = function () {
            var _a = config.Screen, TILE_SIZE = _a.TILE_SIZE, WIDTH = _a.WIDTH, HEIGHT = _a.HEIGHT;
            for (var i = 0; i < WIDTH / TILE_SIZE; i++) {
                for (var j = 0; j < HEIGHT / TILE_SIZE; j++) {
                    var tile = new objects.Image("dirt", i * TILE_SIZE, j * TILE_SIZE, false);
                    this._background.addChild(tile);
                }
            }
        };
        Play.prototype.drawUI = function () {
            this._playerHealthBar = new objects.ProgressBar("Player Health: ", 1, 50, 50, false);
            this._playerScore = new objects.Label("Score : 0", "40px", config.Screen.FONT_FAMILY, config.Color.BLACK, 100, 50);
            this.addChild(this._playerHealthBar);
            this.addChild(this._playerScore);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        //CONSTRUCTORS
        function Start(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            // register button event handlers
            _this._startButtonClick = _this._startButtonClick.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Start.prototype._startButtonClick = function (event) {
            this._currentScene = config.Scene.PLAY;
            this._music.stop();
            this.removeAllChildren();
        };
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            console.log("Start Scene");
            this._startLabel = new objects.Label("Tank Trials", "60px", config.Screen.FONT_FAMILY, config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT * 0.4, true);
            this._startButton = new objects.Button("startButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
            this._background = new createjs.Bitmap(objects.Game.assetManager.getResult("menuBackground"));
            this._background.alpha = 0.8;
            this._background.setBounds(0, 0, config.Screen.WIDTH, config.Screen.HEIGHT);
            this._music = createjs.Sound.play("menuMusic", createjs.Sound.INTERRUPT_NONE, 1, 0, 1000);
            this.Main();
        };
        Start.prototype.Update = function () {
            return this._currentScene;
        };
        Start.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._startLabel);
            this.addChild(this._startButton);
            this._startButton.on("click", this._startButtonClick);
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=game.js.map