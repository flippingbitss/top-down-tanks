/*
Names: Max - 300830601, Slade - 300814981, Manpreet - 300838888
Description: a progress bar for displaying health 
Date Last Modified: 12/16/2017
Version: 1
*/



module objects{
export class ProgressBar extends createjs.Container {
    bar: createjs.Shape;
    barHeight: number;
    barWidth: number;
    labelH: number;
    labelW: number;
    label: Label;
    progress: number;
  
  
  
    constructor(label, progressRatio = 1, x, y, isCentered) {
    super();

    // if (isCentered) {
    //   let { width, height } = this.getBounds();
    //   this.regX = width * 0.5;
    //   this.regY = height * 0.5;
    // }
    this.x = x;
    this.y = y;

    this.progress = progressRatio;
    //his.label = new objects.Label(label, "30", config.Screen.FONT_FAMILY, "darkgrey", x, y, true);
    this.label = new objects.Label(label, "40px", config.Screen.FONT_FAMILY, config.Color.BLACK, config.Screen.HALF_WIDTH, 10, true);
    
    this.labelW = 900;
    this.labelH = 100;

    this.label.setBounds(x - this.labelW, y - this.labelH, this.labelW, this.labelH);

    console.log(this.x, this.y);
    console.log(this.labelW, this.labelH);

    this.barWidth = 300;
    this.barHeight = 80;
    this.bar = new createjs.Shape();

    this.Main();
  }

  Main() {
    this.addChild(this.label);
    this.addChild(this.bar);
  }

  Update() {
    this.bar.graphics.clear();

    this.bar.graphics
      .beginFill("lightblue")
      .drawRect(
        this.x + this.labelW - 50,
        this.y - this.labelH,
        this.progress * this.barWidth,
        this.barHeight
      )
      .endFill();

    this.bar.graphics
      .setStrokeStyle(2)
      .beginStroke("darkgrey")
      .drawRect(this.x + this.labelW - 50, this.y - this.labelH, this.barWidth, this.barHeight)
      .endStroke();

    this.stage.update();
  }
}
}